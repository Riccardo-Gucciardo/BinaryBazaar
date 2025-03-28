import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.SERVER_PORT || 3000;
const endpoint = process.env.FRONTEND_PORT

import productRouter from './routers/productRouter.js'

//cors
app.use(cors({
    origin: endpoint
}))

//body parse
app.use(express.json())

//router
app.use('/products', productRouter)



//attivazione del server
app.listen(port, () => {
    console.log(`server in funzione sulla porta: ${port}`)
})
