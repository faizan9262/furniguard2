import express from 'express'
import { getAllDesingers } from '../controllers/designer.controller.js'

const designerRouter = express.Router()

designerRouter.get('/all-designers',getAllDesingers)

export default designerRouter