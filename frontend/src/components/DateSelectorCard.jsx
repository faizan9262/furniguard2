import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/components/ui/card";
import { CalendarIcon, HomeIcon, Building2Icon, VideoIcon, MapPinIcon } from "lucide-react";
import { Calendar } from "@/components/components/ui/calendar"; // Adjust import if you renamed
import { RadioGroup, RadioGroupItem } from "@/components/components/ui/radio-group";
import { Label } from "@/components/components/ui/label";
import { Input } from "@/components/components/ui/input";
import { format } from "date-fns";

const DesignerAppointmentCard = ({
  selectedDate,
  setSelectedDate,
  appointmentMode,
  setAppointmentMode,
  locationAddress,
  setLocationAddress,
}) => {
  useEffect(() => {
    if (appointmentMode !== "Home") {
      setLocationAddress("");
    }
  }, [appointmentMode, setLocationAddress]);

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
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
            {selectedDate && (
              <p className="text-muted-foreground text-sm">
                Selected: <strong>{format(selectedDate, "PPP")}</strong>
              </p>
            )}
          </div>

          {/* Appointment Mode */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-primary">Appointment Mode</Label>
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
              <Label htmlFor="address" className="text-sm font-medium flex items-center gap-1">
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
