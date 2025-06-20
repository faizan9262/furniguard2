import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "./Add";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Products = ({ token }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [category, setCategory] = useState("flooring");

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products/list");
      if (response.data.success) {
        setList(response.data.products);
        setFilteredList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  const removeProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this product?"
    );
    if (!confirmed) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/products/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product Rmeoved");
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Filter products based on selected category
    const filteredProducts = list.filter(
      (item) => item.category === selectedCategory
    );
    setFilteredList(filteredProducts);
  };

  return (
    <div className="mx-4 sm:mx-[10%]">
      <p className="my-2 text-3xl text-primary font-semibold">
        All Products List
      </p>
      <div className="flex flex-col gap-2">
        {/* list table title */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>
            <select
              onChange={handleCategoryChange}
              value={category}
              className=" w-full px-5 py-2 bg-transparent outline-none"
            >
              <option value="flooring">Flooring</option>
              <option value="livingroom">Living Room</option>
              <option value="kitchen">Kitchen</option>
              <option value="stairs">Stairs</option>
              <option value="lights">Lights</option>
              <option value="textile">Textile</option>
              <option value="layout">Layout</option>
              <option value="furniture">Furniture</option>
              <option value="bathroom">Bathroom</option>
              <option value="wallpaper">Wallpaper</option>
            </select>
          </b>
          <b className="text-center">Action</b>
        </div>

        {/* Products List  */}

        {filteredList.map((item, index) => (
          <div
            className="grid gird-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-lg text-primary"
            key={index}
          >
            <img className="w-24" src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.category}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="flex items-center justify-center md:text-center cursor-pointer text-lg"
            >
              <MdDelete className="w-6 h-6 text-rose-600" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
