import React, { useEffect, useState } from "react";
import "./custom.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
 
  const navigate = useNavigate()

  const userDetailsCall = async (signupData) => {
    setIsLoading(true); // Set loading state to true when API call starts
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        "/api/v1/auth/userDetails",
        {}, // You can pass signupData here if needed
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Handle the response as needed
      console.log("user Details:", response.data);
      setUserData(response.data.user);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false); // Set loading state to false when API call is complete
    }
  };

  const handleReset = async () => {
    setIsLoading(true); // Set loading state to true when API call starts
    try {
      const response = await axios.post(
        "/api/v1/auth/forget-password",
        {
          email: userData?.email,
        }
      );
       if(response.status==200) {
        toast.success(`Reset Password send successful to ${userData.email}!`);
        navigate('/login')
       }
      // Handle the response as needed
      console.log("Reset Password send successful:", response.data);
    } catch (error) {
      // Handle the error
      console.error(
        "login failed:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false); // Set loading state to false when API call is complete
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success(`Log out successful Good Bye ${userData.name}!`);
    navigate('/login')
  };

  useEffect(() => {
    userDetailsCall();
  }, []);

  return (
    <div className="card-wrap">
   
      <div className="cards">
        <p className="heading"><span className="text-emerald-400">Name </span> {userData.name}</p>
        <p className="heading"><span className="text-emerald-400">Email </span> {userData.email}</p>
        <p className="heading">
        <span className="text-emerald-400">Vrified </span> {userData.isVerified ? "Yes" : "No"}
        </p>
        <p className="heading">
        <span className="text-emerald-400">Last Login </span> {new Date(userData.lastLogin).toLocaleString()}
        </p>
        <button onClick={handleReset}>Reset password!</button>
        <button onClick={handleLogout}>Log Out!</button>
      </div>
    </div>
  );
};

export default Home;
