import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

/**
 * A single Image Display Card which shows an enlarged animation of text.
 * @param {backgroundImage} - image to use as a display card
 * @param {position} - whether or not the displayed heading text should be displayed on the left(1) or right side(0)
 * @param {right} - whether or not the animateds subtext should be displayed on the right(1) or left side(1)
 * @param {lineone} - first line of the heading text
 * @param {linetwo} - second line of the heading text
 * @param {subtitle} - subtitle text
 * @param {paragraph} - animated paragraph text to display
 */
const DisplayCard = ({ lineOne, lineTwo, lineThree, url, right }) => {
  const isSmallSizeDevice = useMediaQuery({
    query: "(max-width: 767px)"
  });
  return (
    <div
      className={`cta-list ${right && isSmallSizeDevice ? "mt-2" : ""}`}
      data-aos="zoomIn"
      style={{ maxWidth: "360px" }}
    >
      <Link to={url} style={{ textDecoration: "none" }}>
        <div
          style={{
            color: "inherit",
            outline: "none",
            textDecoration: "none",
            marginLeft: right && isSmallSizeDevice ? "-30px" : "0px"
          }}
        >
          <div>
            <div
              className="cta-label"
              style={{
                fontSize: "30px",
                color: "#464646",
                textTransform: "uppercase",
                fontWeight: 300,
                lineHeight: 1
              }}
            >
              {lineOne}
              <span
                style={{
                  fontSize: "45px",
                  color: "cadetblue",
                  fontWeight: 600,
                  display: "block",
                  marginTop: "2px"
                }}
              >
                {lineTwo} <br />
                {lineThree}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DisplayCard;
