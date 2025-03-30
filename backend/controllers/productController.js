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

export default index