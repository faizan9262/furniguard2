import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { LuImageUp } from "react-icons/lu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/components/ui/card";
import { Input } from "../components/components/ui/input";
import { Label } from "../components/components/ui/label";
import { Button } from "../components/components/ui/button";
import { Textarea } from "../components/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/components/ui/select";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const AddProduct = () => {
  const [product_imgs, setProduct_Imgs] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("flooring");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Adding product...", { id: "addProduct" });
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      product_imgs.forEach((img) => {
        formData.append("product_img", img);
      });

      const response = await axios.post(
        backendUrl + "/api/products/add",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Product added successfully", { id: "addProduct" });
        setName("");
        setDescription("");
        setPrice("");
        setProduct_Imgs(null);
        navigate("/products");
      } else {
        console.error("Failed to add product", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while adding product. Try again.", {
        id: "addProduct",
      });
    }
  };

  const removeImage = (index) => {
    setProduct_Imgs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#f5fdf9] px-4 sm:px-10 py-10 flex flex-col items-center">
      <Card className="w-full max-w-3xl border border-muted-foreground/20 shadow-sm">
        <form onSubmit={onSubmitHandler}>
          <CardHeader>
            <CardTitle className="text-primary text-2xl">
              Add New Product
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid gap-2 text-primary">
              <Label htmlFor="product_img">Product Images</Label>
              <div className="flex flex-wrap gap-4">
                {product_imgs.map((img, index) => (
                  <div key={index} className="w-28 h-28 relative">
                    <div key={index} className="w-28 h-28 relative group">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full text-xs p-1 hidden group-hover:flex"
                        title="Remove"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <label
                  htmlFor="product_img"
                  className="w-28 h-28 flex items-center justify-center border border-dashed rounded-md cursor-pointer hover:bg-primary/10 transition"
                >
                  <LuImageUp className="text-muted-foreground text-2xl" />
                  <input
                    id="product_img"
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      setProduct_Imgs((prev) => [
                        ...prev,
                        ...Array.from(e.target.files),
                      ])
                    }
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-2 text-primary">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Luxury Wooden Chair"
                required
              />
            </div>

            <div className="grid gap-2 text-primary">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed product description..."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2 text-primary">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-primary">
                    <SelectItem value="flooring">Flooring</SelectItem>
                    <SelectItem value="livingroom">Living Room</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="stairs">Stairs</SelectItem>
                    <SelectItem value="lights">Lights</SelectItem>
                    <SelectItem value="textile">Textile</SelectItem>
                    <SelectItem value="layout">Layout</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="wallpaper">Wallpaper</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2 text-primary">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="2500"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-6">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-primary text-white hover:bg-primary-foreground"
            >
              Add Product
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
