import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./OtpModal.css";
import { RxCross2 } from "react-icons/rx";
import OtpInput from "react-otp-input";
import { PasswordReset } from "../PasswordReset/PasswordReset";

const OtpModal = (props) => {
  const [otp, setOtp] = useState("");
  const [passwordResetModalShow, setPasswordResetModalShow] = useState(false);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Body closeButton>
          <div
            className=""
            style={{ fontFamily: "none", color: "#0D2A53", fontWeight: "600" }}
          >
            <div className="m-3 mt-4">
              <div className="d-flex justify-content-center">
                <span>
                  <RxCross2
                    onClick={props.onHide}
                    fontSize={"1.8rem"}
                    style={{
                      position: "absolute",
                      right: "17px",
                      top: "10px",
                      color: "#0D2A53",
                    }}
                  />
                </span>
              </div>
              <div className="">
                We sent a SMS verification code to your phone.
              </div>
              <div className="my-1">
                <div className="d-flex justify-content-between">
                  <span>Enter 6 digit code</span>
                  <span style={{ color: "#00659D" }}>1:45</span>
                </div>
                <div className="otp-container">
                  <OtpInput
                    inputStyle="otpinputdesign"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <div className="text-end">
                  <small>Didn't get the code? </small>
                  <span style={{ color: "#00659D" }}>Send Again</span>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center my-4">
                <button
                  className="continuebtn px-3 py-1"
                  onClick={() => setPasswordResetModalShow(true)}
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <PasswordReset
        show={passwordResetModalShow}
        onHide={() => setPasswordResetModalShow(false)}
      />
    </>
  );
};

export default OtpModal;
