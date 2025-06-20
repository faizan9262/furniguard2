import React from "react";
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
  MapIcon,
  Wallet,
  UserCog,
  DollarSign,
  Percent,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointment } from "../context/AppointmentsContex";
import { Button } from "@/components/components/ui/button";
import { toast } from "sonner";
import { cancelAppointment } from "../helper/api-communicator.js";
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
} from "@/components/components/ui/alert-dialog";
import { FaRupeeSign } from "react-icons/fa";

const AppointmentDetailPage = () => {
  const { id } = useParams();
  if (!id)
    return <div className="text-center py-10">No appointment selected.</div>;

  const appointment = useAppointment();
  const navigate = useNavigate();
  const currentAppointment = appointment.allAppointments.find(
    (ap) => ap._id === id
  );

  // console.log("ID: ",currentAppointment._id);

  console.log("Current: ", currentAppointment);

  const handleCancelAppointment = async () => {
    try {
      toast.loading("Canceling Your Appointment", { id: "cancel-ap" });
      await cancelAppointment(currentAppointment._id);
      toast.success("Appointment Cancelled", { id: "cancel-ap" });
      appointment.removeAppointment(currentAppointment._id);
      navigate("/appointments");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong", { id: "cancel-ap" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary">
            Appointment Details
          </h1>
          <p className="text-muted-foreground text-sm">
            Here's everything about your appointment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`capitalize bg-secondary/20 text-sm px-3 py-1 ${
              currentAppointment?.status === "Confirmed"
                ? "bg-primary"
                : "bg-yellow-500"
            }`}
          >
            {currentAppointment?.status || "Penidng"}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="gap-2 bg-primary/20"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:block">Download</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-primary/20">
            <Edit className="w-4 h-4 " />
            <span className="hidden md:block">Edit</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-red-500">
                <CalendarX2 className="w-4 h-4" />
                <span className="hidden md:block">Cancel</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this appointment? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Go Back</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancelAppointment}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Yes, Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Appointment Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {new Date(currentAppointment?.appointmentDate).toLocaleString(
              "en-IN",
              {
                dateStyle: "medium",
                timeStyle: "short",
              }
            )}
          </p>
          <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
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
            <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
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
              <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <Percent className="w-4 h-4 text-primary" />
                GST : {currentAppointment.gst}
              </div>
            )}
          {currentAppointment?.appointmentMode &&
            currentAppointment.discount !== 0 && (
              <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Discount : {currentAppointment.discount}
              </div>
            )}

          {currentAppointment?.appointmentMode && (
            <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              Grand Total : ₹ {currentAppointment.grandTotal}
            </div>
          )}

          {currentAppointment?.notes && (
            <>
              <Separator className="my-4" />
              <p className="text-sm italic text-muted-foreground">
                "{currentAppointment?.notes}"
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* User & Designer Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
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
              <CardTitle className="text-lg flex items-center gap-1">
                <UserRoundCheck className="w-4 h-4 text-primary" />
                Client
              </CardTitle>
              <p className="text-sm font-medium">
                {currentAppointment?.user?.username}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentAppointment?.user?.email}
              </p>
            </div>
          </CardHeader>
        </Card>

        <Card>
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
              <CardTitle className="text-lg flex items-center gap-2">
                <UserRoundCheck className="w-4 h-4 text-primary" />
                Designer
              </CardTitle>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium">
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
                <p className="text-sm text-muted-foreground mt-1">
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
        <h1 className="text-3xl font-bold text-secondary">Products</h1>
        <p className="text-muted-foreground text-sm">
          Here are all products selected for this appointment.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentAppointment?.products?.map((prod) => (
          <Card
            key={prod._id}
            onClick={() => navigate(`/products/${prod.product.category}/${prod.product._id}`)}
            className="cursor-pointer flex flex-col h-full transition-all hover:shadow-lg"
          >
            <CardHeader className="flex items-center gap-4">
              <Sofa className="text-primary w-6 h-6" />
              <div>
                <CardTitle className="text-xl">Product Details</CardTitle>
                <p className="text-lg text-muted-foreground">
                  {prod.product.name}
                </p>
                <p className="text-sm font-semibold text-secondary">
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
              <p className="text-sm mt-4 leading-relaxed text-muted-foreground line-clamp-3">
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
