import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/user/login", { email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while Signing In");
    }
  }
};

export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post("/user/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while  Signing Up");
    }
  }
};

export const authStatus = async () => {
  try {
    const response = await axios.get("/user/is-auth");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while Authentication");
    }
  }
};

export const sendVerifyEmailOtp = async () => {
  try {
    const response = await axios.get("/user/send-email-otp");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(
        "Something went wrong while sending email verification OTP"
      );
    }
  }
};

export const verifyEmailOtp = async (otp) => {
  try {
    const response = await axios.post("/user/verify-email-otp", { otp });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(
        "Something went wrong while Verifying Email verification OTP"
      );
    }
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post("/user/logout");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while Log out");
    }
  }
};

export const sendPasswordResetMail = async (email) => {
  try {
    const response = await axios.post("/user/forgot-password", { email });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while password reset link");
    }
  }
};

export const resetPassword = async (otp, newPassword, email) => {
  try {
    const response = await axios.post(`/user/reset-password`, {
      otp,
      newPassword,
      email,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while password reset");
    }
  }
};

export const updatePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.post(`/user/update-password`, {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while updating password");
    }
  }
};

export const updateProfile = async (imageUrl) => {
  try {
    const response = await axios.post(`/user/update-profile-pic`, imageUrl);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while updating profile pic");
    }
  }
};

// Wishlist

export const getAllWishlistProducts = async () => {
  const response = await axios.get("/wishlist/get-all");
  if (response.status !== 200) {
    throw new Error("Unable to Load All wishlist Products");
  }

  return response;
};

export const addToWishlist = async (productId) => {
  try {
    const response = await axios.post("/wishlist/add", { productId });
    return response.data;
  } catch (error) {
    // Forward backend's message if available
    const message =
      error?.response?.data?.message || "Unable to add product in wishlist";
    throw new Error(message);
  }
};

export const removeFromWishlist = async (productId) => {
  const response = await axios.post("/wishlist/remove", { productId });
  if (response.status !== 200) {
    throw new Error("Unable to remove product from wishlist");
  }
  return response;
};

// Products Apis

export const getAllProducts = async () => {
  const response = await axios.get("/products/list");
  if (response.status !== 200) {
    throw new Error("Unable to Load All Products");
  }
  const data = await response.data;
  return data;
};

// Designer Apis

export const getAllDesigners = async () => {
  const response = await axios.get("/designers/all-designers");
  if (response.status !== 200) {
    throw new Error("Unable to Load All Designers");
  }
  const data = await response.data;
  return data;
};

// Appointment Apis

export const getAllAppointments = async () => {
  const response = await axios.get("/appointment/get-all");
  if (response.status !== 200) {
    throw new Error("Unable to Load All Appointments");
  }
  const data = await response.data;
  return data;
};

export const createNewAppointment = async ({ appointmentData }) => {
  const response = await axios.post(
    "/appointment/new-booking",
    appointmentData
  );
  if (response.status !== 201) {
    throw new Error("Unable Book Appointment");
  }
  const data = await response.data;
  return data;
};

export const cancelAppointment = async (appointmentId) => {
  const response = await axios.post("/appointment/cancel", { appointmentId });
  if (response.status !== 200) {
    throw new Error("Unable Cancel Appointment");
  }
  const data = await response.data;
  return data;
};
