import { useEffect, useRef, useState } from "react";
import "./components css/testimonial.css";
import { connect } from "react-redux";

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
  const [items] = useState(testimonials.length - 1);
  const testimonialRef = useRef();

  useEffect(() => {
    const width = testimonialRef.current.getBoundingClientRect().width;
    setTestimonialWidth(width);
  }, []);

  const handleGoLeft = (event) => {
    if (position >= 0) {
      return setPosition(-items);
    }
    setPosition((position += 1));
  };

  const handleGoRight = (event) => {
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
          {testimonials.map((testimonial, index) => (
            <TestimonialItem
              key={index}
              name={testimonial.name}
              image={testimonial.image}
              body={testimonial.body}
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
