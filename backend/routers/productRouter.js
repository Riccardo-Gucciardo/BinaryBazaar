// import productController from '../controllers/productController.js'

import express from 'express'
const router = express.Router();

import {
    index, showProductDetails, searchProduct,
    //  searchProductName
} from '../controllers/productController.js'

// /SyntaxRecap ==> {
//      router.VERBO('percorsoRadice/:Params', middleware, 'CallBack')
//     //? router.post('/', upload.single('image') ,store)
//     router: istanza di express.Router() => definisce route modulari
//     .post('/'): verboHTTP.('percorsoRadice /: Params'(eventuale) )
//     upload.single('image'): middlewareMulter => elabora caricamento singolo file dal campo 'image' del form
//     store : funzione CallBack importata da movieController
// }*/


//chiamata INDEX
router.get('/', index)

//chiamata SHOW singolo prodotto
router.get('/:slug/', showProductDetails)

//chiamata SEARCH prodotto
router.get('/search', searchProduct)

//chiamata SEARCH prodotto singolo in base al nome
// router.get('/searchh', searchProductName)


export default router


