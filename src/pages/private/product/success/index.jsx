import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/user/dashboard");
  };
  return (
    <div className="bg-green-200 p-10 text-center">
      <h1 className="text-4xl font-bold mb-6">Payment Successful!</h1>
      <div className="text-lg">
        {/* Display other transaction details here */}
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mt-4"
        onClick={handleNavigate}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Success;
