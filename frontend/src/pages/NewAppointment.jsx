import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";
import { motion } from "framer-motion";
import { Textarea } from "../components/components/ui/textarea";
import { useProduct } from "../context/ProductContext";
import { useDesiner } from "../context/DesignerContex";
import { toast } from "sonner";
import { createNewAppointment } from "../helper/api-communicator.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentsContex";
import CategorySelectorCard from "@/components/CategorySelectorCard";
import ProductSelectorCard from "@/components/ProductSelectorCard";
import DesignerSelectorCard from "@/components/DesignerSelectorCard";
import DesignerAppointmentCard from "@/components/DateSelectorCard";
import BookAppointmentDialog from "@/components/BookAppointmentDialog";
import AppointmentSummaryCard from "@/components/AppointmentSummaryCard";
import { MdDeleteForever } from "react-icons/md";

const categories = [
  "furniture",
  "lights",
  "stairs",
  "textile",
  "kitchen",
  "flooring",
  "bathroom",
  "wallpaper",
];

const NewAppointment = () => {
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  const product = useProduct();
  const designer = useDesiner();
  const appointment = useAppointment();
  const navigate = useNavigate();
  const location = useLocation();

  const passedCategory = location.state?.category || null;
  const passedProductId = location.state?.productId || null;
  const [selectedCategory, setSelectedCategory] = useState(passedCategory);
  const [selectedProduct, setSelectedProduct] = useState(passedProductId);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [tempSelectedProduct, setTempSelectedProduct] = useState(null);
  const [appointmentMode, setAppointmentMode] = useState("Online");
  const [locationAddress, setLocationAddress] = useState("");

  const filteredProducts = product.products.filter(
    (p) => p.category === selectedCategory
  );

  useEffect(() => {
    const newDetails = product.products.find((p) => p._id === selectedProduct);
    setSelectedProductDetails(newDetails);
  }, [selectedProduct, product.products]);

  const selectedDesignerDetails = selectedDesigner;

  const appointmentData = {
    designerId: selectedDesignerDetails?._id,
    productIds: selectedProducts.map((p) => p._id),
    date: selectedDate,
    status: "pending",
    notes,
    appointmentMode,
    locationAddress: appointmentMode === "Home" ? locationAddress : "",
  };

  console.log("Selected Product In Main: ", selectedProducts);

  const handleClick = async () => {
    try {
      toast.loading("Booking Appointment", { id: "new-ap" });
      const response = await createNewAppointment({ appointmentData });
      console.log("Response: ", response);
      toast.success("Appointment Booked", { id: "new-ap" });
      appointment.addAppointment(response);
      navigate("/appointments");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong", { id: "new-ap" });
    }
  };

  const handleClearForm = () => {
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSelectedProductDetails(null);
    setTempSelectedProduct(null);
    setSelectedProducts([]);
    setSelectedDesigner(null);
    setSelectedDate(null);
    setAppointmentMode("Online");
    setLocationAddress("");
    setNotes("");
    toast.info("Form Cleared");
  };

  const subtotal = selectedProducts.reduce(
    (acc, curr) => acc + (curr.price || 0),
    0
  );
  const gst = Math.round(subtotal * 0.18);
  const designerFee = 500;
  const discount = 0; // Add discount logic if needed
  const grandTotal = subtotal + gst + designerFee - discount;

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-12 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-secondary">
          Book New Appointment
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Fill the details below to schedule your session.
        </p>
      </div>

      {/* Category */}
      <CategorySelectorCard
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedProduct={setSelectedProduct}
        setSelectedProductDetails={setSelectedProductDetails}
      />

      <ProductSelectorCard
        selectedCategory={selectedCategory}
        filteredProducts={filteredProducts}
        tempSelectedProduct={tempSelectedProduct}
        setTempSelectedProduct={setTempSelectedProduct}
        addProductToList={(prod) => {
          if (!selectedProducts.find((p) => p._id === prod._id)) {
            setSelectedProducts((prev) => [...prev, prod]);
            toast.success("Product Added, See preview Below");
          }
        }}
        removeProductFromList={(id) => {
          setSelectedProducts((prev) => prev.filter((p) => p._id !== id));
          toast.success("Product Removed");
        }}
        selectedProducts={selectedProducts}
      />

      {/* Designer + Calendar */}
      <div className="flex flex-col md:flex-row gap-4">
        <DesignerSelectorCard
          designer={designer}
          selectedDesigner={selectedDesigner}
          setSelectedDesigner={setSelectedDesigner}
          selectedDesignerDetails={selectedDesignerDetails}
        />
        <DesignerAppointmentCard
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          appointmentMode={appointmentMode}
          setAppointmentMode={setAppointmentMode}
          locationAddress={locationAddress}
          setLocationAddress={setLocationAddress}
        />
      </div>

      {/* Notes */}
      <div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[40px]"
            />
          </CardContent>
        </Card>
      </div>
      <AppointmentSummaryCard
        selectedDesignerDetails={selectedDesignerDetails}
        selectedDate={selectedDate}
        selectedProducts={selectedProducts}
        appointmentMode={appointmentMode}
        locationAddress={locationAddress}
        subtotal={subtotal}
        gst={gst}
        designerFee={designerFee}
        discount={discount}
        grandTotal={grandTotal}
        notes={notes}
      />

      <div className="flex justify-between">
        <button
          onClick={handleClearForm}
          className="text-sm flex items-center gap-1 justify-center px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 transition-all"
        >
           Clear <MdDeleteForever size={18} />
        </button>
        <BookAppointmentDialog
          selectedCategory={selectedCategory}
          selectedProducts={selectedProducts}
          selectedDesigner={selectedDesigner}
          selectedDesignerDetails={selectedDesignerDetails}
          selectedDate={selectedDate}
          appointmentMode={appointmentMode}
          locationAddress={locationAddress}
          notes={notes}
          handleClick={handleClick}
        />
      </div>
    </motion.div>
  );
};

export default NewAppointment;
