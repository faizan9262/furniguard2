import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/components/ui/card";
import { format } from "date-fns";

const AppointmentSummaryCard = ({
  selectedDesignerDetails,
  selectedDate,
  selectedProducts,
  appointmentMode,
  locationAddress,
  subtotal,
  gst,
  designerFee,
  discount,
  grandTotal,
  notes,
}) => {
  if (
    selectedProducts.length === 0 ||
    !selectedDesignerDetails ||
    !selectedDate
  ) {
    return null;
  }

  return (
    <Card className="w-full border-2 border-dashed border-primary/40 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          Appointment Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        {/* Designer, Date, Mode, Address */}
        <div className="grid sm:grid-cols-2 gap-2">
          <div>
            <p className="text-muted-foreground">Designer</p>
            <p className="font-medium">
              {selectedDesignerDetails?.user?.username}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Appointment Date</p>
            <p className="font-medium">{format(selectedDate, "PPP")}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Appointment Mode</p>
            <p className="font-medium">{appointmentMode}</p>
          </div>
          {appointmentMode === "Home" && (
            <div>
              <p className="text-muted-foreground">Home Address</p>
              <p className="font-medium">{locationAddress}</p>
            </div>
          )}
        </div>

        {/* Selected Products */}
        <div>
          <p className="text-muted-foreground font-medium mb-2">
            Selected Products
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-muted border rounded-xl p-3 space-y-1"
              >
                <p className="font-semibold text-primary">
                  {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Category: {product.category}
                </p>
                <p className="text-xs text-muted-foreground">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="pt-4 border-t">
          <p className="font-medium text-muted-foreground mb-2">
            Price Breakdown
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
            <div>
              <p className="text-xs text-muted-foreground">Subtotal</p>
              <p className="font-semibold">₹{subtotal.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">GST (18%)</p>
              <p className="font-semibold">₹{gst.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Designer Fee</p>
              <p className="font-semibold">₹{designerFee.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Discount</p>
              <p className="font-semibold text-green-600">
                - ₹{discount.toLocaleString()}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <p className="text-xs text-muted-foreground">Total Payable</p>
              <p className="text-lg font-bold text-primary">
                ₹{grandTotal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="pt-4 border-t">
            <p className="text-muted-foreground font-medium mb-1">Notes</p>
            <p className="text-sm text-muted-foreground italic">{notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentSummaryCard;
