import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  images: {
    type: [String],
    default: [],
  },
  links: {
    type: [String],
    default: [],
  },
  title: {
    type: String,
    default: "Untitled Project",
  },
  description: {
    type: String,
    default: "No description available",
  },
  duration: {
    type: String,
    default: "0 months",
  },
});

const designerSchema = new mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
      unique: true,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    bio: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    experience: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: [
        "interior designer",
        "architect",
        "carpenter",
        "plumber",
        "electrician",
        "furniture designer",
        "civil engineer",
        "other",
      ],
      default: "interior designer",
    },
    expertise: {
      type: [String],
      default: [],
    },
    projects: {
      type: [projectSchema],
      default: [],
    },
    availableSlots: {
      type: [
        {
          date: Date,
          isBooked: {
            type: Boolean,
            default: false,
          },
        },
      ],
      default: [],
    },
  
    // 🔽 NEW FIELDS ADDED BELOW
  
    preferredLocations: {
      type: [String],
      enum: ["Home", "Studio", "Online"],
      default: ["Online", "Home"], // or whatever default you prefer
    },
  
    studioAddress: {
      type: String,
      default: "", // optional: used when preferredLocations includes "Studio"
    }
});

export const Designer = mongoose.model("Designer", designerSchema);
