import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { BarChart3, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";
import { Button } from "../components/components/ui/button";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center p-6">
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center space-y-6">
        <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-4 rounded-full">
          <TrendingUp size={40} />
        </div>
        <h1 className="text-4xl font-bold text-primary">Admin Control Center</h1>
        <p className="text-primary-foreground text-lg">
          Empower your platform with a growing catalog. Start by adding your latest products and watch your marketplace flourish.
        </p>
      </div>

      {/* Quick Insights Section */}
      <div className="mt-12 flex items-center justify-center gap-6 w-full max-w-4xl">
        <Card className="border border-muted-foreground/20 shadow-sm">
          <CardHeader className="flex items-center">
            <div className="bg-primary/10 text-primary p-3 rounded-full">
              <BsPlusCircle size={26} />
            </div>
            <CardTitle className="text-primary-foreground">Add Product</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted mb-4 text-sm">
              Instantly add your newest furniture collection to the store.
            </p>
            <Button onClick={() => navigate("/add")} className="w-full bg-primary text-white hover:bg-primary-foreground">
              Go to Add Product
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Message */}
      <div className="mt-12 text-center max-w-3xl">
        <h2 className="text-2xl font-semibold text-primary">Furniguard is growing stronger every day 🚀</h2>
        <p className="text-primary-foreground mt-2">
          Stay ahead by continuously updating your catalog and exploring new trends in modern furniture.
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
