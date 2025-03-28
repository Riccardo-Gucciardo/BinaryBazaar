// import productController from '../controllers/productController.js'

import express from 'express'
const router = express.Router();

import index from '../controllers/productController.js'

// /SyntaxRecap ==> {
//     // router.VERBO('percorsoRadice/:Params', middleware, 'CallBack')
//     //? router.post('/', upload.single('image') ,store)
//     router: istanza di express.Router() => definisce route modulari
//     .post('/'): verboHTTP.('percorsoRadice /: Params'(eventuale) )
//     upload.single('image'): middlewareMulter => elabora caricamento singolo file dal campo 'image' del form
//     store : funzione CallBack importata da movieController
// }*/

router.get('/',index)

export default router


