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

export const cancelAppointment = async (appointmentId) => {
  const response = await axios.post("/appointment/cancel", { appointmentId });
  if (response.status !== 200) {
    throw new Error("Unable Cancel Appointment");
  }
  const data = await response.data;
  return data;
};