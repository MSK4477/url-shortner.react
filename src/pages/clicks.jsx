import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Clicks = () => {
const { shortId } = useParams()

  const [data, setData] = useState();

  const fetch = async () => {
    const response = await axios.get(
      `https://url-shortner-node.onrender.com/api/url/short/${shortId}`
    );
    setData(response.data.UrlData.clicks) || null;
  };
 
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortId]);

return (
    <>
    <h1 style={{position:"relative", top:"140px", left:"105px"}}>Total Clicks</h1>
    <div className="main" style={{background:"#ffffff",borderRadius:"5px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",  height:"100px", width:"140px",position:"relative", left:"40rem", top:"10rem"}}>
    <h1 style={{fontWeight:"bolder",  color:"black", textAlign:"center", position:"relative", top:"30px"}}>{data}</h1>

    </div>
    </>
)
};
export default Clicks