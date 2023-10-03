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
    <div className="main">
    
    <h1 >Total Clicks</h1>
    <div className="count-box"  style={{background:"#ffffff",borderRadius:"5px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",  height:"100px", width:"140px", margin:"20px auto"}}>
    <h1 style={{fontWeight:"bolder",  color:"black", textAlign:"center"}}>{data}</h1>

    </div>
    </div>
)
};
export default Clicks