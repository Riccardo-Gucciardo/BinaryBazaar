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


// Funzione per cercare e filtrare i prodotti (versione semplificata)
function searchProduct(req, res) {
    // 1. Estrai i parametri da req.query
    const {
        name,         // Testo della searchbar (ricerca solo nel name)
        category,     // Filtro per categoria
        minPrice,     // Filtro per prezzo minimo
        maxPrice,     // Filtro per prezzo massimo
        brand,        // Filtro per brand (foreign key)
        onSale,       // Filtro per prodotti in sconto ("true" o "false")
        sortDiscount  // Ordinamento per sconto ("asc" o "desc")
    } = req.query;

    // 2. Converti i parametri nei tipi corretti
    const searchName = name ? name.trim() : null; // Rimuovi spazi extra
    const searchCategory = category ? category.trim() : null;
    const searchBrand = brand ? brand.trim() : null;
    const isOnSale = onSale === "true"; // Converti stringa in booleano
    const minPriceValue = minPrice ? parseFloat(minPrice) : null; // Converti in numero
    const maxPriceValue = maxPrice ? parseFloat(maxPrice) : null; // Converti in numero
    const sortOrder = sortDiscount === "asc" || sortDiscount === "desc" ? sortDiscount : null; // Ordinamento per sconto

    // 3. Costruisci la query SQL dinamicamente
    // Inizia con la query base: seleziona i campi necessari e fai una JOIN con la tabella brands
    let sql = `
        SELECT 
            products.name, 
            products.slug, 
            products.price, 
            products.discount_price, 
            products.category, 
            brands.name 
        FROM products
        LEFT JOIN brands ON products.brand_id = brands.brand_id
    `;

    // Array per i valori dei placeholder
    const values = [];

    // Array per le condizioni della clausola WHERE
    const conditions = [];

    // 4. Aggiungi condizioni in base ai parametri
    // Condizione per name (searchbar)
    if (searchName) {
        conditions.push("LOWER(products.name) LIKE LOWER(?)");
        values.push(`%${searchName}%`); // Aggiungi % per il LIKE
    }

    // Condizione per category
    if (searchCategory) {
        conditions.push("products.category = ?");
        values.push(searchCategory);
    }

    // Condizione per brand (usa il brand_name dalla tabella brands)
    if (searchBrand) {
        conditions.push("brands.name = ?");
        values.push(searchBrand);
    }

    // Condizione per onSale (prodotti in sconto)
    if (isOnSale) {
        conditions.push("products.discount_price IS NOT NULL");
    }

    // Condizione per minPrice
    if (minPriceValue !== null && !isNaN(minPriceValue)) {
        conditions.push("products.price >= ?");
        values.push(minPriceValue);
    }

    // Condizione per maxPrice
    if (maxPriceValue !== null && !isNaN(maxPriceValue)) {
        conditions.push("products.price <= ?");
        values.push(maxPriceValue);
    }

    // 5. Combina le condizioni nella clausola WHERE
    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    // 6. Aggiungi ordinamento per discount_price (se richiesto)
    if (sortOrder && isOnSale) {
        // Ordina solo se il filtro onSale è attivo (altrimenti discount_price sarebbe NULL per i prodotti non in sconto)
        sql += ` ORDER BY products.discount_price ${sortOrder.toUpperCase()}`;
    }


    // 7. Esegui la query
    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error("Errore nella query di ricerca:", err);
            return res.status(500).json({ error: "Errore lato server" });
        }

        // 8. Mappa i risultati per aggiungere l'image_url
        const products = results.map(p => ({
            ...p,
            image_url: `${req.imagePath}${p.slug}.webp`// Costruisci l'URL dell'immagine
        }));

        // 9. Restituisci i risultati al frontend
        res.status(200).json(products);
    });
}

//FIX Funzione per cercare i prodotti solo in base al nome
// function searchProductName(req, res) {
//     // 1. Estrai il parametro name da req.query
//     const { name } = req.query;

//     // 2. Prepara il valore per la ricerca (se name non è presente, usa una stringa vuota)
//     const searchName = name ? name.trim() : "";

//     // 3. Costruisci la query SQL
//     // Cerca i prodotti il cui nome contiene il valore di searchName (case-insensitive)
//     const sql = `
//         SELECT 
//             name, 
//             slug, 
//             price, 
//             discount_price, 
//             category
//         FROM products
//         WHERE LOWER(name) LIKE LOWER(?)
//     `;

//     // 4. Valore per il placeholder (aggiungi % per il LIKE)
//     const values = [`%${searchName}%`];

//     // 5. Esegui la query
//     connection.query(sql, values, (err, results) => {
//         if (err) {
//             console.error("Errore nella query di ricerca:", err);
//             return res.status(500).json({ error: "Errore lato server" });
//         }

//         // 6. Mappa i risultati per aggiungere l'image_url
//         const products = results.map((product) => ({
//             ...product,
//             image_url: `${req.imagePath}${p.slug}.webp`, // Costruisci l'URL dell'immagine
//         }));

//         // 7. Restituisci i risultati al frontend
//         res.status(200).json(products);
//     });
// }

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


export {
    index, showProductDetails, searchProduct,
    //  searchProductName
}