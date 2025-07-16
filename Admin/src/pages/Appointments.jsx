import React, { useState } from "react";
import { AdminContex, useAdmin } from "../context/AdminContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/components/ui/select";
import { Button } from "../components/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/components/ui/badge";
import { TrashIcon, EyeIcon } from "lucide-react";
import { Input } from "@/components/components/ui/input";
import { cancelAppointment } from "../helper/apis";
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
} from "@/components/components/ui/alert-dialog";

const statusOptions = ["all", "pending", "confirmed", "completed"];

const Appointments = () => {
  const appointments = useAdmin();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reason, setReason] = useState("");

  const allAppointments = [...appointments.allAppointments].sort(
    (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
  );

  console.log("All APs: ", allAppointments);
  console.log("Reason: ", reason);

  const filteredAppointments = allAppointments
    .filter((item) => {
      return statusFilter === "all" || item.status === statusFilter;
    })
    .filter((item) => {
      const userName = item.user?.username || "";
      const designerName = item.designer?.user?.username || "";

      return (
        userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        designerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  console.log("Filtered Appointments:", filteredAppointments);

  // console.log("Search Query: ",searchQuery);

  const handleCancelAppointment = async (apId, reason) => {
    try {
      toast.loading("Canceling Your Appointment", { id: "cancel-ap" });
      await cancelAppointment(apId,reason);
      toast.success("Appointment Cancelled", { id: "cancel-ap" });
      appointments.setAllAppointments(prev => prev.filter(ap => ap._id !== apId));
      navigate("/appointments");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong", { id: "cancel-ap" });
    }
  };

  return (
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Appointments Dashboard
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="w-full mt-4 sm:mt-0 border-r-4 border-b-4 border-primary/40"
            placeholder="Search by name..."
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px] mt-4 sm:mt-0 border-r-4 border-b-4 border-primary/40 text-primary">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-primary text-white">
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-center text-muted-foreground mt-10 text-lg">
          No appointments found.
        </p>
      ) : (
        <div className="overflow-auto rounded-xl shadow-lg border border-muted bg-white">
          {/* DESKTOP TABLE (md and up) */}
          <Table className="hidden md:table">
            <TableHeader className="sticky top-0 z-10 bg-primary/10 backdrop-blur-md">
              <TableRow>
                <TableHead className="whitespace-nowrap text-primary">
                  User
                </TableHead>
                <TableHead className="whitespace-nowrap text-primary">
                  Designer
                </TableHead>
                <TableHead className="whitespace-nowrap text-primary">
                  Products
                </TableHead>
                <TableHead className="whitespace-nowrap text-primary">
                  Date
                </TableHead>
                <TableHead className="whitespace-nowrap text-primary">
                  Status
                </TableHead>
                <TableHead className="text-right text-primary">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments?.map((item) => (
                <TableRow key={item._id} className="hover:bg-muted/40">
                  <TableCell
                    onClick={() => navigate(`/appointments/${item._id}`)}
                    className="font-medium  text-sm"
                  >
                    <div className="flex items-center cursor-pointer gap-2">
                      <img
                        src={item?.user?.profilePicture}
                        alt="profile"
                        className="w-8 h-8 rounded-full"
                      />

                      <p className="text-primary font-semibold">
                        {item.user?.username || "-"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={item?.designer?.user?.profilePicture}
                        alt="profile"
                        className="w-8 h-8 rounded-full"
                      />

                      <p className="text-primary font-semibold">
                        {item.designer?.user?.username || "-"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-primary font-semibold">
                    {item.products?.map((p) => p.product?.name).join(", ")}
                  </TableCell>
                  <TableCell className="text-sm text-primary">
                    {new Date(item.appointmentDate).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()} // optional
                          >
                            <TrashIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="text-primary">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Appointment
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-primary-foreground mb-4">
                              Are you sure you want to delete this appointment?
                              This action cannot be undone.
                            </AlertDialogDescription>

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
                                placeholder="Enter reason for deletion..."
                              />
                            </div>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-white border-gray-300 hover:bg-white bg-primary">
                              Go Back
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleCancelAppointment(item._id, reason)
                              }
                              className="bg-red-500 text-white hover:bg-red-600"
                              disabled={!reason.trim()}
                            >
                              Yes, Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* MOBILE CARDS (below md) */}
          <div className="md:hidden flex flex-col gap-3 p-4">
            {filteredAppointments?.map((item) => (
              <div
                key={item._id}
                className="border-l-[10px] border-primary border rounded-xl px-4 py-3 bg-white shadow-sm space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="text-xs text-primary font-semibold">
                    <span className="font-medium text-muted">User: </span>
                    {item?.user?.username || "-"}
                  </div>
                  <Badge
                    className={`text-xs px-2 py-1 rounded-full capitalize ${
                      item.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </Badge>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()} // optional
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="text-primary">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                        <AlertDialogDescription className="text-primary-foreground mb-4">
                          Are you sure you want to delete this appointment? This
                          action cannot be undone.
                        </AlertDialogDescription>

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
                            placeholder="Enter reason for deletion..."
                          />
                        </div>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-white border-gray-300 hover:bg-white bg-primary">
                          Go Back
                        </AlertDialogCancel>s
                        <AlertDialogAction
                          onClick={() => handleCancelAppointment(item._id, reason)}
                          className="bg-red-500 text-white hover:bg-red-600"
                          disabled={!reason.trim()}
                        >
                          Yes, Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div className="text-xs text-primary font-semibold">
                  <span className="font-medium text-muted">Designer: </span>
                  {item.designer?.user?.username || "-"}
                </div>

                <div className="text-xs text-primary font-semibold">
                  <span className="font-medium text-muted">Products: </span>
                  {item.products?.map((p) => p.product?.name).join(", ")}
                </div>

                <div className="text-xs text-primary font-semibold">
                  <span className="font-medium text-muted">Date: </span>
                  {new Date(item.appointmentDate).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
