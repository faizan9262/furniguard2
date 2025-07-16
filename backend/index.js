import express from "express";
import dotevn from "dotenv";
import cors from "cors";
import mongoDBConnect from "./config/mongodb.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/products.route.js";
import conntectCloadinary from "./config/cloudinary.js";
import cookieParser from "cookie-parser";
import designerRouter from "./routes/designer.route.js";
import appointmentRouter from "./routes/appointment.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import ratingRouter from "./routes/rating.route.js";
import { createServer } from "http";
import { initSocket } from "./socket/socket.js";
import messageRouter from "./routes/message.route.js";

dotevn.config();

const app = express();
const httpServer = createServer(app);
const allowedOrigins = [
  "https://furniguard-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
mongoDBConnect();
conntectCloadinary();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("Welcome to Furniguard APIs");
});
initSocket(httpServer);

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/designers", designerRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/message", messageRouter);

const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
  //   console.log('SMTP_USER:', process.env.SMTP_USER);
  // console.log('SMTP_PASS:', process.env.SMTP_PASS);
});

export default app;
