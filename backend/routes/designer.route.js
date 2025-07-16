import express from "express";
import {
  addAvailableSolts,
  addProjectToProfile,
  deleteProjectFromProfile,
  editDesignerProfile,
  getAllDesingers,
} from "../controllers/designer.controller.js";
import { verifyToken } from "../utils/token-manager.js";
import upload, { uploadToCloudinary } from "../middleware/multer.js";

const designerRouter = express.Router();

designerRouter.get("/all-designers", getAllDesingers);
designerRouter.post(
  "/add-project",
  verifyToken,
  upload.array("images"),
  uploadToCloudinary("Melodify"),
  addProjectToProfile
);
designerRouter.post("/",verifyToken, deleteProjectFromProfile);
designerRouter.post("/add-slots",verifyToken, addAvailableSolts);
designerRouter.post("/update-profile",verifyToken, editDesignerProfile);

export default designerRouter;
