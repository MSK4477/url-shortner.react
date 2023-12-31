import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
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
    if (response.status === 200 && Short1) {
      setData(response.data.UrlData.origUrl);
      setShort(true);
    }
    if (
      response.data.code === 0 &&
      response.status === 400 &&
      response.data.message === "Invalid Original Url"
    ) {
      alert("Invalid URL");
    }
  };

  console.log(data);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortId]);

  const handleChange = (e) => {
    setOriginalUrl(e.target.value);
  };
  const reset = () => {
    setOriginalUrl("")
    setBtnText("Shorten URL")
    setShort(false)
    setShortenedUrl("")
    setShort1(false)
    setShortId("")

  }

  const handleShortenUrl = async (e) => {
    e.preventDefault();

    if (!originalUrl) {
      alert("Please enter a URL");
      return;
    }

    setShort1(true);

    try {
      if (btnText === "Shorten URL") {
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

      if (btnText === "Copy URL") {
        await navigator.clipboard.writeText(shortenedUrl);
        setBtnText("URL Copied");
        setTimeout(() => {
          setBtnText("Copy URL");
        }, 3000);
        return;
      }
    } catch (error) {
      console.error("Error while shortening URL:", error.message);
      setBtnText("Shorten URL");
    }
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
        <b style={{color:"black"}}>{Short ? "Your shortened URL" : "Short URL"}</b>
      </div>

      <form className={Short ? "form" : "form2"} onSubmit={handleShortenUrl}>
        <label
          htmlFor="url_shortner"
          style={{
            fontSize: "20px",
            position: "relative",
            top: "10px",
            color: "black",
          }}
        >
          <b className="urlText">
            {Short ? "" : "Paste the URL to be shortened"}
          </b>
        </label>
        <br></br>
        <br></br>
        <input
          className="inputStyle"
          style={
            Short
              ? {
                  width: "90%",
                  padding: "4px",
                  fontSize: "15px",
                  borderRadius: "1px solid",
                  textAlign: "left",
                }
              : {
                  width: "80%",
                  padding: "4px",
                  fontSize: "15px",
                  borderRadius: "1px solid",
                  textAlign: "left",
                }
          }
          type="text"
          placeholder="Enter Valid URL Only Not Works For Invalid URL"
          value={originalUrl}
          onChange={handleChange}
        />{" "}
        <br />
        <br />
        <button
          type="submit"
          onClick={handleShortenUrl}
          className={Short ? "btn2" : "btn"}
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
                top: "7px",
                textAlign: "left",
              }}
              to={`/clicks/${shortId}`}
              target="_blank"
            >
              track the count of clicks
            </Link>
            <br />
            <i  title="reset" onClick={reset} style={{position:"absolute", top:"0px", right:"0px", padding:"3px",cursor:"pointer", color:"#393939e0",  fontWeight:"bolder",  fontSize:"20px"}} className="fa fa-refresh" aria-hidden="true"></i>

          </div>
        )}
      </form>
    </div>
  );
};

export default SimpleUrlShortener;
