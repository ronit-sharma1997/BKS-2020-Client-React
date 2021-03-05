import { React, useState } from "react";
import {
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import { useMediaQuery } from "react-responsive";
import ImageCarosel from "./ImageCarosel";
import firstPic from "../Pictures/91Ridge4.jpg";
import secondPic from "../Pictures/bed.jpg";
import thirdPic from "../Pictures/bathroom.jpg";
import fourthPic from "../Pictures/11Marine1.jpg";
import fivePic from "../Pictures/11Marine2.jpg";
import sixPic from "../Pictures/11Marine3.jpg";
import sevenPic from "../Pictures/11Marine4.jpg";
import ProfilePic from "../Pictures/part1.jpg";
import HeaderNavBar from "./HeaderNavBar";
import { Link } from "react-router-dom";
import AWSService from "../Services/AWSService";

const images = [
  firstPic,
  secondPic,
  thirdPic,
  fourthPic,
  fivePic,
  sixPic,
  sevenPic
];

const awsService = AWSService.getInstance();

const initialStateMessageForm = { name: "", email: "", phone: "", message: "" };

/**
 * Header Part of the Web Page(NavBar, Large Photo Carousel, and Contact Information Card)
 */
const Header = ({ currentUrl, history, toggleSideNav, isSmallSizeDevice }) => {
  const [messageFormState, setFormState] = useState(initialStateMessageForm);

  const [modal, setModal] = useState({
    showModal: false,
    modalMessage: "",
    modalType: "Error"
  });

  const toggleModal = (message, type) =>
    setModal({
      showModal: !modal.showModal,
      modalMessage: message,
      modalType: type
    });

  /**
   * Define Breakpoint for Very Large Laptops
   */

  const isVeryLargeLaptop = useMediaQuery({
    query: "(min-width: 1440px)"
  });

  /**
   * Define Breakpoint where the NavBar title font size decreases. Must adjust the contact profile card's height
   * as a result.
   */
  const smallerTitleSize = useMediaQuery({
    query: "(min-width: 796px) and (max-width: 892px)"
  });

  const isHomePage = currentUrl === "/";

  /**
   * Set current state based on key and updated value.
   * @param {key} - key to update
   * @param {value} - updated value
   */
  function setInput(key, value) {
    setFormState({ ...messageFormState, [key]: value });
  }

  /**
   * Clear the form in the contact profile card.
   */
  function clearFormFields() {
    setFormState(initialStateMessageForm);
  }

  /**
   * Send an email based on the inputted values in the form.
   * @param {event} - submit event created by clicking the 'Submit' button
   */
  function sendEmail(event) {
    event.preventDefault();
    if (validateFormInputs() !== "") {
      toggleModal(validateFormInputs(), "Error");
    } else {
      awsService.sendEmail(
        {
          ...messageFormState,
          messageSubject: "Inquiry for Brij Sharma Real Estate Agent"
        },
        toggleModal,
        clearFormFields
      );
    }
  }

  /**
   * Validate the inputs of the form based on specified requirements.
   */
  function validateFormInputs() {
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:.[\w-]+)*))(@((?:[\w-]+.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}.|[0-9]{1,2}.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}).){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    var phonePattern = new RegExp(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
    );
    // validate name
    if (messageFormState.name === undefined || messageFormState.name === "") {
      return "Please Enter a Valid Name on the Form";
    } else if (!emailPattern.test(messageFormState.email)) {
      return "Please Enter a Valid Email on the form";
    } else if (!phonePattern.test(messageFormState.phone)) {
      return "Please Enter a Valid Phone Number on the form";
    }
    return "";
  }

  /**
   * Set form styling based on size of screen.
   */
  let form = (
    <Form className={`${isSmallSizeDevice ? "container" : "mb-2"}`}>
      <Input
        type="text"
        className={`${
          isSmallSizeDevice ? "" : "form-control-sm form-control-md"
        }`}
        placeholder="Name"
        value={messageFormState.name}
        onChange={event => setInput("name", event.target.value)}
      />
      <Input
        type="email"
        className={`mt-1 ${
          isSmallSizeDevice ? "" : "form-control-sm form-control-md"
        }`}
        placeholder="Email"
        value={messageFormState.email}
        onChange={event => setInput("email", event.target.value)}
      />
      <Input
        type="tel"
        className={`mt-1 ${
          isSmallSizeDevice ? "" : "form-control-sm form-control-md"
        }`}
        placeholder="Phone Number"
        value={messageFormState.phone}
        onChange={event => setInput("phone", event.target.value)}
      />
      <Input
        type="text"
        className={`mt-1 ${
          isSmallSizeDevice ? "" : "form-control-sm form-control-md"
        }`}
        placeholder="Message"
        value={messageFormState.message}
        onChange={event => setInput("message", event.target.value)}
      />
      <button
        onClick={sendEmail}
        className="btn btn-secondary mt-1"
        style={{
          display: "block",
          margin: "auto",
          backgroundColor: "cadetblue",
          borderColor: "cadetblue"
        }}
      >
        Submit
      </button>
    </Form>
  );

  return (
    <div className="relative-position">
      <Modal
        isOpen={modal.showModal}
        toggle={() => toggleModal("", modal.modalType)}
      >
        <ModalHeader
          className={
            modal.modalType === "Error" ? "alert-danger" : "alert-success"
          }
          toggle={() => toggleModal("", modal.modalType)}
        >
          {modal.modalType}
        </ModalHeader>
        <ModalBody>{modal.modalMessage}</ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#d3d3d3", borderColor: "#d3d3d3" }}
            onClick={() => toggleModal("", modal.modalType)}
          >
            <span style={{ color: "#464646" }}>Close</span>
          </Button>
        </ModalFooter>
      </Modal>
      {isHomePage && (
        <ImageCarosel
          images={images}
          detailPage={false}
          currentURLPath={currentUrl}
        />
      )}
      {!isHomePage && (
        <div className="row">
          <div
            style={{
              background: `url(${firstPic})`,
              height: "400px",
              width: "100%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: `0px ${
                isSmallSizeDevice
                  ? "0px"
                  : isVeryLargeLaptop
                  ? "-230px"
                  : "-125px"
              }`,
              position: "relative"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"
              }}
            />
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
              <div className={`container ${isSmallSizeDevice ? "ml-4" : ""}`}>
                <Link style={{ color: "#fff" }} to="/">
                  Home
                </Link>
                »{" "}
                {currentUrl.split("/")[2] ? (
                  <Link style={{ color: "#fff" }} to="/home-search">
                    {currentUrl.split("/")[1].replaceAll("-", " ")}
                  </Link>
                ) : (
                  currentUrl.split("/")[1].replaceAll("-", " ")
                )}
                {currentUrl.split("/")[2] &&
                  `»${" "}
                            ${currentUrl.split("/")[2].replaceAll("-", " ")}`}
              </div>
            </div>
          </div>
        </div>
      )}
      <HeaderNavBar
        isSticky={false}
        isSmallSizeDevice={isSmallSizeDevice}
        toggleSideNav={toggleSideNav}
      />
      {!isSmallSizeDevice && isHomePage && (
        <div
          className="row contact-card-position"
          style={{ height: smallerTitleSize ? "698px" : "686px" }}
        >
          <div className="container">
            <div className="col-12">
              <img
                src={ProfilePic}
                className="img-responsive contact-card-pic"
                alt="My Profile Pic"
              />
            </div>
            <div className="col-12 text-center">
              <h6
                style={{
                  fontSize: "25px",
                  color: "#464646"
                }}
              >
                <b>BRIJ K. SHARMA</b>
              </h6>
            </div>
            <div className="col-12 text-center">
              <h6
                style={{
                  fontSize: "15px",
                  color: "rgb(0, 95, 105)"
                }}
              >
                <b>REAL ESTATE AGENT</b>
              </h6>
            </div>
            <div className="col-12 text-center cadet-blue">
              <h6>
                <b style={{ color: "#464646", fontSize: "12px" }}>OFFICE</b>{" "}
                (718) 857-8259
              </h6>
            </div>
            <div className="col-12 text-center cadet-blue">
              <h6>
                <b style={{ color: "#464646", fontSize: "12px" }}>CELL</b> (732)
                395-1366
              </h6>
            </div>
            <div
              className="col-12 text-center"
              style={{ color: "rgb(0, 95, 105)" }}
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
              <span className="ml-1">bks1991@comcast.net</span>
            </div>
            <div
              className="col-12 mt-2 text-center"
              style={{ color: "#464646" }}
            >
              <h5>GET IN TOUCH</h5>
            </div>
            {form}
          </div>
        </div>
      )}

      {isHomePage && (
        <div
          className={`row image-carosel-motto${
            isSmallSizeDevice ? " justify-content-center text-center" : ""
          }`}
          style={
            isSmallSizeDevice
              ? { left: "0", right: "0", margin: "auto", top: "480px" }
              : { left: "14vw", top: "610px" }
          }
        >
          {!isSmallSizeDevice && (
            <h1 style={{ fontSize: "40px" }}>
              Let Us Find<br></br> Your Next Home
            </h1>
          )}
          {isSmallSizeDevice && (
            <h1 style={{ fontSize: "30px" }}>Let Us Find Your Next Home</h1>
          )}
        </div>
      )}
      {isSmallSizeDevice && isHomePage && (
        <div
          className="row h-100 mt-2"
          style={{ backgroundColor: "rgba(253,253,252,.85)" }}
        >
          <div className="container">
            <div className="col-12">
              <img
                src={ProfilePic}
                className="contact-card-pic"
                style={{ width: "11rem" }}
                alt="My Profile Pic"
              />
            </div>
            <div className="col-12">
              <h3>Brij K. Sharma</h3>
            </div>
            <div className="col-12 text-center cadet-blue">
              <h6>
                <b style={{ color: "#464646" }}>OFFICE</b> (718) 857-8259
              </h6>
            </div>
            <div className="col-12 text-center cadet-blue">
              <h6>
                <b style={{ color: "#464646" }}>CELL</b> (732) 395-1368
              </h6>
            </div>
            <div
              className="col-12 text-center"
              style={{ color: "rgb(0, 95, 105)" }}
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
              </svg>{" "}
              <span>bks1991@comcast.net</span>
            </div>
            <div className="col-12 mt-2" style={{ textAlign: "center" }}>
              <h5>GET IN TOUCH</h5>
            </div>
            {form}
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
