import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    designer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designer",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductModel",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    appointmentDate: {
      type: Date,
      required: true,
    },

    // 🔽 New Fields for Location/Mode
    appointmentMode: {
      type: String,
      enum: ["Home", "Studio", "Online"],
      default: "Online",
      required: true,
    },
    locationAddress: {
      type: String,
      default: "", // For "Home" or custom external locations
    },

    grandTotal: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
    },
    designerFee: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed"],
      default: "pending",
    },

    notes: String,
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
