// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {  useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import backEndUrl from "../config.js";

const Login = () => {
  const navigate = useNavigate();
  const initialStage = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialStage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", formData);
  
      if (res.status === 200) {
        alert("User Logged in successfully");
        navigate("/home");
        localStorage.setItem("user", JSON.stringify(formData.email));
      } 
    } catch (err) {
      if (err.response) {
        if (err.response.data.code === 0) {
          alert("Incorrect password or email");
        } else if (err.response.data.code === -1) {
          alert("User not Verified or not Found");
        }
      } else {
        console.error(err);
      }
    }
  
    setFormData(initialStage);
  };
  

  return (
    <div>
      <h1>Loign</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
           
            id="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <Link to={"/forgotPassword"}>forgotPassword</Link>
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
