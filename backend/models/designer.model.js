import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  images: {
    type: [String],
    default: [],
    required:true
  },
  links: {
    type: [String],
    default: [],
  },
  title: {
    type: String,
    default: "Untitled Project",
    required:true
  },
  description: {
    type: String,
    default: "No description available",
    required:true
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
    
  
    preferredLocations: {
      type: [String],
      enum: ["Home", "Studio", "Online"],
      default: ["Online", "Home"],
    },
  
    studioAddress: {
      type: String,
      default: "", 
    }
});

export const Designer = mongoose.model("Designer", designerSchema);
