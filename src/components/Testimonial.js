import { useEffect, useRef, useState } from "react";
import "./components css/testimonial.css";
import { connect } from "react-redux";

const TestimonialSkeleton = ({ width }) => {
  return (
    <div className="testimonial-skeleton__figure-item" style={{ width: width }}>
      <div className="testimonial-skeleton__item-avatar"></div>
      <div className="testimonial-skeleton__item-name"></div>
      <hr />
      <div className="testimonial-skeleton__item-body">
        <div className="testimonial-skeleton__dummy-text"></div>
        <div className="testimonial-skeleton__dummy-text"></div>
        <div className="testimonial-skeleton__dummy-text"></div>
        <div className="testimonial-skeleton__dummy-text"></div>
        <div className="testimonial-skeleton__dummy-text"></div>
      </div>
    </div>
  );
};

const TestimonialItem = ({ width, name, body, image }) => {
  return (
    <div className="testimonial__figure-item" style={{ width: width }}>
      <img className="testimonial__item-avatar" src={image} />
      <p className="testimonial__item-name">{name}</p>
      <hr />
      <p className="testimonial__item-body">{body}</p>
    </div>
  );
};

const Testimonial = ({ lang, testimonials }) => {
  const [testimonialWidth, setTestimonialWidth] = useState(null);
  let [position, setPosition] = useState(0);
  const [items, setItems] = useState(null);
  const testimonialRef = useRef();

  useEffect(() => {
    if (testimonials.length > 0) {
      setItems(testimonials.length - 1);
    }
    const width = testimonialRef.current.getBoundingClientRect().width;
    setTestimonialWidth(width);
  }, [testimonials.length]);

  const handleGoLeft = (event) => {
    if (!items) return;
    if (position >= 0) {
      return setPosition(-items);
    }
    setPosition((position += 1));
  };

  const handleGoRight = (event) => {
    if (!items) return;
    if (position <= -items) {
      return setPosition(0);
    }
    setPosition((position -= 1));
  };

  return (
    <div className="testimonial" ref={testimonialRef}>
      <div className="testimonial__heading">
        <h2>{lang === "en" ? "Testimonial" : "الآراء"}</h2>
        <div className="testimonial__navigate-buttons">
          <button className="testmionial__navigate-left" onClick={handleGoLeft}>
            &#60;
          </button>
          <button
            className="testmionial__navigate-right"
            onClick={handleGoRight}
          >
            &#62;
          </button>
        </div>
      </div>
      <div className="testimonial__canvas">
        <figure
          className="testimonial__figure excluded-fonts"
          style={{ transform: `translateX(${testimonialWidth * position}px)` }}
        >
          {testimonials.length <= 0 && (
            <TestimonialSkeleton width={testimonialWidth + "px"} />
          )}
          {testimonials.length > 0 &&
            testimonials.map((testimonial, index) => (
              <TestimonialItem
                key={index}
                name={testimonial.name}
                image={testimonial.picture}
                body={testimonial.opinion}
                width={testimonialWidth + "px"}
              />
            ))}
        </figure>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
  };
}

export default connect(mapStateToProps)(Testimonial);
