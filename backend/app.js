import express from 'express'
const app = express()
const port = process.env.SERVER_PORT||3000;

import productRouter from './routers/productRouter.js'

app.use(express.json())
app.use('/products',productRouter)



//attivazione del server
app.listen(port, () => {
    console.log(`server in funzione sulla porta: ${port}`)
})
 
