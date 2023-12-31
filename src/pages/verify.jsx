import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const [isVerified, setIsVerified] = useState(false);
const token = searchParams.get('token');

const fetchData = async () => {
    try{
        const res = await axios.get(` https://url-shortner-node.onrender.com/api/users/verify?token=${token}`);
        if(res.status == 200){
        setIsVerified(true)
        }
    }catch(err){
        console.error(err);

    }

}
    useEffect (() =>{
  

fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
{isVerified ?
      ( <h1 style={{color:"black"}}> Account Verified Please <Link to={"/login"}>Login</Link></h1>)  :
       
      ( <h1 style={{color:"black"}}>not verified</h1>)}
       
       </>
    )
}
export default Verify