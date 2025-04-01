import connection from '../data/db.js';
import nodemailer from 'nodemailer';

function createOrder(req, res) {
    const { name, lastname, email, address, telephone, products, promotion_code } = req.body;

    // Validazione campi input
    if (!name || !lastname || !email || !address || !products || !Array.isArray(products)) {
        return res.status(400).json({ error: "Dati Mancanti nei campi: Nome, Cognome, Indirizzo, Prodotto, Email...sono obbligatori" });
    }

    // Azzeramento dei counter
    let total = 0;
    let promotion_id = null;

    // Funzione unica di inserimento dell'ordine e del calcolo del totale
    function calculateTotalAndInsertOrder() {
        let processedProducts = 0;

        // Verifica dei prodotti e calcolo del totale
        products.forEach((p, index) => {
            // Correzione: usa slug invece di product_id
            const sql = 'SELECT product_id, price, discount_price, stock, name FROM products WHERE slug = ?';
            connection.query(sql, [p.slug], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: "Errore lato server" });
                }

                // Controllo quantità in magazzino
                if (results.length === 0 || results[0].stock < p.quantity) {
                    return res.status(400).json({ error: `Prodotto ${p.slug} non disponibile o stock insufficiente` });
                }

                // Controllo sullo sconto
                const price = results[0].discount_price || results[0].price;

                // Calcolo totale in base alla quantità
                total += price * p.quantity;

                // Aggiornamento sul product_id, prezzo e name
                products[index] = {
                    slug: p.slug,
                    product_id: results[0].product_id,
                    quantity: p.quantity,
                    price,
                    name: results[0].name
                };

                processedProducts++;

                if (processedProducts === products.length) {
                    applicaPromo(); // Richiamo funzione sconto
                }
            });
        });
    }

    function applicaPromo() {
        if (promotion_code) {
            const promoSql = `
        SELECT promotion_id, discount
        FROM promotions
        WHERE code = ? AND valid_from <= CURDATE() AND valid_to >= CURDATE()
      `; // Correzione: rimosso errore di sintassi

            connection.query(promoSql, [promotion_code], (err, promoResults) => {
                if (err) {
                    return res.status(500).json({ error: "Errore lato server" });
                }

                // Applicazione sconto
                if (promoResults.length > 0) {
                    promotion_id = promoResults[0].promotion_id;
                    const discount = promoResults[0].discount;
                    total = total * (1 - discount / 100);
                }
                insertOrder(); // Correzione: chiama insertOrder dopo lo sconto
            });
        } else {
            insertOrder(); // Chiama insertOrder se non c'è promozione
        }
    }

    function insertOrder() {
        const orderSql = `
      INSERT INTO orders (name, lastname, email, address, telephone, order_date, total, promotion_id)
      VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)
    `; // Correzione: usa VALUES, non VALUE
        connection.query(orderSql, [name, lastname, email, address, telephone || null, total, promotion_id || null], (err, orderResult) => {
            if (err) {
                return res.status(500).json({ error: "Errore lato server" });
            }

            const orderId = orderResult.insertId;
            const orderDetailsSql = `
        INSERT INTO product_order (order_id, product_id, quantity, price, name)
        VALUES ?
      `;
            const orderDetailsValues = products.map(item => [orderId, item.product_id, item.quantity, item.price, item.name]);

            connection.query(orderDetailsSql, [orderDetailsValues], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Errore lato server" });
                }

                // Aggiorno stock da SQL (contatore)
                let updateStock = 0;

                products.forEach(item => {
                    const sql = `
            UPDATE products SET stock = stock - ?
            WHERE product_id = ?
          `;
                    connection.query(sql, [item.quantity, item.product_id], (err) => {
                        if (err) {
                            return res.status(500).json({ error: "Errore lato server" });
                        }

                        // Aggiorno stock
                        updateStock++;

                        if (updateStock === products.length) {
                            res.status(201).json({
                                order_id: orderId,
                                message: "Ordine effettuato con successo",
                                total: `${total.toFixed(2)} €`
                            });
                        }
                    });
                });
            });
        });
    }

    // Avvio processo GLOBALE con evocazione
    calculateTotalAndInsertOrder();
}

export { createOrder }; // Esporta solo createOrder per ora