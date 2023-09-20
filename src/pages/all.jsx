import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import axios from "axios";

const AllURL = () => {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const response = await axios.get(`https://url-shortner-node.onrender.com/api/url/short`);
    setData(response.data.UrlData);
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
    <h1  style={{textAlign:"center"}} >All Created URLs</h1>
    {data.map(({ shortUrl }, index) => (
      <div key={index} className="allUrl">
        <ul  style={{textAlign:"center", listStyle:"none"}}>
          {" "}
          <li>
            {index + 1}: <Link target="_blank" to={shortUrl}>{shortUrl}</Link>
          </li>
        </ul>
         </div>
      ))}
   
     
    </div>
  );
};
export default AllURL;
