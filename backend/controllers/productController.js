import connection from '../data/db.js'


//* chiama INDEX di TUTTI i prodotti
function index(req, res) {


    const sql = 'SELECT * FROM products'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: 'error'
        })

        // res.json(results); 
        const products = results.map(p => {
            return {
                ...p,

                image_url: `${req.imagePath}${p.slug}.webp`
            }

        });
        res.json(products)//* AGGIORNAMENTO CON USO MIDDLEWARE
    })
}


// function showLaptop(req, res) {
//     const { slug } = req.params;

//     const sql = "SELECT * FROM products WHERE slug=?";

//     connection.query(sql, [slug], (err, results) => {
//         if (err) return res.status(500).json({ error: 'error' });
//         if (results.length === 0) return res.status(404).json({ error: 'Prodotto Non Trovato' });

//         const laptop = results[0];
//         const laptopSql = 'SELECT * FROM laptop_details WHERE product_id = ?'; //Ora si usa il product_id dal result della prima query.

//         connection.query(laptopSql, [laptop.product_id], (err, laptopResults) => {
//             if (err) return res.status(500).json({ error: 'error' });
//             laptop.laptop_details = laptopResults;

//             res.json({
//                 ...laptop,
//                 image_url: `${req.imagePath}${laptop.slug}.webp`
//             });
//         });
//     });
// }

//*chiamata SHOW del singolo prodotto a prescindere dal TYPE

function showProductDetails(req, res) {
    const { slug } = req.params;
    const category = req.query.category; // Ottieni il tipo dalla query string

    const sql = "SELECT * FROM products WHERE slug=?";

    connection.query(sql, [slug], (err, results) => {
        if (err) return res.status(500).json({ error: 'error' });
        if (results.length === 0) return res.status(404).json({ error: 'Prodotto Non Trovato' });

        const product = results[0];
        let detailsSql;

        if (category === 'laptop') {
            detailsSql = 'SELECT * FROM laptop_details WHERE product_id = ?';
        } else if (category === 'accessory') {
            detailsSql = 'SELECT * FROM accessory_details WHERE product_id = ?';
        } else {
            return res.status(400).json({ error: 'Tipo di prodotto non valido' });
        }

        connection.query(detailsSql, [product.product_id], (err, detailsResults) => {
            if (err) return res.status(500).json({ error: 'error' });
            product.product_details = detailsResults; // Usa un nome di proprietà generico
            product.details = detailsResults[0] || {};
            res.json({
                ...product,
                image_url: `${req.imagePath}${product.slug}.webp`
            });
        });
    });
}

//TODO aggiornare funzione di ricerca!
// function searchProduct(req, res){

// }


export { index, showProductDetails }