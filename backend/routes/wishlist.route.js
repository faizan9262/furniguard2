import express from 'express'
import { addToWishlist, getAllWishlistProducts, removeFromWishlist } from '../controllers/wishlist.controller.js'
import { verifyToken } from '../utils/token-manager.js'


const wishlistRouter = express.Router()

wishlistRouter.post("/add",verifyToken,addToWishlist)
wishlistRouter.get("/get-all",verifyToken,getAllWishlistProducts)
wishlistRouter.post("/remove",verifyToken,removeFromWishlist)

export default wishlistRouter