// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import axios from "axios"

const Register = () => {
const initialStage = {
  firstName: '',
  lastName:"",
  email: '',
  password: '',
}
  const [formData, setFormData] = useState(initialStage);
 const [registred, setRegistred] = useState(true)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //http://localhost:3000/api/users/register
  //https://url-shortner-node.onrender.com/
    try {
      const res = await axios.post("https://url-shortner-node.onrender.com/api/users/register", formData);
  
      if (res.status === 200) {
        alert("Succesfully Registered Check Your Email To verify Your Account")
        setRegistred(false)
      } else {
        console.log("Request failed with status:", res.status);
      }
  
      setFormData(initialStage);
    } catch (error) {
      alert("email already in use")
      console.error("An error occurred:", error);
    }
  };
  

  return (
    <>
   { registred ?
   
   (<div>
      <h1 style={{color:"black"}}>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            minLength={5}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div><br /><br />
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            minLength={5}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div><br /><br />
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div><br /><br />
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            minLength={8}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div><br />
        <p>Already have an account <Link to={"/login"}>login</Link> </p>
        <button type="submit">Register</button>
      </form>
    </div>) : (<h1>check your email</h1>)

   }
   </>
  
  );
};

export default Register;
