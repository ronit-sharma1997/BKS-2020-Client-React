import { Link } from "react-router-dom";

/**
 * Side Nav Bar that is used when the current device screen size is a certain width.
 * @param {isSmallSizeDevice} - whether or not the current device screen size is small
 * @param {sideNavWidth} - the current width of the side navbar
 * @param {toggleSideNav} - function that toggles the display of the side navbar
 */
const SideNavBar = ({ isSmallSizeDevice, sideNavWidth, toggleSideNav }) => {
  return (
    <div>
      {sideNavWidth !== "0px" && isSmallSizeDevice && (
        <div className="sidenavOverlay" onClick={toggleSideNav} />
      )}
      {isSmallSizeDevice && (
        <div className="sidenav" style={{ width: sideNavWidth }}>
          <Link to="/" className="bottom-border-gray">
            Home
          </Link>
          <Link to="/about-me" className="bottom-border-gray">
            About Me
          </Link>
          <Link to="/home-search" className="bottom-border-gray">
            Properties
          </Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
      )}
    </div>
  );
};
export default SideNavBar;
