import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
const SimpleUrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [btnText, setBtnText] = useState("Shorten URL");
  const [Short, setShort] = useState(false);
  const [Short1, setShort1] = useState(false);

  const [shortId, setShortId] = useState();
  const [data, setData] = useState();
  const fetch = async () => {
    const response = await axios.get(
      `https://url-shortner-node.onrender.com/api/url/short/${shortId}`
    );
    if (response.status == 200 && Short1) {
      setData(response.data.UrlData.origUrl);
      setShort(true);
    }
    if (
      response.data.code == 0 &&
      response.status == 400 &&
      response.data.message == "Invalid Original Url"
    ) {
      alert("Invalid URL");
    }
  };
  console.log(data);
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortId]);

  const handleShortenUrl = async () => {
    if (!originalUrl) {
      alert("Please enter a URL");
      return;
    }
    setShort1(true);

    try {
      if (btnText == "Shorten URL") {
        setBtnText("Shortening...");
        const response = await axios.post(
          "https://url-shortner-node.onrender.com/api/url/short",
          {
            origUrl: originalUrl,
          }
        );
        setShortId(response.data.urlId);
        setShortenedUrl(response.data.shortUrl);
        setOriginalUrl(response.data.shortUrl);
        setBtnText("Copy URL");
      }

      if (btnText == "Copy URL") {
        await navigator.clipboard.writeText(shortenedUrl);
        setBtnText("URL Copied");
        return;
      }
      if (btnText == "URL Copied") {
        alert("URL already Copied");
      }
    } catch (error) {
      console.error("Error while shortening URL:", error.message);
      setBtnText("Shorten URL");
    }
  };


  const main = {
    position: "relative",
    textAlign: "center",
    top: "16%",
    margin: "0px auto",
    backgroundColor: "#ffffff",
    color: "black",
    borderStyle: "none",
    width: "60%",
    height: "30%",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const ma = {
    position: "relative",
    textAlign: "center",
    top: "16%",
    margin: "0px auto",
    backgroundColor: "#ffffff",
    color: "black",
    borderStyle: "none",
    width: "40%",
    height: "25%",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div className="main">
      <div
        style={{
          color: "white",
          textAlign: "center",
          position: "relative",
          top: "18px",
          fontSize: "2em",
        }}
        className="homeText"
      >
        <b>{Short ? "Your shortened URL" : "Short URL"}</b>
      </div>

      <form style={Short ? ma : main}>
        <label
          htmlFor="url_shortner"
          style={{
            fontSize: "20px",
            position: "relative",
            top: "10px",
            color: "black",
          }}
        >
          <b >{Short ? "" : "Paste the URL to be shortened"}</b>
        </label>
        <br></br>
        <br></br>
        <input
          style={
            Short
              ? {
                  width: "90%",
                  padding: "4px",
                  fontSize: "15px",
                  borderRadius: "1px solid",
                  textAlign:"left"
                }
              : {
                  width: "80%",
                  padding: "4px",
                  fontSize: "15px",
                  borderRadius: "1px solid",
                  textAlign:"left"
                }
          }
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />{" "}
        <br />
        <br />
        <button
          style={
            Short
              ? {
                  width: "28%",
                  padding: "10px",
                  fontSize: "15px",
                  backgroundColor: "#2c87c5",
                  border: "1px solid #2c87c5",
                  borderStyle: "none",
                  borderRadius: "3px",
                  color: "#ffffff",
                  cursor: "pointer",
               
                }
              : {
                  width: "28%",
                  padding: "15px",
                  fontSize: "15px",
                  backgroundColor: "#2c87c5",
                  border: "1px solid #2c87c5",
                  borderStyle: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  marginTop: "16px",
                }
          }
          type="button"
          onClick={handleShortenUrl}
        >
          {btnText}
        </button>
        {shortenedUrl && (
          <div
            style={{
              position: "relative",
              left: "160px",
              top: "30px",
              display: "inline-block",
            }}
          ></div>
        )}
          {shortenedUrl && (
        <div>

          <Link
            style={{
              display: "inline-block",
              position: "relative",
              left: "140px",
              top: "7px",
              textAlign: "left",
            }}
            to={`/clicks/${shortId}`}
            target="_blank"
          >
            track the count of clicks
          </Link>
          <br />
        </div>
      )}
      </form>

    
    </div>
  );
};

export default SimpleUrlShortener;
