import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../network/authService";
function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  function handleNavigate() {
    navigate("/login");
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    let body = {
      email: formData.email,
      password: formData.password,
      full_name: formData.name,
    };
    let signUp = await AuthService.SignUp(body);
    console.log("signUp", signUp);
    // Check if password and confirmPassword match
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your name"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
              required
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Create Account
          </button>
        </form>
        <div className="flex text-center mt-2 gap-2">
          Already an Account?{" "}
          <div
            className="text-blue-400 cursor-pointer hover:text-blue-600"
            onClick={handleNavigate}
          >
            {" "}
            Log In
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
