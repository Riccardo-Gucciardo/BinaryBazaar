import connection from '../data/db.js'



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
//     const { slug, id } = req.params
//     const laptopSql = 'SELECT * FROM laptop_details WHERE product_id = ?';

//     const sql = "SELECT * FROM products WHERE slug=?"
//     connection.query(sql, [slug], (err, results) => {
//         if (err) return res.status(500).json({
//             error: 'error'
//         })
//         results.length == 0 && res.status(404).json({ error: 'Prodotto Non Trovato' });

//         const laptop = results[0]
//         connection.query(laptopSql, [id], (err, laptopResults) => {
//             if (err) return res.status(500).json({
//                 error: 'error'
//             })


//             // Rimuovi l'id dai dettagli del laptop
//             laptop.laptop_details = laptopResults.map(detail => {
//                 const { id, ...rest } = detail; // Escludi l'id
//                 return rest;
//             });


//             laptop.laptop_details = laptopResults;
//             res.json({
//                 ...laptop,
//                 image_url: `${req.imagePath}${laptop.slug}.webp`
//             })
//         })



//     })
// }
function showLaptop(req, res) {
    const { slug } = req.params;
    const sql = "SELECT * FROM products WHERE slug=?";

    connection.query(sql, [slug], (err, results) => {
        if (err) return res.status(500).json({ error: 'error' });
        if (results.length === 0) return res.status(404).json({ error: 'Prodotto Non Trovato' });

        const laptop = results[0];
        const laptopSql = 'SELECT * FROM laptop_details WHERE product_id = ?'; //Ora si usa il product_id dal result della prima query.

        connection.query(laptopSql, [laptop.product_id], (err, laptopResults) => {
            if (err) return res.status(500).json({ error: 'error' });
            laptop.laptop_details = laptopResults;

            res.json({
                ...laptop,
                image_url: `${req.imagePath}${laptop.slug}.webp`
            });
        });
    });
}



export { index, showLaptop }