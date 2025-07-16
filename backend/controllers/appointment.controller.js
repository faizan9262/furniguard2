import { Appointment } from "../models/Appointment.model.js";
import { UserModel } from "../models/user.model.js";
import { Designer } from "../models/designer.model.js";
import { ProductModel } from "../models/product.model.js";
import { appointmentDeletedEmail } from "../utils/mailLayoutHtml.js";
import { sendMail } from "../utils/sendmail.js";

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
    designer.availableSlots = designer.availableSlots.map((slot) =>
      slot.date.getTime() === appointment.appointmentDate.getTime()
        ? { ...slot, isBooked: true }
        : slot
    );
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

    // console.log("1st AP: ", allAppointments);

    return res.status(200).json(allAppointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching appointments.",
    });
  }
};

export const getAllAppointmentsOfDesigner = async (req, res) => {
  try {
    const designerUser = await UserModel.findById(res.locals.jwtData.id);
    const designerId = designerUser.designerProfile;
    // console.log("Designer Id: ",designerId);
    const designer = await Designer.findById(designerId);
    // console.log("Designer: ",designer);

    if (!designer) {
      return res.status(401).json({ message: "Designer not found." });
    }

    const allAppointments = await Appointment.find({
      _id: { $in: designer.appointments },
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

    // console.log("APS: ",allAppointments);

    return res.status(200).json(allAppointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching designer appointments.",
    });
  }
};

export const updateStatusByAdminOnly = async (req, res) => {
  try {
    const { status, appointmentId } = req.body;
    if (!status || !appointmentId) {
      return res
        .status(400)
        .json({ message: "Status and appointmentId are required." });
    }
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    appointment.status = status;
    appointment.save();

    res.status(200).json({
      message: "Appointment status updated successfully.",
      updatedAppointment: appointment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while updating appointment status" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId, reason } = req.body;
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

    const appointment = await Appointment.findById(appointmentId)
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

    if (!appointment) {
      return res.status(401).json({ message: "Appointment not found" });
    }

    await UserModel.findByIdAndUpdate(appointment.user, {
      $pull: { appointments: appointmentId },
    });

    await Designer.findByIdAndUpdate(appointment.designer, {
      $pull: { appointments: appointmentId },
    });

    const userData = appointment.user;
    const designer = appointment.designer;

    await Appointment.findByIdAndDelete(appointmentId);

    const subject = "Appointment Deleted";
    const htmlUser = appointmentDeletedEmail({
      appointmentData: appointment,
      designer,
      user: userData,
      reason,
      type: "user",
    });
    const htmlDesigner = appointmentDeletedEmail({
      appointmentData: appointment,
      designer,
      user: userData,
      reason,
      type: "designer",
    });
    await sendMail(user.email, subject, htmlUser);
    await sendMail(designer.user.email, subject, htmlDesigner);

    res.status(200).json({ message: "Appointment cancelled" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while cancelling appointment" });
  }
};

export const deleteAppointmentByAdmin = async (req, res) => {
  try {
    const { appointmentId, reason } = req.body;

    if (!appointmentId || !reason) {
      return res
        .status(400)
        .json({ message: "Reason and appointmentId are required." });
    }

    const appointment = await Appointment.findById(appointmentId)
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

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ✅ Remove appointment from user and designer
    await UserModel.findByIdAndUpdate(appointment.user._id, {
      $pull: { appointments: appointmentId },
    });

    await Designer.findByIdAndUpdate(appointment.designer._id, {
      $pull: { appointments: appointmentId },
    });

    const user = appointment.user;
    const designer = appointment.designer;

    console.log("Appointment:", appointment);
    // console.log("User Name:", user);
    // console.log("Designer Name: ", designer.user.username);

    await Appointment.findByIdAndDelete(appointmentId);

    const subject = "Appointment Deleted";
    const htmlUser = appointmentDeletedEmail({
      appointmentData: appointment,
      designer,
      user,
      reason,
      type: "user",
    });
    const htmlDesigner = appointmentDeletedEmail({
      appointmentData: appointment,
      designer,
      user,
      reason,
      type: "designer",
    });
    await sendMail(user.email, subject, htmlUser);
    await sendMail(designer.user.email, subject, htmlDesigner);

    res.status(200).json({ message: "Appointment Deleted by Admin" });
  } catch (error) {
    console.error("Admin Delete Error:", error);
    res
      .status(500)
      .json({ message: "Server error while deleting appointment by admin" });
  }
};
