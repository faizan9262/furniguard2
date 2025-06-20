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

dotevn.config();

const app = express();
const allowedOrigins = ['http://localhost:5173']
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
mongoDBConnect();
conntectCloadinary();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));


app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/designers", designerRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/wishlist", wishlistRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
//   console.log('SMTP_USER:', process.env.SMTP_USER);
// console.log('SMTP_PASS:', process.env.SMTP_PASS);
});

export default app;