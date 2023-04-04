import React, { useState, useEffect } from "react";
import "./styles.css";
import { getImages } from "./imagesApi";

const Slide = ({ title, imageUrl }) => {
  return (
    <div className="image-slide">
      <img className="image" alt={title} src={imageUrl} />
      <h4>{title}</h4>
    </div>
  );
};

const Carousel = ({ data }) => {
  const [index, setIndex] = useState(0);

  const _handlePrevious = () => {
    const newIndex = index === 0 ? data.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const _handleNext = () => {
    const newIndex = index === data.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
  };

  return (
    <div className="slide">
      <Slide title={data[index].title} imageUrl={data[index].image} />
      <div className="button-group">
        <button className="button" onClick={_handlePrevious}>
          Previous
        </button>
        <button className="button" onClick={_handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState({ loader: "loading", data: [] });

  useEffect(() => {
    setData({ loader: "loading" });
    getImages().then((response) => {
      setData({ loader: "completed", data: response });
    });
  }, []);

  const isLoaded = data.loader === "completed";

  return isLoaded ? (
    <div className="carousel">
      <Carousel data={data.data} />
    </div>
  ) : (
    <p>Loading...</p>
  );
}
