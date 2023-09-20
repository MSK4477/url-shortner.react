import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Redirect = () => {
 const { urlId } = useParams()
 const [data, setData] = useState()
    const fetch = async() => {

      const response = await axios.get(` https://url-shortner-node.onrender.com/api/url/short/${urlId}`)
        setData(response.data.UrlData.origUrl)
    }
// console.log(data)
    useEffect(() =>{
fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlId])
    if(data){
        window.location.href = data
    
    }
}


export default Redirect