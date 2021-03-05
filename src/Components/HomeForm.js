import { React, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import AWSService from "../Services/AWSService";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  contactMethod: "",
  propertyType: "",
  beds: "",
  baths: "",
  sqFt: "",
  comments: ""
};

const awsService = AWSService.getInstance();

const HomeForm = ({ currentUrl }) => {
  let isMarketAnalysis = currentUrl === "/what-is-my-home-worth";

  const [messageFormState, setFormState] = useState(initialFormState);

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
    setFormState({ ...messageFormState, [key]: value });
  }

  function sendEmail(event) {
    event.preventDefault();
    if (validateFormInputs() !== "") {
      toggleModal(validateFormInputs(), "Error");
    } else {
      awsService.sendEmail(
        {
          ...messageFormState,
          messageSubject: isMarketAnalysis
            ? "Comparative Market Analysis Request - Brij Sharma Real Estate Agent"
            : "Home Search Request - Brij Sharma Real Estate Agent"
        },
        toggleModal,
        clearFormFields
      );
    }
  }

  function clearFormFields() {
    setFormState(initialFormState);
  }

  function validateFormInputs() {
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:.[\w-]+)*))(@((?:[\w-]+.)*\w[\w-]{0,66}).([a-z]{2,6}(?:.[a-z]{2})?)$)|(@\[?((25[0-5].|2[0-4][0-9].|1[0-9]{2}.|[0-9]{1,2}.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}).){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
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
    } else if (
      messageFormState.address === undefined ||
      messageFormState.address === ""
    ) {
      return "Please Enter a Valid Address on the Form";
    } else if (
      messageFormState.city === undefined ||
      messageFormState.city === ""
    ) {
      return "Please Enter a Valid City on the Form";
    } else if (
      messageFormState.state === undefined ||
      messageFormState.state === ""
    ) {
      return "Please Enter a Valid State on the Form";
    } else if (
      messageFormState.zip === undefined ||
      messageFormState.zip === ""
    ) {
      return "Please Enter a Valid Zip Code on the Form";
    } else if (
      messageFormState.contactMethod === undefined ||
      messageFormState.contactMethod === ""
    ) {
      return "Please Enter a Valid Method of Contact on the Form";
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
        <div className="row mt-3">
          <div
            className="col-12 heading-text"
            style={{ color: "#000", fontSize: "40px" }}
          >
            {currentUrl &&
              `${currentUrl
                .split("/")[1]
                .replaceAll("-", " ")
                .toUpperCase()}${isMarketAnalysis ? "?" : "!"}`}
          </div>
          <div
            className="col-12 subheading-text"
            style={{ color: "#000", fontSize: "20px" }}
          >
            {isMarketAnalysis
              ? "We’re here to help you price it right – get a comparative market analysis today."
              : "Tell us what you’re looking for! Get the latest listings delivered straight to your inbox."}
          </div>
          <div
            className="col-md-6 col-12 mt-md-3 mt-2 heading-text"
            style={{ color: "#000", fontSize: "20px" }}
          >
            Contact Information
          </div>
          <div
            className="col-6 mt-3 heading-text d-none d-md-block"
            style={{ color: "#000", fontSize: "20px" }}
          >
            Home Specs
          </div>
          <div className="col-12 col-md-6 mt-1 mt-md-3">
            <form>
              <div className="row">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={event => setInput("name", event.target.value)}
                  />
                </div>
                <div className="col-12 mt-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={event => setInput("email", event.target.value)}
                  />
                </div>
                <div className="col-12 mt-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    onChange={event => setInput("phone", event.target.value)}
                  />
                </div>
                <div className="col-12 mt-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    onChange={event => setInput("address", event.target.value)}
                  />
                </div>
                <div className="col-4 pr-0 mt-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    onChange={event => setInput("city", event.target.value)}
                  />
                </div>
                <div className="col-4 pr-0 pl-1 mt-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    onChange={event => setInput("state", event.target.value)}
                  />
                </div>
                <div className="col-4 pl-1 mt-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Zip"
                    onChange={event => setInput("zip", event.target.value)}
                  />
                </div>
                <div className="col-12 mt-1">
                  <select
                    className="form-control"
                    onChange={event =>
                      setInput("contactMethod", event.target.value)
                    }
                  >
                    <option default style={{ display: "none" }}>
                      Preferred Method of Contact
                    </option>
                    <option>Phone</option>
                    <option>Email</option>
                    <option>Phone or Email</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div
            className="col-12 mt-3 heading-text d-block d-md-none"
            style={{ color: "#000", fontSize: "20px" }}
          >
            Home Specs
          </div>
          <div className="col-md-6 col-12 mt-1 mt-md-3">
            <form className="h-100">
              <div className="row h-100">
                <div
                  className="col-12"
                  style={{ height: "calc(1.5em + .75rem + 2px)" }}
                >
                  <select
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={event =>
                      setInput("propertyType", event.target.value)
                    }
                  >
                    <option defaultChecked style={{ display: "none" }}>
                      Property Type
                    </option>
                    <option>Single Family Home</option>
                    <option>Condominium / Townhouse</option>
                    <option>Rental Property</option>
                  </select>
                </div>
                <div
                  className="col-6 pr-0 mt-1"
                  style={{ height: "calc(1.5em + .75rem + 2px)" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Beds"
                    onChange={event => setInput("beds", event.target.value)}
                  />
                </div>
                <div
                  className="col-6 pl-1 mt-1"
                  style={{ height: "calc(1.5em + .75rem + 2px)" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Baths"
                    onChange={event => setInput("baths", event.target.value)}
                  />
                </div>
                <div
                  className="col-12 mt-1"
                  style={{ height: "calc(1.5em + .75rem + 2px)" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sq. Footage"
                    onChange={event => setInput("sqFt", event.target.value)}
                  />
                </div>
                <div className="col-12 mt-1 h-50">
                  <textarea
                    className="form-control h-100"
                    placeholder="Additional Comments"
                    onChange={event => setInput("comments", event.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-12 mt-4 mt-md-0 text-center">
            <button onClick={sendEmail} className="btn btn-secondary mt-3">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeForm;
