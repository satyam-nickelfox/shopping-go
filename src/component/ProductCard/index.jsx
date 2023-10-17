import React from "react";

function ProductCard({ product }) {
  const { productImage, productName, productPrice, productDescription } =
    product;
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-2 transition duration-500 ease-in-out transform hover:scale-105 cursor-pointer">
     <div className="flex p-8 items-center justify-center">
      <img
        className="w-auto h-48 object-cover"
        src={productImage}
        alt={productName}
      />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <p className="text-gray-700 text-base">{productDescription}</p>
        <p className="text-gray-900 font-bold text-xl mt-2">Rs. {productPrice}</p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mt-4"
        //   onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
