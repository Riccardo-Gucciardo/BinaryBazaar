import connection from '../data/db.js'



function index(req,res){


    const sql = 'SELECT * FROM products'

    connection.query( sql, (err, results) => {
        if(err) return res.status(500).json({
            error: 'error'
        })

        // const products = results.map(product =>{
        //     return{
        //         ...product,
        //         image: req.imagePath + product.image
        //     }
                
        // })
        res.json(results)
    })

    

}

export default index