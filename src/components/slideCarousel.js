import React, { cloneElement, useEffect, useRef, useState } from "react";
import "./components css/carousel.css";

const CarouselSkeleton = () => {
  return <div className="carousel-skeleton"></div>;
};

const Carousel = ({ images }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const carouselEl = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(null);
  const figure = useRef(null);
  const buttonsGroup = useRef(null);

  const handleButtons = (event) => {
    const dataOrder = Number(event.target.getAttribute("data-order"));
    setCurrentImg(-dataOrder * carouselWidth);
  };

  useEffect(() => {
    setCarouselWidth(carouselEl.current.getBoundingClientRect().width);
  }, []);

  return (
    <div className="slide-carousel" ref={carouselEl}>
      <figure
        className="slide-carousel__figure"
        style={{ transform: `translateX(${currentImg}px)` }}
        ref={figure}
      >
        {!images && <CarouselSkeleton />}
        {images &&
          images.map((image, index) => (
            <img src={image} key={index} width={`${carouselWidth}px`} />
          ))}
      </figure>
      <div className="slide-carousel__buttons-group" ref={buttonsGroup}>
        {images &&
          images.map((image, index) => (
            <input
              type="radio"
              name="slide-carousel"
              data-order={index}
              onClick={handleButtons}
              key={index}
              defaultChecked={index === 0 ? true : false}
            />
          ))}
      </div>
    </div>
  );
};

export default Carousel;
