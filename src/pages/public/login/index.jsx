import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../network/authService";
import { useCookies } from "react-cookie";
import { CookieKeys, CookieOptions } from "../../../constants/cookieKeys";
import { coreAppActions } from "../../../redux/store";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies(["auth-token"]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleNavigate() {
    console.log("here");
    navigate("/signup");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      email: formData.email,
      password: formData.password,
    };
    let response = await AuthService.loginByEmail(body);
    console.log("logIn", response);
    // Check if password and confirmPassword match
    if (response.success) {
      let token = response?.data?.token;
      setCookie(CookieKeys.Auth, token.split(" ")[1], CookieOptions);
      dispatch(
        coreAppActions.login({
          user: response?.data?.loginUser,
          authToken: token
        })
      )
      navigate('/user/dashboard')
    }
    else{
        console.log("here");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <div className="flex text-center mt-2 gap-2">
          Need an Account?{" "}
          <div
            className="text-blue-400 cursor-pointer hover:text-blue-600"
            onClick={handleNavigate}
          >
            {" "}
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
