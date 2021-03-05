import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
/**
 * ReactStrap Nav Bar Component, which keeps track of the state such as if the nav bar is collapsed
 */
export default class NavBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onMouseEnterProperties = this.onMouseEnterProperties.bind(this);
    this.onMouseLeaveProperties = this.onMouseLeaveProperties.bind(this);
    this.toggleProperties = this.toggleProperties.bind(this);
    this.state = {
      propertiesOpen: false,
      isOpen: false
    };
  }

  /**
   * Toggles the Dropdown 'Properties' based on the previous state of the dropdown.
   */
  toggleProperties() {
    this.setState(prevState => ({
      ...prevState,
      propertiesOpen: !prevState.propertiesOpen
    }));
  }

  /**
   * Opens the Dropdown 'Properties' when a mouse hoverover event occurs.
   */
  onMouseEnterProperties() {
    this.setState(prevState => ({
      ...prevState,
      propertiesOpen: true
    }));
  }

  /**
   * Closes the Dropdown 'Properties' when a mouse hoverout event occurs.
   */
  onMouseLeaveProperties() {
    this.setState(prevState => ({
      ...prevState,
      propertiesOpen: false
    }));
  }

  /**
   * Toggles a collapsed navbar when the website is viewed on a smaller device.
   */
  toggle() {
    this.setState(prevState => ({
      ...prevState,
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    let navBarContent = (
      <Nav
        className={`${this.props.isFooter ? "footer-navbar-nav" : ""}`}
        navbar
      >
        <NavItem>
          <NavLink
            style={{
              fontSize: "19px",
              borderLeft: "none"
            }}
            tag={ReactLink}
            to="/"
          >
            Home
          </NavLink>
        </NavItem>
        <NavItem
          className={`${
            this.props.isFooter || this.props.noMarginTabs ? "" : "ml-md-4"
          }`}
        >
          <NavLink
            style={{
              fontSize: "19px"
            }}
            tag={ReactLink}
            to="/about-me"
          >
            About Me
          </NavLink>
        </NavItem>
        {this.props.isFooter && (
          <NavItem
            className={`${
              this.props.isFooter || this.props.noMarginTabs ? "" : "ml-md-4"
            }`}
          >
            <NavLink
              style={{
                fontSize: "19px"
              }}
              tag={ReactLink}
              to="/home-search"
            >
              Properties
            </NavLink>
          </NavItem>
        )}
        {!this.props.isFooter && (
          <UncontrolledDropdown
            onMouseOver={this.onMouseEnterProperties}
            onMouseLeave={this.onMouseLeaveProperties}
            isOpen={this.state.propertiesOpen}
            toggle={this.toggleProperties}
            nav
            inNavbar
            className={`${
              this.props.isFooter || this.props.noMarginTabs ? "" : "ml-md-4"
            }`}
          >
            <DropdownToggle
              style={{
                fontSize: "19px",
                color: this.state.propertiesOpen ? "cadetblue" : "#464646"
              }}
              nav
            >
              Properties
            </DropdownToggle>
            <DropdownMenu className="animate slideIn" left="true">
              <NavLink tag={ReactLink} to="/home-search">
                <DropdownItem>Home Search</DropdownItem>
              </NavLink>
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
        <NavItem
          className={`${
            this.props.isFooter || this.props.noMarginTabs ? "" : "ml-md-4"
          }`}
        >
          <NavLink
            style={{
              fontSize: "19px"
            }}
            tag={ReactLink}
            to="/contact-us"
          >
            Contact Us
          </NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <div
        className={`row justify-content-center${
          this.props.isFooter ? " footer-navbar-height" : ""
        }`}
      >
        <Navbar
          className={`${
            this.props.isFooter ? "footer-navbar pl-0 pr-0" : "header-navbar"
          }`}
          expand="sm"
        >
          {!this.props.isFooter && (
            <NavbarToggler onClick={() => this.toggle()} />
          )}
          {!this.props.isFooter && (
            <Collapse isOpen={this.state.isOpen} navbar>
              {navBarContent}
            </Collapse>
          )}
          {this.props.isFooter && <div>{navBarContent}</div>}
        </Navbar>
      </div>
    );
  }
}
