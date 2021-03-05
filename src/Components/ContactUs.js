import { React, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ProfilePic from "../Pictures/part1.jpg";
import AWSService from "../Services/AWSService";

const initialStateContactForm = { name: "", phone: "", message: "" };

const awsService = AWSService.getInstance();

const ContactUs = props => {
  const [formState, setFormState] = useState(initialStateContactForm);

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

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  function sendEmail(event) {
    event.preventDefault();
    if (validateFormInputs() !== "") {
      toggleModal(validateFormInputs(), "Error");
    } else {
      awsService.sendEmail(
        {
          ...formState,
          messageSubject: "Inquiry - Brij Sharma Real Estate Agent"
        },
        toggleModal,
        clearFormFields
      );
    }
  }

  function clearFormFields() {
    setFormState({ ...initialStateContactForm });
  }

  function validateFormInputs() {
    var phonePattern = new RegExp(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
    );
    // validate name
    if (formState.name === undefined || formState.name === "") {
      return "Please Enter a Valid Name on the Form";
    } else if (!phonePattern.test(formState.phone)) {
      return "Please Enter a Valid Phone Number on the form";
    }
    return "";
  }

  return (
    <div>
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
            color="secondary"
            onClick={() => toggleModal("", modal.modalType)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-md-7 col-12 mb-2">
            <div className="row justify-content-center justify-content-md-start">
              <div
                className="col-12 heading-text text-center text-md-left"
                style={{ color: "#000", fontSize: "60px", fontWeight: 100 }}
              >
                Contact Us
              </div>
              <div
                className="col-12 subheading-text"
                style={{ color: "#000", fontSize: "20px" }}
              >
                Send us a message and we’ll get right back in touch.
              </div>
              <div className="col-12 mt-3">
                <h2
                  style={{
                    color: "#005f69",
                    fontSize: "48px",
                    textTransform: "uppercase"
                  }}
                >
                  DDS Real Estate
                </h2>
              </div>
              <div className="col-12">
                <ul className="contact-info">
                  <li>
                    <svg
                      className="bi bi-house-fill"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "#005f69" }}
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
                    <span style={{ padding: "0px 10px" }}>
                      838 Green St #202a, Iselin, NJ 08830
                    </span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-building"
                      viewBox="0 0 16 16"
                      style={{ color: "#005f69" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                      />
                      <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                    </svg>
                    <span style={{ padding: "0px 10px" }}>(718) 857-8259</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-printer"
                      viewBox="0 0 16 16"
                      style={{ color: "#005f69" }}
                    >
                      <path d="M11 2H5a1 1 0 0 0-1 1v2H3V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h-1V3a1 1 0 0 0-1-1zm3 4H2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v1H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z" />
                      <path
                        fillRule="evenodd"
                        d="M11 9H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM5 8a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5z"
                      />
                      <path d="M3 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>
                    <span style={{ padding: "0px 10px" }}>(732) 962-6755</span>
                  </li>
                </ul>
              </div>
              <div
                className="col-md-8 col-11 ml-md-3"
                style={{ border: "1px solid #ccc" }}
              >
                <form className="mt-1">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="mt-2 text-center mb-0">Send A Message</h4>
                    </div>
                    <div className="col-12">
                      <h6 className="text-center">
                        Got any questions? Let's talk!
                      </h6>
                    </div>
                    <div className="col-md-6 col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={formState.name}
                        onChange={event => setInput("name", event.target.value)}
                      />
                    </div>
                    <div className="col-md-6 col-12 pl-md-1 mt-md-0 mt-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        value={formState.phone}
                        onChange={event =>
                          setInput("phone", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-12 col-12 mt-2 mb-3">
                      <textarea
                        className="form-control"
                        placeholder="Message"
                        value={formState.message}
                        onChange={event =>
                          setInput("message", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-12 col-12 mb-3">
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
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-10 pl-0 pr-0 d-flex align-items-center">
            <div style={{ position: "relative" }}>
              <img
                className="img-responsive about-me-pic"
                alt="My Profile Pic"
                style={{
                  width: "100%",
                  maxHeight: "500px"
                }}
                src={ProfilePic}
              />
              <div
                className="text-center"
                style={{
                  position: "absolute",
                  bottom: "0%",
                  left: "0%",
                  width: "100%",
                  background: "rgba(253, 253, 252, 0.85)"
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <h6
                      style={{
                        fontSize: "25px",
                        color: "#464646",
                        fontFamily: "Noto Sans KR"
                      }}
                    >
                      <b>BRIJ K. SHARMA</b>
                    </h6>
                  </div>
                  <div className="col-12">
                    <h6
                      style={{
                        fontSize: "15px",
                        color: "rgb(0, 95, 105)",
                        fontFamily: "Noto Sans KR"
                      }}
                    >
                      <b>REAL ESTATE AGENT</b>
                    </h6>
                  </div>
                  <div
                    className="col-12"
                    style={{ color: "cadetblue", fontFamily: "Noto Sans KR" }}
                  >
                    <h6>
                      <b style={{ color: "#464646", fontSize: "12px" }}>
                        OFFICE
                      </b>{" "}
                      (718) 857-8259
                    </h6>
                  </div>
                  <div
                    className="col-12"
                    style={{ color: "cadetblue", fontFamily: "Noto Sans KR" }}
                  >
                    <h6>
                      <b style={{ color: "#464646", fontSize: "12px" }}>CELL</b>{" "}
                      (732) 395-1366
                    </h6>
                  </div>
                  <div
                    className="col-12"
                    style={{
                      color: "rgb(0, 95, 105)",
                      fontFamily: "Noto Sans KR"
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
                    <span className="ml-1">bks1991@comcast.net</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <MapContainer
            center={[40.5657491, -74.304864]}
            zoom={17}
            style={{ width: "100%", height: "300px" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <Marker
              key={`marker-ddsRealEstate`}
              position={[40.5657491, -74.304864]}
            ></Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
