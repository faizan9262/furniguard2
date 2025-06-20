import React from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useProduct } from '../context/ProductContext';

const LayoutDetail = () => {
  const { id } = useParams();
  const product = useProduct();
  const layoutDetail = product.products.find((l) => l._id === id);

  return (
    <div className="mx-4 sm:mx-[10%] flex flex-col sm:flex-row gap-6 sm:gap-10 min-h-screen items-center py-8 sm:py-20">
      {/* Image Section */}
      <div className="w-full sm:w-1/2 h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg">
        <img
          src={layoutDetail.image}
          className="w-full h-full object-cover"
          alt={layoutDetail.name}
        />
      </div>

      {/* Text Section */}
      <div className="w-full sm:flex-1 flex flex-col gap-5 text-center sm:text-left">
        <h1 className="text-4xl sm:text-6xl font-bold text-primary">{layoutDetail.name}</h1>
        <p className="text-base sm:text-lg font-light text-gray-600 leading-relaxed">
          {layoutDetail.description}
        </p>
        <p className="text-secondary font-medium text-xl sm:text-2xl">
          Starting From {layoutDetail.price}
        </p>
        <button className="mx-auto sm:mx-0 flex items-center gap-2 justify-center rounded-full bg-primary py-3 px-6 text-white hover:scale-105 transition-all duration-300 hover:bg-secondary">
          Consult Now <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default LayoutDetail;
