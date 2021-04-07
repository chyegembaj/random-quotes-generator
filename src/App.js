import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
//import { FaQuoteLeft } from "react-fontawesome/FaQuoteLeft";
import "./style.css";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");

  const getData = async () => {
    const res = await axios.get("https://type.fit/api/quotes");
    const randomNum = Math.floor(Math.random() * res.data.length);
    const randomQuote = res.data[randomNum];

    setQuote(randomQuote["text"]);
    setAuthor(randomQuote["author"]);

    const randomHexColor = Math.floor(Math.random() * 0xffffff);
    const hexColor = "#" + randomHexColor.toString(16);
    setColor(hexColor);
    document.body.style.background = hexColor;
  };

  const newQuote = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  //console.log(randomNum);
  //const quote = quotes[randomNum];

  return (
    <div
      id="quote-box"
      className="card text-center mx-auto"
      style={{ width: "20rem", marginTop: "10rem", color }}
    >
      <p id="text">{quote}</p>
      <p id="author">{author}</p>
      <div className="row">
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?&text=${quote}`}
          target="_blank"
          style={{ color }}
          className="col-6"
        >
          tweet
        </a>
        <button
          id="new-quote"
          onClick={newQuote}
          style={{ color }}
          className="col-4"
        >
          New quote
        </button>
      </div>
    </div>
  );
}
