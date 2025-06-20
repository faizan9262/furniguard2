import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { BsHouseAddFill } from "react-icons/bs";
import { toast } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL
const Add = ({token}) => {
  const [product_img, setProduct_Img] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("flooring");

  const onSubmitHandler = async (e) =>{
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("category",category)
      formData.append("price",price)
      formData.append("product_img",product_img)

      const response = await axios.post(backendUrl + '/api/products/add' , formData,{headers:{token}})

      if(response.data.success){
        setName('')
        setDescription('');
        setPrice('');
        setProduct_Img(false);
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(response.data.message);
      toast.error(response.data.message);
    }

  }
  return (
    <div className="min-h-screen mx-4 sm:mx-[10%]">
      <h1 className="text-4xl text-primary font-semibold">Add Product Here</h1>
      <div className="bg-stone-100 mt-5 rounded-lg shadow-md p-4 flex">
        <form className="flex-1" onSubmit={onSubmitHandler}>
          <div>
            <p className="text-2xl my-3 text-gray-600">Add Image Here</p>
            <div className="flex">
              <label htmlFor="product_img">
                <img
                  className="w-40"
                  src={!product_img ? assets.upload : URL.createObjectURL(product_img)}
                  alt=""
                />
                <input
                  onChange={(e) => setProduct_Img(e.target.files[0])}
                  type="file"
                  id="product_img"
                  hidden
                />
              </label>
            </div>

            <div className="w-full">
              <p className="my-2 text-2xl text-gray-600">Product name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full max-w-[500px] px-3 py-2"
                type="text"
                placeholder="Type here"
                required
              />
            </div>

            <div className="w-full">
              <p className="my-2 text-2xl text-gray-600">Product description</p>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full max-w-[500px] px-3 py-2"
                type="text"
                placeholder="Write content description here"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row mt-5 gap-4 w-full sm:gap-8">
              <div>
                <p className="my-2 text-2xl text-gray-600">Product Category</p>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-5 py-2"
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
              </div>

              <div>
                <p className="my-2 text-2xl text-gray-600">Product Price</p>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="w-ful; px-5 py-2 sm:w-[120px]"
                  type="number"
                  placeholder="250"
                />
              </div>
            </div>
          </div>
          <button type='submit' className='flex gap-2 items-center justify-center w-28 py-2 mt-4 bg-primary rounded-full hover:bg-secondary hover:scale-105 transition-all duration-300 text-white'>ADD
            <BsHouseAddFill />
          </button>
        </form>
        <div className="items-center flex-1 flex">
          <img className="w-96" src={assets.logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Add;
