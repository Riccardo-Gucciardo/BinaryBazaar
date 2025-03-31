import cors from 'cors'
import express from 'express'
import handleImagePath from './middlewares/handlerPath.js';

const app = express()
const port = process.env.SERVER_PORT || 3000;
const endpoint = process.env.FRONTEND_PORT

import productRouter from './routers/productRouter.js'

//cors
app.use(cors({
    origin: process.env.FRONTEND_PORT
}))

//middleware body parse
app.use(express.json())

//middleware gestionePathIMG
app.use(handleImagePath)

//middleware asset statico
app.use(express.static('public'))

//mount router
app.use('/products', productRouter)



//attivazione del server
app.listen(port, () => {
    console.log(`server in funzione sulla porta: ${port}`)
})
