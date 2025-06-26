import express from 'express'
import { verifyToken } from '../utils/token-manager.js'
import { getRatingsForDesigner, getRatingsForProduct, rateItem } from '../controllers/ratings.controller.js'

const ratingRouter = express.Router()

ratingRouter.put('/rate',verifyToken,rateItem)
ratingRouter.get("/product/:productId",verifyToken, getRatingsForProduct);
ratingRouter.get("/designer/:designerId", getRatingsForDesigner);

export default ratingRouter