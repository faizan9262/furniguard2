import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/components/ui/avatar";
import { Badge } from "../components/components/ui/badge";
import { Separator } from "../components/components/ui/separator";
import {
  Calendar,
  Info,
  UserRoundCheck,
  Sofa,
  Download,
  CalendarX2,
  Edit,
  MapPin,
  Wallet,
  DollarSign,
  Percent,
  DeleteIcon,
} from "lucide-react";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { Button } from "../components/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/components/ui/alert-dialog";
import { cancelAppointment, updateStatus } from "../helper/apis.js";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/components/ui/select";

const AppointmentDetailPage = () => {
  const { id } = useParams();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");
  if (!id)
    return <div className="text-center py-10">No appointment selected.</div>;

  const appointment = useAdmin();
  const navigate = useNavigate();
  const currentAppointment = appointment.allAppointments.find(
    (ap) => ap._id === id
  );

  console.log("Current ID: ", currentAppointment?._id);
  console.log("Current Status: ", newStatus);

  const handleCancelAppointment = async () => {
    try {
      toast.loading("Canceling Your Appointment", { id: "cancel-ap" });
      await cancelAppointment(currentAppointment._id,reason);
      toast.success("Appointment Cancelled", { id: "cancel-ap" });
      appointment.removeAppointment(currentAppointment._id);
      navigate("/appointments");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong", { id: "cancel-ap" });
    }
  };

  const handleUpdateStatus = async () => {
    try {
      toast.loading("Updating status...", { id: "update-status" });
      const res = await updateStatus(newStatus, currentAppointment._id);
      console.log("Data from update status: ", res);
      currentAppointment.status = res?.updatedAppointment?.status;
      toast.success("Status updated successfully", { id: "update-status" });
      setOpenEditDialog(false);
    } catch (err) {
      toast.error("Failed to update status", { id: "update-status" });
      console.error(err);
    }
  };

  // Inside component

  // Status flow logic
  const getNextStatusOptions = (currentStatus) => {
    if (currentStatus === "pending") return ["confirmed"];
    if (currentStatus === "confirmed") return ["completed"];
    return [];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#326951]">
            Appointment Details
          </h1>
          <p className="text-gray-500 text-sm">
            Here's everything about your appointment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`capitalize text-sm px-3 py-1 border border-gray-200 shadow-md  ${
              currentAppointment?.status === "Confirmed"
                ? "bg-[#2d9b67] text-white"
                : "bg-yellow-500 text-white"
            }`}
          >
            {currentAppointment?.status || "Pending"}
          </Badge>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="gap-2 bg-[#2d9b67]/20 border border-gray-200 shadow-md hover:bg-white transition-all duration-300 text-[#2d9b67]"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:block">Download</span>
          </Button>

          {currentAppointment?.status !== "completed" && (
            <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-[#2d9b67]/20 border border-gray-200 shadow-md hover:bg-white transition-all duration-300 text-[#2d9b67]"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden md:block">Edit</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="text-primary">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Update Appointment Status
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                  <Select onValueChange={(val) => setNewStatus(val)}>
                    <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm text-[#2d9b67] bg-white hover:border-[#2d9b67] focus:ring-2 focus:ring-[#2d9b67] focus:outline-none">
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>

                    <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md text-[#326951]">
                      {getNextStatusOptions(currentAppointment?.status).map(
                        (status) => (
                          <SelectItem
                            key={status}
                            value={status}
                            className="cursor-pointer transition-all rounded-md px-2 py-1"
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <DialogFooter className="mt-4">
                  <Button
                    onClick={handleUpdateStatus}
                    disabled={!newStatus}
                    className="bg-[#2d9b67] text-white hover:bg-[#287d55]"
                  >
                    Update
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-red-500">
                {currentAppointment?.status !== "completed" ? (
                  <CalendarX2 className="w-4 h-4" />
                ) : (
                  <MdDelete className="w-4 h-4" />
                )}
                <span className="hidden md:block">
                  {currentAppointment?.status !== "completed"
                    ? "Cancel"
                    : "Delete"}
                </span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="text-primary">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {currentAppointment?.status !== "completed"
                    ? "Cancel Appointment"
                    : "Delete Appointment"}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-primary-foreground mb-4">
                  Are you sure you want to{" "}
                  {currentAppointment?.status !== "completed"
                    ? "cancel"
                    : "delete"}{" "}
                  this appointment? This action cannot be undone.
                </AlertDialogDescription>

                {/* Reason Textarea */}
                <div>
                  <label
                    htmlFor="reason"
                    className="text-sm font-medium block mb-1"
                  >
                    Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2 border rounded text-sm text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="Enter reason for cancellation/deletion..."
                  />
                </div>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="text-white border-gray-300 hover:bg-white bg-primary">
                  Go Back
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancelAppointment}
                  className="bg-red-500 text-white hover:bg-red-600"
                  disabled={!reason.trim()}
                >
                  Yes,{" "}
                  {currentAppointment?.status !== "completed"
                    ? "Cancel"
                    : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Separator />

      <Card className="border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-primary gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Appointment Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            {new Date(currentAppointment?.appointmentDate).toLocaleString(
              "en-IN",
              {
                dateStyle: "medium",
                timeStyle: "short",
              }
            )}
          </p>
          <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            Created at{" "}
            <span className="font-medium">
              {new Date(currentAppointment?.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          {currentAppointment?.appointmentMode && (
            <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Mode : {currentAppointment.appointmentMode}
              {currentAppointment.appointmentMode === "Home" &&
                currentAppointment.locationAddress && (
                  <span className="italic text-xs">
                    ({currentAppointment.locationAddress})
                  </span>
                )}
            </div>
          )}

          {currentAppointment?.appointmentMode &&
            currentAppointment.gst !== 0 && (
              <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <Percent className="w-4 h-4 text-primary" />
                GST : {currentAppointment.gst}
              </div>
            )}
          {currentAppointment?.appointmentMode &&
            currentAppointment.discount !== 0 && (
              <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Discount : {currentAppointment.discount}
              </div>
            )}

          {currentAppointment?.appointmentMode && (
            <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              Grand Total : ₹ {currentAppointment.grandTotal}
            </div>
          )}

          {currentAppointment?.notes && (
            <>
              <Separator className="my-4" />
              <p className="text-sm italic text-gray-500">
                "{currentAppointment?.notes}"
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* User & Designer Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-md">
          <CardHeader
            onClick={() => {
              navigate("/profile");
            }}
            className="flex items-start gap-4 cursor-pointer"
          >
            <Avatar>
              <AvatarImage src={currentAppointment?.user?.profilePicture} />
              <AvatarFallback>
                {currentAppointment?.user?.username?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-lg flex text-primary items-center gap-1">
                <UserRoundCheck className="w-4 h-4 text-primary" />
                Client
              </CardTitle>
              <p className="text-sm text-primary-foreground font-medium">
                {currentAppointment?.user?.username}
              </p>
              <p className="text-sm text-gray-500">
                {currentAppointment?.user?.email}
              </p>
            </div>
          </CardHeader>
        </Card>

        <Card className="border border-gray-200 shadow-md">
          <CardHeader
            onClick={() =>
              navigate(`/designers/${currentAppointment?.designer?._id}`)
            }
            className="flex items-start gap-4 cursor-pointer"
          >
            <Avatar>
              <AvatarImage
                src={currentAppointment?.designer?.user?.profilePicture}
              />
              <AvatarFallback>
                {currentAppointment?.designer?.user?.username?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-lg flex text-primary items-center gap-2">
                <UserRoundCheck className="w-4 h-4 text-primary" />
                Designer
              </CardTitle>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-primary-foreground font-medium">
                  {currentAppointment?.designer?.user?.username}
                </p>
              </div>
              <div className="flex items-center gap-4 justify-between">
                <Badge
                  variant="default"
                  className="text-xs mt-1 bg-primary/20 text-primary capitalize w-fit"
                >
                  {currentAppointment?.designer?.type}
                </Badge>
                <p className="text-sm text-gray-500 mt-1">
                  Experience:{" "}
                  <span className="font-semibold">
                    {currentAppointment?.designer?.experience} yrs
                  </span>
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-primary">Products</h1>
        <p className="text-muted-foreground text-sm">
          Here are all products selected for this appointment.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentAppointment?.products?.map((prod) => (
          <Card
            key={prod._id}
            onClick={() =>
              navigate(`/products/${prod.product.category}/${prod.product._id}`)
            }
            className="cursor-pointer border border-gray-200 shadow-md flex items-start flex-col h-full transition-all hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Sofa className="text-primary w-6 h-6" />
              <div>
                <CardTitle className="text-xl text-primary">
                  Product Details
                </CardTitle>
                <p className="text-lg text-primary-foreground">
                  {prod.product.name}
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  {prod.product.category}
                </p>
                <p className="text-sm font-semibold text-primary">
                  ₹ {prod.price.toLocaleString()}
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col justify-between flex-grow pt-0">
              <img
                src={prod.product.image}
                alt={prod.product.name}
                className="rounded-xl w-full h-[200px] object-cover"
              />
              <p className="text-sm mt-4 leading-relaxed text-gray-500 line-clamp-3">
                {prod.product.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="bg-yellow-100 dark:bg-yellow-200/10 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-500/40 px-4 py-3 rounded-xl text-sm">
        <p className="font-medium">Note:</p>
        <p>
          You cannot modify or update this appointment. In case of any mistake,
          please
          <span className="font-semibold text-red-600 dark:text-red-400">
            {" "}
            cancel{" "}
          </span>
          this appointment and create a new one.
        </p>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
