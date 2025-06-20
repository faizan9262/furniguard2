import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/components/ui/alert-dialog";
import { Button } from "@/components/components/ui/button";
import { CalendarCheck2 } from "lucide-react";
import { format } from "date-fns";

const BookAppointmentDialog = ({
  selectedCategory,
  selectedProducts,
  selectedDesigner,
  selectedDesignerDetails,
  selectedDate,
  appointmentMode,
  locationAddress,
  notes,
  handleClick,
}) => {
  const isDisabled =
    !selectedCategory ||
    selectedProducts.length === 0 ||
    !selectedDesigner ||
    !selectedDate ||
    !appointmentMode ||
    (appointmentMode === "Home" && !locationAddress.trim());

  return (
    <div className="text-right">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isDisabled} className="bg-primary">
            <CalendarCheck2 className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2 text-left text-sm">
              <p>
                <strong>Designer:</strong>{" "}
                {selectedDesignerDetails?.user?.username}
              </p>
              <p>
                <strong>Products:</strong>{" "}
                {selectedProducts.map((p) => p.name).join(", ") || "None"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
              </p>
              <p>
                <strong>Appointment Mode:</strong> {appointmentMode}
              </p>
              {appointmentMode === "Home" && (
                <p>
                  <strong>Home Address:</strong> {locationAddress}
                </p>
              )}
              {notes && (
                <p>
                  <strong>Notes:</strong> {notes}
                </p>
              )}
              <p className="text-red-500 mt-2">
                Are you sure you want to book this appointment? This action
                cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClick}
              className="bg-primary hover:bg-secondary"
            >
              Yes, Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookAppointmentDialog;
