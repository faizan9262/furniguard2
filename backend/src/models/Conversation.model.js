import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    expires: 60 * 60 * 24 * 30
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
