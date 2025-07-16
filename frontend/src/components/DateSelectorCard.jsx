import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/components/ui/card";
import {
  CalendarIcon,
  HomeIcon,
  Building2Icon,
  VideoIcon,
  MapPinIcon,
} from "lucide-react";
import { Calendar } from "@/components/components/ui/calendar";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/components/ui/radio-group";
import { Label } from "@/components/components/ui/label";
import { Input } from "@/components/components/ui/input";
import { format, isSameDay } from "date-fns";

const DesignerAppointmentCard = ({
  selectedDate,
  setSelectedDate,
  appointmentMode,
  setAppointmentMode,
  locationAddress,
  setLocationAddress,
  designer,
}) => {

  console.log("Designer: ",designer);
  
  useEffect(() => {
    if (appointmentMode !== "Home") {
      setLocationAddress("");
    }
  }, [appointmentMode, setLocationAddress]);

  useEffect(() => {
    const isSelectedDateValid = designer?.availableSlots?.some((slot) => {
      const slotDate = new Date(slot.date);
      return (
        slotDate.getFullYear() === selectedDate?.getFullYear() &&
        slotDate.getMonth() === selectedDate?.getMonth() &&
        slotDate.getDate() === selectedDate?.getDate()
      );
    });

    if (!isSelectedDateValid) {
      setSelectedDate(null);
    }
  }, [designer, selectedDate, setSelectedDate]);

  const modifiers = useMemo(() => {
    const free = designer?.availableSlots
      ?.filter((slot) => !slot.isBooked)
      .map((slot) => new Date(slot.date));
    const booked = designer?.availableSlots
      ?.filter((slot) => slot.isBooked)
      .map((slot) => new Date(slot.date));

    return {
      free,
      booked,
    };
  }, [designer]);

  const modifiersClassNames = {
    free: "bg-green-200 text-green-800 font-medium",
    booked: "bg-red-200 text-red-600 line-through pointer-events-none cursor-not-allowed",
  };

  const modifiersStyles = {
    booked: {
      position: "relative",
    },
  };

  const isDateDisabled = (date) => {
    return !designer?.availableSlots?.some(
      (slot) =>
        !slot.isBooked && isSameDay(new Date(slot.date), date)
    );
  };

  return (
    <Card className="w-full md:w-2/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary" />
          Designer Appointment
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-5">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-primary">Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={isDateDisabled}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              modifiersStyles={modifiersStyles}
              className="rounded-md border w-full"
            />
            {selectedDate && (
              <p className="text-muted-foreground text-sm">
                Selected: <strong>{format(selectedDate, "PPP")}</strong>
              </p>
            )}
          </div>

          {/* Appointment Mode */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-primary">
              Appointment Mode
            </Label>
            <RadioGroup
              value={appointmentMode}
              onValueChange={setAppointmentMode}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Online" id="online" />
                <Label htmlFor="online" className="flex items-center gap-1">
                  <VideoIcon size={16} /> Online
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Studio" id="studio" />
                <Label htmlFor="studio" className="flex items-center gap-1">
                  <Building2Icon size={16} /> Studio
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Home" id="home" />
                <Label htmlFor="home" className="flex items-center gap-1">
                  <HomeIcon size={16} /> Home
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Address input only if Home is selected */}
          {appointmentMode === "Home" && (
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium flex items-center gap-1"
              >
                <MapPinIcon size={16} /> Home Address
              </Label>
              <Input
                id="address"
                placeholder="Enter your address"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignerAppointmentCard;
