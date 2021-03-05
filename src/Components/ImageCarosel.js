import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

/**
 * Large Image Carousel used to display infinite refreshing images of homes
 * @param {images} - images to display
 * @param {detailPage} - whether or not the carousel is part of the House Detail Page
 * @param {aboutMePage} - Image Carosel renders differently depending on
 */
const ImageCarosel = ({ images, detailPage, currentURLPath }) => {
  /**
   * Properties used for the Carousel such as transition period and duration of current image TTL
   */
  const fadeProperties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: false,
    arrows: detailPage ? true : false
  };

  const isSmallSizeDevice = useMediaQuery({
    query: "(max-width: 795px)"
  });

  return (
    <div className="row">
      <div className="slide-container">
        {images && (
          <Fade {...fadeProperties}>
            {images.map(function(image, index) {
              return (
                <div className="each-fade" key={index}>
                  <div
                    className="image-container"
                    style={{ position: "relative" }}
                  >
                    <div
                      style={{
                        background: `url(${detailPage ? image.href : image})`,
                        height: detailPage
                          ? "300px"
                          : !(currentURLPath === "/")
                          ? "400px"
                          : isSmallSizeDevice
                          ? "550px"
                          : "816px",
                        width: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: detailPage ? "0px -75px" : "0px 0px"
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))"
                      }}
                    />
                    {currentURLPath && !(currentURLPath === "/") && (
                      <div
                        style={{
                          position: "absolute",
                          top: "0px",
                          left: "0px",
                          backgroundColor: "#000",
                          opacity: 0.5,
                          width: "100%",
                          height: "100%"
                        }}
                      />
                    )}
                    {currentURLPath && !(currentURLPath === "/") && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "15px",
                          left: "0px",
                          right: "0px",
                          zIndex: 1,
                          color: "#fff",
                          textTransform: "uppercase",
                          fontSize: "12px"
                        }}
                      >
                        <div className="container">
                          <Link style={{ color: "#fff" }} to="/">
                            Home
                          </Link>
                          »{" "}
                          {currentURLPath.split("/")[2] ? (
                            <Link style={{ color: "#fff" }} to="/home-search">
                              {currentURLPath
                                .split("/")[1]
                                .replaceAll("-", " ")}
                            </Link>
                          ) : (
                            currentURLPath.split("/")[1].replaceAll("-", " ")
                          )}
                          {currentURLPath.split("/")[2] &&
                            `»${" "}
                            ${currentURLPath
                              .split("/")[2]
                              .replaceAll("-", " ")}`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </Fade>
        )}
      </div>
    </div>
  );
};

export default ImageCarosel;
