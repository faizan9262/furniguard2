import express from 'express'
import { bookAppointment, cancelAppointment, deleteAppointmentByAdmin, getAllAppointmentsOfDesigner, getAllAppointmentsOfUser, updateStatusByAdminOnly } from '../controllers/appointment.controller.js'
import { verifyToken } from '../utils/token-manager.js'
import adminAuth from '../middleware/adminAuth.js'

const appointmentRouter = new express.Router()

appointmentRouter.post('/new-booking',verifyToken,bookAppointment)
appointmentRouter.get('/get-all',verifyToken,getAllAppointmentsOfUser)
appointmentRouter.get('/designer/get-all',verifyToken,getAllAppointmentsOfDesigner)
appointmentRouter.get('/admin/get-all',adminAuth,getAllAppointmentsOfUser)
appointmentRouter.post('/admin/update-status',adminAuth,updateStatusByAdminOnly)
appointmentRouter.post('/cancel',verifyToken,cancelAppointment)
appointmentRouter.post('/admin/delete',adminAuth,deleteAppointmentByAdmin)

export default appointmentRouter