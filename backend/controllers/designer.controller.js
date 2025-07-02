import mongoose from "mongoose";
import { Designer } from "../models/designer.model.js";
import { Rating } from "../models/rating.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllDesingers = async (req, res) => {
  try {
    const designers = await Designer.find().populate({
      path: "user",
      select: "-password -appointments -designerProfile",
    });

    const ratedDesigners = await Promise.all(
      designers.map(async (designer) => {
        const stats = await Rating.aggregate([
          {
            $match: {
              targetType: "designer",
              targetId: new mongoose.Types.ObjectId(designer._id),
            },
          },
          {
            $group: {
              _id: "$targetId",
              averageRating: { $avg: "$rating" },
              totalRatings: { $sum: 1 },
            },
          },
        ]);

        return {
          ...designer.toObject(),
          averageRating: stats[0]?.averageRating || 0,
          totalRatings: stats[0]?.totalRatings || 0,
        };
      })
    );

    res.status(200).json(ratedDesigners);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong during fetching all designers." });
  }
};

export const editDesignerProfile = async (req, res) => {
  try {
    const {
      bio,
      phone,
      experience,
      type,
      expertise,
      preferredLocations,
      studioAddress,
    } = req.body;

    const user = await UserModel.findById(res.locals.jwtData.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist or token is invalid" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const designer = await Designer.findById(user.designerProfile);

    if (!designer) {
      return res.status(404).json({ message: "Designer profile not found" });
    }

    designer.bio = bio || designer.bio;
    designer.phone = phone || designer.phone;
    designer.experience = experience || designer.experience;
    designer.type = type || designer.type;
    designer.expertise = expertise || designer.expertise;
    designer.preferredLocations =
      preferredLocations || designer.preferredLocations;
    designer.studioAddress = studioAddress || designer.studioAddress;
    await designer.save();

    const updatedDesigner = await Designer.findById(designer._id)
      .populate("user", "-password") 

    res.status(200).json(updatedDesigner);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong during fetching all designers." });
  }
};

export const addProjectToProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(res.locals.jwtData.id);

    const { projectTitle, projectDescription, projectDuration, projectLink } =
      req.body;

    const uploadedImages = req.images;

    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist or token is invalid" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectTitle || !projectDescription || !uploadedImages?.length) {
      return res.status(400).json({
        message:
          "Project Title, Description, and at least one Image are required.",
      });
    }

    const projectData = [
      {
        images: uploadedImages,
        links: Array.isArray(projectLink) ? projectLink : [projectLink],
        title: projectTitle,
        description: projectDescription,
        duration: projectDuration,
      },
    ];

    const designer = await Designer.findById(user.designerProfile);
    designer.projects.push(...projectData);
    await designer.save();

    res.status(200).json(designer.projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong during adding project to designer profile",
    });
  }
};

export const deleteProjectFromProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(res.locals.jwtData.id);
    const { projectId } = req.body;

    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist or token is invalid" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const designer = await Designer.findById(user.designerProfile);
    designer.projects = designer.projects.filter(
      (p) => p._id.toString() !== projectId
    );

    await designer.save();

    res
      .status(200)
      .json({ message: "Project deleted", projects: designer.projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong during adding project to designer profile",
    });
  }
};
