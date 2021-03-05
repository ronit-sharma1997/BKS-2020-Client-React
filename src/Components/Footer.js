import React from "react";
import NavBarComponent from "./NavBarComponent";
import RealtorLogo from "../Pictures/realtorLogo.webp";
import RealtorComLogo from "../Pictures/realtorcom.png";
import EqualHousingOpportunityLogo from "../Pictures/equal-housing-opportunity-logo.png";
import { useMediaQuery } from "react-responsive";

/**
 * Footer of website which contains information regarding Agent, navbar, and credit to sources.
 */
const Footer = ({ isSmallSizeDevice }) => {
  const breakPointFooter = useMediaQuery({
    query: "(max-width: 991px)"
  });
  return (
    <div className="row mt-5" style={{ backgroundColor: "#d3d3d3" }}>
      <div className="col-12">
        <div className="container">
          <div className="row pt-5">
            <div
              className={`${breakPointFooter ? "col-12" : "col-8"}`}
              style={{
                borderRight: breakPointFooter ? "none" : "1px solid #464646"
              }}
            >
              <div className="row">
                <div className="col-12">
                  <h1
                    className="heading-text"
                    style={{
                      fontSize: "35px",
                      color: "#464646"
                    }}
                  >
                    BRIJ K. SHARMA REAL ESTATE AGENT
                  </h1>
                </div>
                <div className="col-12">
                  <p
                    className="mt-2"
                    style={{ color: "#464646", fontSize: "18px" }}
                  >
                    Located in New Jersey, I specialize in{" "}
                    <span style={{ color: "rgb(0, 95, 105)" }}>
                      Middlesex, Hudson, Mercer, and Monmouth County
                    </span>
                    . However, my real estate experience with DDS Real Estate
                    Brokerage will allow me to assist you in the purchase or
                    sale of property anywhere in the United States! Feel free to
                    call or email for a confidential conversation. Let us find
                    your next home!
                  </p>
                </div>
              </div>
            </div>
            <div className={`${breakPointFooter ? "col-12" : "col-4"}`}>
              <div className="container">
                <div
                  className="row"
                  style={{ paddingLeft: breakPointFooter ? "0px" : "30px" }}
                >
                  <div className="col-12 pl-0">
                    <h1
                      className="heading-text"
                      style={{
                        fontSize: "35px",
                        color: "#464646"
                      }}
                    >
                      GET IN TOUCH
                    </h1>
                  </div>
                  <div className="col-12 pl-0">
                    <p className="mt-2 mb-2">
                      <span
                        style={{
                          width: "37px",
                          float: "left",
                          color: "rgb(0, 95, 105)",
                          fontSize: "16px",
                          fontWeight: "700",
                          marginRight: "40px"
                        }}
                      >
                        OFFICE
                      </span>
                      <span style={{ color: "#464646" }}>(718) 857 -8259</span>
                    </p>
                  </div>
                  <div className="col-12 pl-0">
                    <p className="mb-2">
                      <span
                        style={{
                          width: "37px",
                          float: "left",
                          color: "rgb(0, 95, 105)",
                          fontSize: "16px",
                          fontWeight: "700",
                          marginRight: "40px"
                        }}
                      >
                        DIRECT
                      </span>
                      <span style={{ color: "#464646" }}>(732) 395 -1368</span>
                    </p>
                  </div>
                  <div className="col-12 pl-0">
                    <p className="mb-2">
                      <span
                        style={{
                          width: "37px",
                          float: "left",
                          color: "rgb(0, 95, 105)",
                          fontSize: "16px",
                          fontWeight: "700",
                          marginRight: "40px"
                        }}
                      >
                        FAX
                      </span>
                      <span style={{ color: "#464646" }}>(732) 962 -6755</span>
                    </p>
                  </div>
                  <div
                    className="col-12 pl-0"
                    style={{ borderBottom: "1px solid #464646" }}
                  >
                    <p>
                      <span
                        style={{
                          width: "37px",
                          float: "left",
                          color: "rgb(0, 95, 105)",
                          fontSize: "16px",
                          fontWeight: "700",
                          marginRight: "40px"
                        }}
                      >
                        EMAIL
                      </span>
                      <span style={{ color: "#464646" }}>
                        bks1991@comcast.net
                      </span>
                    </p>
                  </div>
                  <div className="col-12 pl-0">
                    <img
                      src={RealtorLogo}
                      alt="Realtor Logo"
                      style={{
                        width: "60px",
                        marginLeft: "-15px",
                        color: "#464646",
                        filter:
                          "invert(63%) sepia(74%) saturate(4%) hue-rotate(314deg) brightness(110%) contrast(105%)"
                      }}
                    />
                    <img
                      className="ml-2"
                      src={EqualHousingOpportunityLogo}
                      alt="Equal Housing Opportunity Logo"
                      style={{
                        width: "40px",
                        filter:
                          "invert(63%) sepia(74%) saturate(4%) hue-rotate(314deg) brightness(110%) contrast(105%)"
                      }}
                    />

                    <img
                      className="ml-4"
                      src={RealtorComLogo}
                      alt="Realtor.Com Logo"
                      style={{
                        width: "120px",
                        filter:
                          "invert(63%) sepia(74%) saturate(4%) hue-rotate(314deg) brightness(110%) contrast(105%)"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isSmallSizeDevice && (
            <div className="row">
              <div className="col-12">
                <NavBarComponent isFooter={true} />
              </div>
            </div>
          )}
          <div className="row" style={{ marginTop: "-15px" }}>
            <div
              className="col-12 text-center"
              style={{ color: "#464646", fontSize: "12px" }}
            >
              Copyright © 2020 Brij Sharma. All rights reserved. | Real Estate
              Website Created by Ronit Sharma
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
