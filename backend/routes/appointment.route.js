import express from 'express'
import { bookAppointment, cancelAppointment, getAllAppointmentsOfUser } from '../controllers/appointment.controller.js'
import { verifyToken } from '../utils/token-manager.js'

const appointmentRouter = new express.Router()

appointmentRouter.post('/new-booking',verifyToken,bookAppointment)
appointmentRouter.get('/get-all',verifyToken,getAllAppointmentsOfUser)
appointmentRouter.post('/cancel',verifyToken,cancelAppointment)

export default appointmentRouter