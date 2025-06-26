import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/components/ui/dialog";
import {
  Card,
  CardTitle,
} from "../components/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/components/ui/avatar";
import { Button } from "../components/components/ui/button";
import { Label } from "../components/components/ui/label";
import { Textarea } from "../components/components/ui/textarea";
import { Star, Sofa, UserRoundCheck } from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Separator } from "../components/components/ui/separator";
import { toast } from "sonner";
import { submitCombinedRating } from "../helper/api-communicator.js";

function StarRating({ rating, setRating }) {
  return (
    <div className="flex gap-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => setRating(star)}
          className={`h-5 w-5 cursor-pointer transition-colors ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
          fill={star <= rating ? "#facc15" : "none"}
        />
      ))}
    </div>
  );
}

export default function RateComponent({ currentAppointment }) {
  const [open, setOpen] = useState(false);
  const [designerRating, setDesignerRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [productRatings, setProductRatings] = useState({});
  const [productFeedbacks, setProductFeedbacks] = useState({});

  console.log("Products Feedback: ", productFeedbacks);
  console.log("Products rating: ", productRatings);
  console.log("Designer rating: ", designerRating);
  console.log("Designer feedback: ", feedback);

  const handleProductRatingChange = (productId, rating) => {
    setProductRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };

  const handleProductFeedbackChange = (productId, feedbackText) => {
    setProductFeedbacks((prev) => ({
      ...prev,
      [productId]: feedbackText,
    }));
  };

  const handleSubmit = async () => {
      toast.loading("Submiting Your Rating,", { id: "rate" });
    if (!designerRating || !feedback || !productRatings || !productFeedbacks) {
      toast.warning("Feel All the Details.", { id: "rate" });
    }
    const ratingData = {
      designerRating,
      feedback,
      productRatings,
      productFeedbacks,
    };

    try {
      const res = await submitCombinedRating(
        ratingData,
        currentAppointment?.designer?._id
      );
      toast.success("Ratings submitted successfully!", { id: "rate" });
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!currentAppointment || currentAppointment.status !== "completed")
    return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-primary hover:bg-primary/20"
        >
          <Star className="w-4 h-4" />
          <span className="hidden md:block">Rate</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Designer Section */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Designer Feedback</Label>
            <Card className="p-4">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={currentAppointment?.designer?.user?.profilePicture}
                    alt={currentAppointment?.designer?.user?.username}
                  />
                  <AvatarFallback>
                    {currentAppointment?.designer?.user?.username?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <UserRoundCheck className="w-4 h-4 text-primary" />
                    {currentAppointment?.designer?.user?.username}
                  </CardTitle>

                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <Badge className="bg-primary/20 text-primary capitalize">
                      {currentAppointment?.designer?.type}
                    </Badge>
                    <span>
                      Experience:{" "}
                      <strong>
                        {currentAppointment?.designer?.experience} yrs
                      </strong>
                    </span>
                  </div>

                  <StarRating
                    rating={designerRating}
                    setRating={setDesignerRating}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label>General Feedback</Label>
                <Textarea
                  placeholder="Write your feedback for the designer..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
            </Card>
          </div>

          {/* Divider */}
          <Separator />

          {/* Product Ratings Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Product Ratings</Label>
            {currentAppointment.products?.map((prod) => (
              <Card key={prod._id} className="p-4 space-y-4">
                <div className="flex items-start gap-4">
                  <Sofa className="text-primary w-6 h-6 mt-1" />
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-base">{prod.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Category: {prod.product.category}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm mb-1">Rate this product:</p>
                      <StarRating
                        rating={productRatings[prod.product._id] || 0}
                        setRating={(rating) =>
                          handleProductRatingChange(prod.product._id, rating)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="block mb-1">Feedback</Label>
                  <Textarea
                    placeholder="Write your feedback for this product..."
                    value={productFeedbacks[prod.product._id] || ""}
                    onChange={(e) =>
                      handleProductFeedbackChange(
                        prod.product._id,
                        e.target.value
                      )
                    }
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full md:w-auto" onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
