import React, { useState, useEffect } from "react";
import { Button } from "../components/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/components/ui/table";
import { Input } from "../components/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/components/ui/select";
import { useAdmin } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { backendUrl } from "./Add";
import { Badge } from "@/components/components/ui/badge";
import { DeleteIcon, EditIcon, PlusCircle, TrashIcon } from "lucide-react";
import { MdAdd } from "react-icons/md";

const Products = () => {
  const { list, setList } = useAdmin();
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = list.filter((product) => {
      const matchCategory = category === "all" || product.category === category;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
    setFilteredList(filtered);
  }, [list, searchQuery, category]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/products/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setList(list.filter((item) => item._id !== id));
        toast.success("Product deleted successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const categories = [
    "all",
    "flooring",
    "livingroom",
    "kitchen",
    "stairs",
    "lights",
    "textile",
    "layout",
    "furniture",
    "bathroom",
    "wallpaper",
  ];

  return (
    <div className="h-full px-4 sm:px-12 py-10 bg-[#f7fcf9]">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Manage Products
      </h1>

      {/* Filters */}
      <div className="flex  gap-4 mb-6 justify-center items-center">
        <Input
          placeholder="Search products..."
          className="w-full border-r-4 border-b-4 border-[#2d9b67]/40 bg-white text-[#1c4532] placeholder:text-[#2d9b67] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2d9b67] shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[200px] border-r-4 border-b-4 border-[#2d9b67]/40 bg-white text-[#2d9b67] font-medium shadow-sm hover:shadow-md focus:ring-2 focus:ring-[#2d9b67] transition rounded-lg">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-[#2d9b67] text-[#2d9b67] rounded-md shadow-lg">
            {categories.map((cat) => (
              <SelectItem
                key={cat}
                value={cat}
                className="hover:bg-[#2d9b67]/10 focus:bg-[#2d9b67]/20 text-[#2d9b67] font-medium px-4 py-2 transition-all cursor-pointer capitalize"
              >
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="default"
          className="text-white flex gap-2 font-semibold"
          onClick={()=> navigate('/add')}
        >
          <PlusCircle className="text-white" /> Add
        </Button>
      </div>

      {/* No Products */}
      {filteredList.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found.</p>
      ) : (
        <>
          {/* TABLE: Desktop Only */}
          <div className="overflow-x-auto border rounded-xl bg-white shadow hidden md:block">
            <Table>
              <TableHeader className="bg-primary/20 text-primary backdrop-blur-md">
                <TableRow>
                  <TableHead className="text-left">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredList.map((product) => (
                  <TableRow
                    onClick={() =>
                      navigate(`/products/${product.category}/${product._id}`)
                    }
                    key={product._id}
                  >
                    <TableCell>
                      <img
                        src={product.images?.[0] || product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-md object-cover shadow-xl"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-primary">
                      {product.name}
                    </TableCell>
                    <TableCell className="capitalize text-primary">
                      {product.category}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-primary/20 text-primary text-sm">
                        ₹{product.price}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-primary border-primary hover:bg-primary hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/products/edit/${product._id}`);
                          }}
                        >
                          <EditIcon className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(product._id);
                          }}
                        >
                          <TrashIcon className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden flex flex-col gap-3 mt-4">
            {filteredList.map((product) => (
              <div
                key={product._id}
                onClick={() =>
                  navigate(`/products/${product.category}/${product._id}`)
                }
                className="border rounded-xl bg-white px-4 py-3 shadow-sm space-y-2"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-primary">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {product.category}
                    </p>
                    <Badge className="bg-primary/10 text-primary text-xs">
                      ₹{product.price}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/products/edit/${product._id}`);
                      }}
                    >
                      <EditIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product._id);
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
