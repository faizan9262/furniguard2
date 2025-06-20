import { Designer } from "../models/designer.model.js";

export const getAllDesingers = async (req, res) => {
  try {
    const designers = await Designer.find().populate({
      path: "user",
      select: "-password -appointments -designerProfile",
    });
    res.status(200).json(designers);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong during fetching all designers." });
  }
};
