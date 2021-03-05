import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const IconNavBar = ({ toggleSideNav }) => {
  return (
    <div
      className="row navbar-position p-2"
      style={{
        zIndex: 99999,
        background: "white",
        top: "0px",
        position: "fixed",
        borderBottom: "1px solid #cccccc"
      }}
    >
      <div className="col-6 text-center">
        <button className="icon-button" onClick={toggleSideNav}>
          <FontAwesomeIcon icon={faBars} size={"2x"} />
        </button>
      </div>
      <div className="col-6 text-center">
        <a
          className="icon-button"
          target="_blank"
          rel="noreferrer"
          href="mailto:bks1991@comcast.net?subject=Brij Sharma Real Estate Agent Inquiry"
        >
          <FontAwesomeIcon icon={faEnvelope} size={"2x"} />
        </a>
      </div>
    </div>
  );
};
export default IconNavBar;
