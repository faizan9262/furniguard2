import express from "express";
import { getAdminInbox, getChatsForDesigner, getChatsForUser, getConvo, updateReadStatus } from "../controllers/message.controller.js";
import  adminAuth  from "../middleware/adminAuth.js";

const messageRouter = express.Router();

messageRouter.post("/read-status",updateReadStatus)
messageRouter.get("/convo/:user1Id/:user2Id",getConvo)
messageRouter.get("/inbox/designer/:designerId", getChatsForDesigner);
messageRouter.get("/inbox/user/:userId", getChatsForUser);
messageRouter.get("/inbox/admin/:userId", getChatsForUser);
messageRouter.get("/get-all",adminAuth , getAdminInbox);

export default messageRouter;