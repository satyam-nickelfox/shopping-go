import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-500"></div>
    </div>
  );
};

export default Loader;
