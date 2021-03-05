import React from "react";
import NavBarComponent from "./NavBarComponent";
import IconNavBar from "./IconNavBar";
import { useMediaQuery } from "react-responsive";

/**
 * Nav Bar that consists of the title and nav link items
 * @param {isSticky} - whether or not the nav bar should be sticky
 * @param {isSmallSizeDevice} - whether or not the current device screen size is small
 * @param {toggleSideNav} - function that toggles the display of the side navbar
 */
const HeaderNavBar = ({ isSticky, isSmallSizeDevice, toggleSideNav }) => {
  const smallerTitleSize = useMediaQuery({
    query: "(min-width: 796px) and (max-width: 892px)"
  });
  return (
    <div>
      {isSmallSizeDevice && <IconNavBar toggleSideNav={toggleSideNav} />}
      <div
        className="row navbar-position"
        style={{
          backgroundColor: "rgba(255,255,255,.90)",
          top: isSmallSizeDevice ? "52px" : "0px"
        }}
      >
        <div
          className={`${
            isSmallSizeDevice ? "col-12" : "col-md-5"
          } pr-0 my-auto${isSticky ? " pt-3" : " pt-4"}`}
        >
          <div className="container">
            <div className="row justify-content-center text-center">
              <h1
                className="mb-0 heading-text"
                style={{
                  fontSize: isSticky
                    ? "30px"
                    : smallerTitleSize
                    ? "40px"
                    : "50px",
                  color: "#005f69"
                }}
              >
                BRIJ K. SHARMA
              </h1>
            </div>
            <div className="row justify-content-center text-center">
              <p
                className="subheading-text cadet-blue"
                style={{
                  fontSize: isSticky ? "15px" : "20px"
                }}
              >
                <b>DDS Real Estate</b>
              </p>
            </div>
          </div>
        </div>
        {!isSmallSizeDevice && (
          <div className="col-md-7 col-4 my-auto">
            <NavBarComponent isFooter={false} noMarginTabs={smallerTitleSize} />
          </div>
        )}
      </div>
    </div>
  );
};
export default HeaderNavBar;
