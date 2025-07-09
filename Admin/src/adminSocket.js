import { io } from "socket.io-client";
const adminSocket = io("http://localhost:3000", {
  withCredentials: true,
  autoConnect: true,
});

export default adminSocket;
