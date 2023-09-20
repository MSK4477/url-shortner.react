import  { useState } from 'react';
import axios from "axios"
// import backEndUrl from "../config.js"
function ForgotPassword() {
  const [email, setEmail] = useState('');
const [mailSent, setMailSent] = useState(true);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   const response = await axios.post('http://localhost:3000/api/users/forgotPassword', {email}) 
  try{
    if (response.data.message === 'Email sent successfully.') {
      console.log(response.data);
      setMailSent(false);     
  }
  else if(response.data.code === 0) {
    alert("The given email address is not found.");
    return;
  
}
  }catch(err){
console.error(err)
    
  }
     
  };

  return (
    <>
{mailSent ?
    (<div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <b><label>
          Enter  Your Email to Send Link</label></b><br />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        <br /><br />
        <button type="submit">send</button>
      </form>
    </div>) : ( <>  <h1>mail sent succesfully</h1></>)}
    </>
     );
}

export default ForgotPassword;
