import React from "react";
import MainPageDescription from "../Components/MainPageDescription";
import firstPic from "../Pictures/91Ridge10.jpg";
import AWSService from "../Services/AWSService";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const awsService = AWSService.getInstance();

export default class AboutMeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      message: "",
      showModal: false,
      modalMessage: "",
      modalType: "Error"
    };
    this.setInput = this.setInput.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.clearFormFields = this.clearFormFields.bind(this);
    this.validateFormInputs = this.validateFormInputs.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  setInput(key, value) {
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  }

  sendEmail(event) {
    event.preventDefault();
    if (this.validateFormInputs() !== "") {
      this.toggleModal(this.validateFormInputs(), "Error");
    } else {
      awsService.sendEmail(
        {
          ...this.state,
          messageSubject: "Inquiry - Brij Sharma Real Estate Agent"
        },
        this.toggleModal,
        this.clearFormFields
      );
    }
  }

  clearFormFields() {
    this.setState(prevState => ({
      ...prevState,
      name: "",
      phone: "",
      message: ""
    }));
  }

  validateFormInputs() {
    var phonePattern = new RegExp(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
    );
    // validate name
    if (this.state.name === undefined || this.state.name === "") {
      return "Please Enter a Valid Name on the Form";
    } else if (!phonePattern.test(this.state.phone)) {
      return "Please Enter a Valid Phone Number on the form";
    }
    return "";
  }

  toggleModal = (message, type) => {
    this.setState(prevState => ({
      ...prevState,
      showModal: !prevState.showModal,
      modalMessage: message,
      modalType: type
    }));
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.showModal}
          toggle={() => this.toggleModal("", this.state.modalType)}
        >
          <ModalHeader
            className={
              this.state.modalType === "Error"
                ? "alert-danger"
                : "alert-success"
            }
            toggle={() => this.toggleModal("", this.state.modalType)}
          >
            {this.state.modalType}
          </ModalHeader>
          <ModalBody>{this.state.modalMessage}</ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => this.toggleModal("", this.state.modalType)}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <div className="container">
          <div className="row mt-3">
            <div
              className="col-12 heading-text text-center text-md-left"
              style={{
                color: "#000",
                fontSize: "60px",
                fontWeight: 100
              }}
            >
              About Me
            </div>
          </div>
        </div>
        <MainPageDescription isAboutMe={true} />
        <div className="container">
          <div className="row justify-content-start">
            <div
              className="col-12 col-md-6"
              style={{ marginBottom: "-75px", zIndex: 2 }}
            >
              <h4
                className="mt-4 text-center mb-0"
                style={{
                  borderTop: "1px solid rgb(204, 204, 204)",
                  borderLeft: "1px solid rgb(204, 204, 204)",
                  borderRight: "1px solid rgb(204, 204, 204)"
                }}
              >
                Send A Message
              </h4>
              <h6
                className="text-center pt-2 mb-0"
                style={{
                  borderLeft: "1px solid rgb(204, 204, 204)",
                  borderRight: "1px solid rgb(204, 204, 204)"
                }}
              >
                Got any questions? Let's talk!
              </h6>
              <form
                className="pt-4"
                style={{
                  borderLeft: "1px solid rgb(204, 204, 204)",
                  borderRight: "1px solid rgb(204, 204, 204)",
                  borderBottom: "1px solid rgb(204,204,204)",
                  background: "white"
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-6 pr-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={event =>
                          this.setInput("name", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-6 pl-1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        value={this.state.phone}
                        onChange={event =>
                          this.setInput("phone", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-12 mt-2 mb-3">
                      <textarea
                        className="form-control"
                        placeholder="Message"
                        value={this.state.message}
                        onChange={event =>
                          this.setInput("message", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <button
                        type="submit"
                        className="btn btn-secondary mt-1"
                        style={{
                          display: "block",
                          margin: "auto",
                          backgroundColor: "cadetblue",
                          borderColor: "cadetblue"
                        }}
                        onClick={this.sendEmail}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              style={{
                backgroundImage: `url(${firstPic})`,
                minHeight: "150px",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "relative"
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(95, 158, 160, 0.7)"
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
