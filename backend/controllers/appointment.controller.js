import { Appointment } from "../models/Appointment.model.js";
import { UserModel } from "../models/user.model.js";
import { Designer } from "../models/designer.model.js";
import { ProductModel } from "../models/product.model.js";

export const bookAppointment = async (req, res) => {
  try {
    const {
      designerId,
      productIds,
      date,
      status,
      notes,
      appointmentMode,
      locationAddress,
    } = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one product must be selected." });
    }

    const user = await UserModel.findById(res.locals.jwtData.id);
    const designer = await Designer.findById(designerId);
    const products = await ProductModel.find({ _id: { $in: productIds } });

    if (!user)
      return res
        .status(401)
        .json({ message: "User not found or token malfunctioned." });

    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(401).json({ message: "Unauthorized access." });

    if (!designer)
      return res.status(400).json({ message: "Invalid designer ID." });

    if (products.length !== productIds.length)
      return res.status(400).json({ message: "Some products are invalid." });

    // 💰 Price calculations
    const subtotal = products.reduce((acc, prod) => acc + (prod.price || 0), 0);
    const gst = Math.round(subtotal * 0.18); // 18% GST
    const designerFee = 500;
    const discount = 0;
    const grandTotal = subtotal + gst + designerFee - discount;

    // 🧾 Create {product, price} array for schema
    const appointmentProducts = products.map((p) => ({
      product: p._id,
      price: p.price,
    }));

    const appointment = new Appointment({
      user: user._id,
      designer: designer._id,
      products: appointmentProducts,
      appointmentDate: date,
      status,
      notes,
      appointmentMode,
      locationAddress: appointmentMode === "Home" ? locationAddress : "",

      subtotal,
      gst,
      designerFee,
      discount,
      grandTotal,
    });

    await appointment.save();

    // Link appointment to user & designer
    user.appointments.push(appointment._id);
    await user.save();

    designer.appointments.push(appointment._id);
    await designer.save();

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("user", "username email profilePicture")
      .populate({
        path: "designer",
        select: "bio type experience user",
        populate: {
          path: "user",
          select: "username email profilePicture",
        },
      })
      .populate("products.product", "name price description category image");

    res.status(201).json(populatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong while booking the appointment.",
    });
  }
};

export const getAllAppointmentsOfUser = async (req, res) => {
  try {
    if (req.admin) {
      const allAppointments = await Appointment.find({})
        .populate("user", "username email profilePicture")
        .populate({
          path: "designer",
          select: "bio type experience user",
          populate: {
            path: "user",
            select: "username email profilePicture",
          },
        })
        .populate("products.product", "name price description category image");

      return res.status(200).json(allAppointments);
    }

    const user = await UserModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    const allAppointments = await Appointment.find({
      _id: { $in: user.appointments },
    })
      .populate("user", "username email profilePicture")
      .populate({
        path: "designer",
        select: "bio type experience user",
        populate: {
          path: "user",
          select: "username email profilePicture",
        },
      })
      .populate("products.product", "name price description category image");

    return res.status(200).json(allAppointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching appointments.",
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const user = await UserModel.findById(res.locals.jwtData.id);
    // console.log(user._id.toString() , res.locals.jwtData.id);

    if (!appointmentId) {
      return res.status(401).json({ message: "Appointment not found" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(401).json({ message: "Appointment not found" });
    }

    await UserModel.findByIdAndUpdate(appointment.user, {
      $pull: { appointments: appointmentId },
    });

    await Designer.findByIdAndUpdate(appointment.designer, {
      $pull: { appointments: appointmentId },
    });

    await Appointment.findByIdAndDelete(appointmentId);

    res.status(200).json({ message: "Appointment cancelled" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while cancelling appointment" });
  }
};
