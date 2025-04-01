import connection from '../data/db.js'
import nodemailer from 'nodemailer'

function createOrder(req, res) {
    const { name,
        lastname,
        email,
        address,
        telephone,
        products,
        promotion_code
    } = req.body;

    //validazione campi input
    if (!name || !lastname || !email || !address || !product || !Array.isArray(products)) {
        return res.status(400)
            .json({ error: "Dati Mancanti nei campi : Nome, Cognome, Indirizzo, Prodotto, Email...sono obbligatori" })
    }

    //azzeramento dei counter
    let total = 0
    let promotion_id = null


    //funzione unica di inserimento dell'ordine e del calcolo del totale
    function calculateTotalAndInsertOrder() {

        //contatoreforeach
        let processedProducts = 0

        //varifica dei prodotti e calcolo del totale
        products.forEach((p, index) => {

            const sql = 'SELECT price, discount_price, stock, name FROM products WHERE product_id = ?'

            connection.query(sql, [p.slug], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        error: "errore lato server"
                    })
                }

                //controllo quantità in magazzino
                if (results.length == 0 || results[0].stock < p.quantity) {
                    return res.status(500).json({
                        error: `prodotto ${p.slug} non disponibile o stock insufficiente`
                    })
                }

                //controllo sullo sconto
                const price = results[0].discount_price || results[0].price

                //controllo totale in base alla quantità
                total += price * p.quantity

                //aggiornamento sul product_id, prezzo e name
                products[index] = {
                    slug: p.slug,
                    product_id: results[0].product_id,
                    quantity: p.quantity,
                    price,
                    name: results[0].name
                }

                processedProducts++

                if (processedProducts === products.length) {
                    applicaPromo() //richiamo funzione sconto
                }
            })
        });
    }

    function applicaPromo() {

        if (promotion_code) {
            const promoSql =
                `
            SELECT promotion_id, discount
            FROM promotions
            WHERE code = ? AND valid_from <= CURDATE() AND valid_to >= CURDATE() 
            `}

        connection.query(promoSql, [promotion_code], (err, promoResults) => {
            if (err) {
                return res.status(500).json({
                    error: "errore lato server"
                })
            }

            //applicazione sconto
            if (promoResults.length > 0) {
                promotion_id = promoResults[0].promotion_id
                const discount = promoResults[0].discount;
                total = total * (1 - discount / 100)
            }

        })
    }

    function insertOrder() {
        const orderSql =
            `
        INSERT INTO orders (name, lastname, email, address, telephone, order_date, total, promotion_id)
        VALUE(?,?,?,?,?,NOW(),?,?) 
        `
        connection.query(orderSql, [name, lastname, email, address, telephone || null, total, promotion_id || null], (err, orderResult) => {
            if (err) {
                return res.status(500).json({
                    error: "errore lato server"
                })
            }

            const orderId = orderResult.insertId
            const orderDetailsSql = `
            INSERT INTO product_order (order_id, product_id, quantity, price,name)
            VALUES ?
            `
            const oderDetailsValues = products.map(item => [orderId, item.product_id, item.quantity, item.price, item.name])

            connection.query(orderDetailsSql, [oderDetailsValues], (err) => {
                if (err) {
                    return res.status(500).json({
                        error: "errore lato server"
                    })
                }

                //aggiorno stock da sql (contatore)
                let updateStock = 0

                products.forEach(item => {

                    const sql =
                        `
                        UPDATE products SET stock = stock - ?
                        WHERE product_id = ?
                        `
                    connection.query(sql, [item.quantity, item.product_id], (err) => {
                        if (err) {
                            return res.status(500).json({
                                error: "errore lato server"
                            })
                        }

                        //aggiorno stock
                        updateStock++

                        if (updateStock === products.length) {
                            res.status(201).json({
                                order_id: orderId,
                                message: "ordine effettuato con successo",
                                total
                            })
                        }
                    })
                });
            })
        })
    }

    //*avvio processo GLOBALE con evocazione
    calculateTotalAndInsertOrder()

    //ESPERIMENTO TRY/CATCH try {
    //     // Inserimento ordine
    //     const orderSql = 'INSERT INTO orders (name, lastname, email, address, telephone, order_date, total, promotion_id) VALUES (?, ?, ?, NOW())';
    //     connection.query(orderSql, [buyer_data.name, buyer_data.email, total_amount], async (err, result) => {
    //         if (err) return res.status(500).json({ error: 'Errore creazione ordine' });

    //         const orderId = result.insertId;

    //         // Inserimento prodotti dell'ordine
    //         const orderDetailsSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)';
    //         for (let product of products) {
    //             await connection.query(orderDetailsSql, [orderId, product.id, product.quantity]);
    //         }

    //         // Invio email
    //         const transporter = nodemailer.createTransport({
    //             // configurazione del servizio email
    //         });

    //         const mailOptions = {
    //             from: 'your@email.com',
    //             to: buyer_data.email,
    //             subject: 'Conferma Ordine',
    //             html: `
    //                 <h1>Grazie per il tuo ordine!</h1>
    //                 <p>Numero ordine: ${orderId}</p>
    //                 <p>Totale: €${total_amount}</p>
    //                 // ... altri dettagli dell'ordine
    //             `
    //         };

    //         await transporter.sendMail(mailOptions);

    //         res.status(201).json({
    //             message: 'Ordine creato con successo',
    //             order_id: orderId
    //         });
    //     });
    // } catch (error) {
    //     res.status(500).json({ error: 'Errore durante la creazione dell\'ordine' });
    // }
}



export { createOrder }
