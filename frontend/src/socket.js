// socket.js
import { io } from "socket.io-client"

const socket = io("https://furniguard-backend.vercel.app", {
  withCredentials: true,
  autoConnect: true,
})

export default socket
