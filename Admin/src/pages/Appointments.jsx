import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";
import AppointmentCard from "../components/AppointmentCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/components/ui/select";
import { useNavigate } from "react-router-dom";

const statusOptions = ["all", "pending", "confirmed", "completed"];

const Appointments = () => {
  const appointments = useAdmin();
  const allAppointmentsOfUser = [...appointments.allAppointments].sort(
    (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
  );

  console.log("All Ap: ", appointments.allAppointments);

  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filteredAppointments = allAppointmentsOfUser.filter((item) => {
    const statusMatch = statusFilter === "all" || item.status === statusFilter;

    return statusMatch;
  });

  console.log("Filtered: ", filteredAppointments);

  return (
    <div className="mx-4 sm:mx-[10%] min-h-screen my-5">
      <div className="flex items-center justify-between mb-6">
        <p className="text-md md:text-3xl font-semibold md:font-bold text-primary-foreground">
          Manage {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}{" "}
          Appointments
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-30">
            <Select
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val)}
            >
              <SelectTrigger
                id="status-filter"
                className="w-full border border-gray-300 bg-white text-black hover:bg-gray-100"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black border border-gray-200 shadow-md rounded-md">
                {statusOptions.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
