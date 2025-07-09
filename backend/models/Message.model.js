import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "fromModel", // dynamic reference
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "toModel", // dynamic reference
  },
  fromModel: {
    type: String,
    required: true,
    enum: ["UserModel", "Designer"], // optionally "AdminModel"
  },
  toModel: {
    type: String,
    required: true,
    enum: ["UserModel", "Designer"], 
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
},{ timestamps: true });

export const Message = mongoose.model("Message", messageSchema);
