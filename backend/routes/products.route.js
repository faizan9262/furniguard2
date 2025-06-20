import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { addProduct, listProducts, removeProduct, signleProduct } from '../controllers/product.controller.js'
import upload from '../middleware/multer.js'

const productRouter = express.Router()

productRouter.post('/add',adminAuth,upload.single('product_img'),addProduct)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.get('/list',listProducts)
productRouter.get('/single',signleProduct)

export default productRouter;