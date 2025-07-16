import React, { useState } from "react";
import { useAppointment } from "../context/AppointmentsContex";
import { motion, AnimatePresence } from "framer-motion";
import AppointmentCard from "../components/AppointmentCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/components/ui/select";
import { LuCalendarPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Calendar } from "@/components/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/components/ui/dialog";
import { format } from "date-fns";
import { toast } from "sonner";
import axios from "axios";

const statusOptions = ["all", "pending", "confirmed", "completed"];

const Appointments = () => {
  const appointments = useAppointment();
  const [statusFilter, setStatusFilter] = useState("all");
  const [openSlotDialog, setOpenSlotDialog] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const navigate = useNavigate();
  const auth = useAuth();

  const activeAppointmentsRaw =
    appointments?.allAppointments?.length > 0
      ? appointments.allAppointments
      : appointments?.DesignerAllAppointments || [];

  const activeAppointments = [...activeAppointmentsRaw].sort(
    (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
  );

  const filteredAppointments = activeAppointments.filter((item) => {
    const statusMatch = statusFilter === "all" || item.status === statusFilter;
    return statusMatch;
  });

  // console.log("All Ap: ", appointments?.DesignerAllAppointments);

  // console.log("Filtered: ", filteredAppointments);

  const slots = selectedDates.map((d) => d.toISOString());

  console.log("Slots:: ", slots);

  const addSlots = async () => {
    try {
      toast.loading("Adding Slots: ", { id: "slots" });
      const response = await axios.post("/designers/add-slots", { slots });
      console.log("Resposne: ", response);
      toast.success("Slots Updated.", { id: "slots" });
      setSelectedDates([]);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong", { id: "slots" });
    }
  };

  return (
    <div className="mx-4 sm:mx-[10%] min-h-screen my-5">
      <div className="flex items-center justify-between mb-6">
        {auth?.user?.role === "designer" && (
          <Dialog open={openSlotDialog} onOpenChange={setOpenSlotDialog}>
            <DialogTrigger asChild>
              <Button className="flex gap-1">
                <LuCalendarPlus />
                Add Slots
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90vw] max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary font-bold">
                  Select Available Dates for Appointments
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col items-center gap-4">
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={setSelectedDates}
                  className="rounded-md border w-full md:w-2/3 bg-primary/10"
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />

                {selectedDates.length > 0 && (
                  <ul className="text-sm text-muted-foreground">
                    {selectedDates.map((date, i) => (
                      <li key={i}>{format(date, "PPP")}</li>
                    ))}
                  </ul>
                )}

                <Button
                  onClick={() => {
                    addSlots(), setOpenSlotDialog(false);
                  }}
                  disabled={selectedDates.length === 0}
                  className="w-full bg-primary text-white"
                >
                  Confirm Slots
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <p className="text-md md:text-3xl font-semibold md:font-bold text-secondary">
          {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}{" "}
          Appointments
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-30">
            <Select
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val)}
            >
              <SelectTrigger id="status-filter" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {appointments?.allAppointments?.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1 bg-primary text-white"
              onClick={() => navigate("/new-appointment")}
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden md:block">New Appointment</span>
            </Button>
          )}
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        <AnimatePresence>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AppointmentCard
                  user={item.user}
                  designer={item.designer}
                  product={item.products?.map((p) => p)}
                  date={item.appointmentDate}
                  status={item.status}
                  notes={item.notes}
                  onClick={() => navigate(`/appointments/${item._id}`)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-500 text-lg"
            >
              No appointments found.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Appointments;
