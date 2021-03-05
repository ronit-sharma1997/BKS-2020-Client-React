import React from "react";
import ProfilePic from "../Pictures/part1.jpg";
import { useMediaQuery } from "react-responsive";
import SearchForSale from "./SearchForSale";

/**
 * Description used on the Home Page regarding Agent Name, Contact Information, and Search for Sale Form.
 */
const MainPageDescription = ({ props, isAboutMe }) => {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 767px)"
  });

  return (
    <div
      style={{
        borderBottom: isAboutMe ? "none" : "1px solid #ccc",
        backgroundColor: isAboutMe ? "transparent" : "rgba(95,158,160,0.25)"
      }}
    >
      <div className={`container ${isAboutMe ? "" : "mt-5"}`}>
        <div className={`row ${isAboutMe ? "" : "pt-4"}`}>
          <div className="col-md-7 col-12 mb-2">
            <div className="row justify-content-center justify-content-md-start">
              <div className="col-12 text-center text-md-left">
                <h2
                  style={{
                    color: "#005f69",
                    fontSize: "48px",
                    textTransform: "uppercase",
                    paddingTop: "20px"
                  }}
                >
                  {isAboutMe ? "Brij K. Sharma" : "Welcome"}
                </h2>
              </div>
              {isAboutMe && (
                <div className="col-12 text-center text-md-left">
                  <h2
                    style={{
                      color: "cadetblue",
                      fontSize: "30px"
                    }}
                  >
                    Real Estate Agent
                  </h2>
                </div>
              )}
            </div>
            <div className="row justify-content-center justify-content-md-start mt-4">
              <div className="col-12 d-none d-md-block">
                <p
                  className="pb-3"
                  style={{ color: isAboutMe ? "black" : "cadetblue" }}
                >
                  We're here to help whether you're purchasing your first home,
                  investing, or buying/selling your luxury home. We're committed
                  to helping you achieve your dreams by providing outstanding
                  service so making a decision is easy. As a real estate agent
                  with 10+ years of experience, I have helped clients find homes
                  all throughout New Jersey. It is my goal to create an
                  absolutely smooth process to all of our clients.
                  <br></br>
                  <br></br>
                  My thorough familiarity and knowledge of New Jersey's
                  communities and neighborhoods allow me to match my clients
                  with the right home for them. I stay on top of of the latest
                  changes and trends in both the local and national real estate
                  markets. Part of what sets me apart from my competitors is my
                  ability to listen carefully to the unique needs, desires, and
                  goals of each of my clients. This is the approach I believe
                  that makes me a leading agent within the community.
                </p>
              </div>
              <div className="col-12 text-center text-md-left">
                <div className="row mb-2">
                  <div className="col-12">
                    <h4 className="mt-4" style={{ color: "#005f69" }}>
                      GET IN TOUCH
                    </h4>
                  </div>
                  <div className="col-12">
                    <ul
                      className="contact-info"
                      style={{ color: isAboutMe ? "#464646" : "cadetblue" }}
                    >
                      <li
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          padding: "0 5px 0 0"
                        }}
                      >
                        <span
                          className="contact-type"
                          style={{ color: "#005f69" }}
                        >
                          office
                        </span>
                        <span>(718) 857-8259</span>
                      </li>
                      <li
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          padding: "0 5px"
                        }}
                      >
                        <span
                          className="contact-type"
                          style={{ color: "#005f69" }}
                        >
                          direct
                        </span>
                        <span>(732) 395-1366</span>
                      </li>
                      <li
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          padding: "0 5px"
                        }}
                      >
                        <span
                          className="contact-type"
                          style={{ color: "#005f69" }}
                        >
                          fax
                        </span>
                        <span>(732) 962-6755</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12">
                    <ul
                      style={{
                        listStyle: "none",
                        paddingInlineStart: "0px",
                        color: "#005f69"
                      }}
                    >
                      <li
                        style={{
                          padding: "0 10px 0 0",
                          display: "inline-block",
                          verticalAlign: "middle"
                        }}
                      >
                        <svg
                          className="bi bi-house-fill"
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                          />
                        </svg>
                        <span
                          style={{
                            padding: "0px 10px",
                            color: isAboutMe ? "#464646" : "cadetblue"
                          }}
                        >
                          DDS Real Estate 838 Green St #202a, Iselin, NJ 08830
                        </span>
                      </li>
                    </ul>
                    <ul
                      className="contact-info"
                      style={{
                        paddingTop: "5px",
                        color: "#005f69"
                      }}
                    >
                      <li
                        style={{
                          padding: "0 10px 0 0",
                          display: "inline-block",
                          verticalAlign: "middle"
                        }}
                      >
                        <svg
                          className="bi bi-envelope-fill"
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"
                          />
                        </svg>
                        <span
                          style={{
                            padding: "0px 10px",
                            color: isAboutMe ? "#464646" : "cadetblue"
                          }}
                        >
                          bks1991@comcast.net
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-md-5 col-12 ${isSmallDevice ? "mb-2" : ""}`}>
            <div
              className={
                isAboutMe
                  ? ""
                  : "d-flex justify-content-center flex-column h-100"
              }
            >
              {!isAboutMe && <SearchForSale props={props} />}
              {isAboutMe && (
                <img
                  className="img-responsive about-me-pic mb-2"
                  src={ProfilePic}
                  alt="My Profile Pic"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageDescription;
