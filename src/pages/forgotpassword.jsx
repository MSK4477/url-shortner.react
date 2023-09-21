import  { useState } from 'react';
import axios from "axios"
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSend, setIsSend] = useState("Send")
const [mailSent, setMailSent] = useState(true);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    if(isSend === "Send" || isSend === "Retry") {
      setIsSend("Sending...")

    }
    e.preventDefault();
   const response = await axios.post(' https://url-shortner-node.onrender.com/api/users/forgotPassword', {email}) 
  try{
    

    if (response.data.message === 'Email sent successfully.') {
      // console.log(response.data);
      setMailSent(false);     
  }
  else if(response.data.code === 0) {
    setIsSend("Retry")

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
        <button type="submit">{isSend}</button>
      </form>
    </div>) : ( <>  <h1>mail sent succesfully</h1></>)}
    </>
     );
}

export default ForgotPassword;
