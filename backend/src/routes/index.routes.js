import { Router } from "express";
import userRouter from "./user.routes.js";
import chatsRouter from "./chats.routes.js";

const appRouter = Router()

appRouter.use("/user",userRouter)
appRouter.use("/chat",chatsRouter)

export default appRouter