import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { deleteConvo, generateChatComplition, getAllConversations, getConversationChats } from "../controllers/chats.controller.js";

const chatsRouter = Router()

chatsRouter.post('/complete',verifyToken,generateChatComplition)
chatsRouter.get('/conversations',verifyToken,getAllConversations)
chatsRouter.get('/:conversationId',verifyToken,getConversationChats)
chatsRouter.post('/delete-conversation',verifyToken,deleteConvo)

export default chatsRouter
