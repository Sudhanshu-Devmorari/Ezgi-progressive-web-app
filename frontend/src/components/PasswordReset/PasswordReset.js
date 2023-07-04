import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import "./PasswordReset.css";

export const PasswordReset = (props) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
              <div className="">You can create your new password</div>
              <div className="">
                <div className="d-flex flex-column my-2">
                  <label htmlFor="Password">Password</label>
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    name=""
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <AiOutlineEyeInvisible
                    fontSize={"1.5rem"}
                    style={{
                      position: "absolute",
                      right: "4rem",
                      top: "6.4rem",
                    }}
                    onClick={togglePasswordVisibility}
                  />
                  <AiOutlineEye
                    fontSize={"1.5rem"}
                    style={{
                      position: "absolute",
                      right: "2.5rem",
                      top: "6.4rem",
                    }}
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center my-4">
                <button className="continuebtn px-3 py-1">Create</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
