import React, { useState } from "react";
import "./custom.css";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupData, "signup data");
    signupCall(signupData);
  };

  const signupCall = async (signupData) => {
    setIsLoading(true); // Set loading state to true when API call starts
    try {
      const response = await axios.post(
        "/api/v1/auth/signup",
        {
          ...signupData,
        }
      );

      // Handle the response as needed
      console.log("Signup successful:", response.data);
      localStorage.setItem("accessToken", response.data.user.accessToken);
      // Reset the form data
      setSignupData({
        email: "",
        password: "",
        name: "",
      });
      if (response.status===201){
        toast.success('Verification OTP Send to Your EMail')
        navigate("/verify-email");
      }else{
        toast.error('Failed to Signup')
      }
      
    } catch (error) {
      // Handle the error
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false); // Set loading state to false when API call is complete
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
      >
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-title">
            <span>sign in to your</span>
          </div>
          <div className="title-2">
            <span>Account</span>
          </div>

          <div className="input-container">
            <input
              placeholder="Email"
              type="email"
              className="input-mail"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />
          </div>

          <section className="bg-stars">
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
          </section>

          <div className="input-container">
            <input
              placeholder="Password"
              type="password"
              className="input-pwd"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
          </div>

          <div className="input-container">
            <input
              placeholder="Name"
              type="text"
              className="input-pwd"
              value={signupData.name}
              onChange={(e) =>
                setSignupData({ ...signupData, name: e.target.value })
              }
            />
          </div>
          <button
           className="text-center text-white w-full"
            type="submit"  
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className=" animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="signup-link">
            Already have an account?{" "}
            <Link className="up" to="/login">
              Log in!
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
