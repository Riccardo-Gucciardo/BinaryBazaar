import connection from '../data/db.js'


//* chiama INDEX di TUTTI i prodotti
function index(req, res) {
    // Estrai i parametri di filtro
    const {
        q: searchTerm,
        category,
        minPrice,
        maxPrice,
        sortBy
    } = req.query;

    // Costruisci la query base
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    // Aggiungi filtri dinamici
    if (searchTerm) {
        sql += ' AND LOWER(name) LIKE LOWER(?)';
        params.push(`%${searchTerm}%`);
    }

    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    if (minPrice) {
        sql += ' AND price >= ?';
        params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
        sql += ' AND price <= ?';
        params.push(parseFloat(maxPrice));
    }

    // Aggiungi ordinamento
    const validSortColumns = ['name', 'price'];
    if (validSortColumns.includes(sortBy)) {
        sql += ` ORDER BY ${sortBy}`;
    }

    connection.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        const products = results.map(p => ({
            ...p,
            image_url: `${req.imagePath}${p.slug}.webp`
        }));

        res.json(products);
    });
}

function searchProduct(req, res) {
    const searchTerm = req.query.q || '';

    const sql = `
        SELECT 
            name, 
            slug, 
            price, 
            discount_price, 
            category 
        FROM products 
        WHERE LOWER(name) LIKE LOWER(CONCAT('%', ?, '%'))
    `;

    connection.query(sql, [searchTerm], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del database' });

        const products = results.map(product => ({
            ...product,
            image_url: `${req.imagePath}${product.slug}.webp`
        }));

        res.json(products);
    });
}




//*chiamata SHOW del singolo prodotto a prescindere dal TYPE

function showProductDetails(req, res) {
    const { slug } = req.params;

    const sql = "SELECT * FROM products WHERE slug = ?";
    connection.query(sql, [slug], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server' });
        if (results.length === 0) return res.status(404).json({ error: 'Prodotto non trovato' });

        const product = results[0];
        let detailsSql;

        // Usa il campo category dal database invece di req.query.category
        if (product.category === 'laptop') {
            detailsSql = 'SELECT * FROM laptop_details WHERE product_id = ?';
        } else if (product.category === 'accessory') {
            detailsSql = 'SELECT * FROM accessory_details WHERE product_id = ?';
        } else {
            return res.status(400).json({ error: 'Tipo di prodotto non valido' });
        }

        connection.query(detailsSql, [product.product_id], (err, detailsResults) => {
            if (err) return res.status(500).json({ error: 'Errore del server' });
            product.product_details = detailsResults; // Dettagli del prodotto
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


export { index, showProductDetails, searchProduct }