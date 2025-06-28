import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getAllProducts } from '../helper/api-communicator.js';

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [products,setProducts] = useState([])
 
  useEffect(()=>{
    const getAllProdductsfromDB = async()=>{
      const data = await getAllProducts() 
      // console.log("Data:",data);
      setProducts(data.ratedProducts)
    }
    getAllProdductsfromDB()
  },[])

  useEffect(()=>{
    // console.log("Products Array:",products);
  },[products])

  const value = {
    products
  };
  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
