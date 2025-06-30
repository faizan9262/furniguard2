import React from "react";
import { Card, CardContent } from "../components/components/ui/card";
import { Badge } from "../components/components/ui/badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../components/components/ui/avatar";
import {
  CalendarClockIcon,
  CircleCheckBig,
  CircleDashed,
  CheckCircle2,
} from "lucide-react";

const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return {
        bg: "bg-green-500",
        icon: <CircleCheckBig className="w-4 h-4" />,
        label: "Confirmed",
      };
    case "completed":
      return {
        bg: "bg-blue-600",
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: "Completed",
      };
    default:
      return {
        bg: "bg-yellow-500",
        icon: <CircleDashed className="w-4 h-4" />,
        label: "Pending",
      };
  }
};

const AppointmentCard = ({
  user,
  designer,
  product,
  date,
  status,
  notes,
  onClick,
}) => {
  const { bg, icon, label } = getStatusStyles(status);

  return (
    <Card
      onClick={onClick}
      className="group flex border-gray-300 items-start gap-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer p-4 sm:p-6 rounded-3xl"
    >
      {/* Product Preview */}

      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="w-full gap-4 flex md:flex-row flex-col">
          <img
            src={product[0]?.product?.image}
            alt={product[0]?.product?.title}
            className="w-full h-32 sm:w-1/2 object-cover rounded-xl"
          />
          <div className="w-full flex flex-col gap-1 justify-start">
            <h3 className="text-xl font-normal text-primary line-clamp-1">
              {product[0]?.product?.name?.charAt(0).toUpperCase() +
                product[0]?.product?.name?.slice(1)}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-4">
              {product[0]?.product?.description}
            </p>
            <div className="flex items-center justify-start gap-1">
              <Badge className="text-primary  bg-primary/10">
                {product[0]?.product?.category?.charAt(0).toUpperCase() +
                  product[0]?.product?.category?.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
          <h2 className="text-lg font-semibold flex flex-col gap-2 text-primary-foreground">
            Appointment Details
          </h2>
          <div className="flex md:flex-col gap-2 justify-start">
            {/* Date Badge */}
            <div className="flex items-center justify-start gap-1">
              <CalendarClockIcon className="w-4 h-4 text-primary" />
              <Badge className="text-primary bg-primary/10">
                {new Date(date).toLocaleDateString("en-GB")}
              </Badge>
            </div>

            {/* Status Badge */}
            <div
              className={`flex items-center px-1 md:p-1 justify-center rounded-full text-white ${bg}`}
            >
              {icon}
              <Badge className="bg-transparent text-white text-xs">
                {label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* User Info */}
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-primary">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500">Client</p>
            </div>
          </div>

          {/* Designer Info */}
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={designer?.user?.profilePicture} />
              <AvatarFallback>{designer?.user?.username?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-primary">
                {designer?.user?.username}
              </p>
              <p className="text-sm text-gray-500 whitespace-nowrap">{designer?.type}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
