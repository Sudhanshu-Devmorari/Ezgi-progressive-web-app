import React from "react";
import Modal from "react-bootstrap/Modal";
import "./ForgotPasswordModal.css";
import facebook from "../../assets/FacebookLogo.png";
import google from "../../assets/googleLogo.png";
import { Link } from "react-router-dom";

const ForgotPasswordModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body closeButton>
          <div
            className=""
            style={{ fontFamily: "none", color: "#0D2A53", fontWeight: "600" }}
          >
            <div className="m-3">
                <div className="d-flex justify-content-center">
                  <span>
                    <button
                      onClick={props.onHide}
                      type="button"
                      className="btn-close closeBtn"
                      aria-label="Close"
                    ></button>
                  </span>
                </div>
              <div className="">
                We will send an SMS verificationcode to your phone.
              </div>
              <div className="">
                <div className="d-flex flex-column m-2">
                  <label htmlFor="phone">Phone</label>
                  <input
                    className="form-control"
                    type="text"
                    name=""
                    id="phone"
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center my-5">
                  <button
                    className="continuebtn px-3 py-1"
                  >
                    Send
                  </button>
                </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
