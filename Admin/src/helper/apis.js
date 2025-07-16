import axios from "axios";

export const getDesignerRating = async (designerId)=>{
  const response = await axios.get(`/ratings/designer/${designerId}`);
  if (response.status !== 200) {
    throw new Error("Unable to Load Designer Ratings");
  }
  const data = await response.data;
  return data;
}
export const getProductRating = async (productId)=>{
  const response = await axios.get(`/ratings/product/${productId}`);
  if (response.status !== 200) {
    throw new Error("Unable to Load Product Ratings");
  }
  const data = await response.data;
  return data;
}



export const authStatus = async () => {
  try {
    const response = await axios.get("/user/admin/is-auth");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong while Authentication");
    }
  }
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
  const response = await axios.get("/appointment/admin/get-all");
  if (response.status !== 200) {
    throw new Error("Unable to Load All Appointments");
  }
  const data = await response.data;
  return data;
};

export const cancelAppointment = async (appointmentId,reason) => {
  const response = await axios.post("/appointment/admin/delete", { appointmentId ,reason});
  if (response.status !== 200) {
    throw new Error("Unable to Cancel Appointment bt Admin");
  }
  const data = response.data;
  return data;
};

export const updateStatus = async (status,appointmentId)=>{
  const response = await axios.post("/appointment/admin/update-status", { status,appointmentId });
  if (response.status !== 200) {
    throw new Error("Unable Update Appointment Status");
  }
  const data = await response.data;
  return data; 
}

export const getAdminInbox = async (userRole, userId) => {
  const response = await axios.get(`/message/inbox/${userRole}/${userId}`);
  if (response.status !== 200) {
    throw new Error("Unable To Load Chats");
  }
  const data = await response.data;
  return data;
};

export const fetchMessages = async (from, receiverId) => {
  const response = await axios.get(`/message/convo/${from}/${receiverId}`);
  // console.log("Response: ",response.data);s
  if (response.status !== 200) {
    throw new Error("Unable To Load Messages");
  }
  const data = await response.data;
  return data;
};