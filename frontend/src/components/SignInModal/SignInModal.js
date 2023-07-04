import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./SignInModal.css";
import facebook from "../../assets/FacebookLogo.png";
import google from "../../assets/googleLogo.png";
import { Link } from "react-router-dom";
import {RxCross2} from "react-icons/rx";

const SignInModal = (props) => {
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
            <div className="m-2">
              <div className="d-flex justify-content-center">
                <span>LOGIN</span>
                <span>
                <RxCross2 fontSize={"1.8rem"} style={{position:"absolute", right:"17px", top:"10px",color: "#0D2A53"}}/>
                </span>
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
                <div className="d-flex flex-column m-2">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="password">Password</label>
                    <span>Forgot Password?</span>
                  </div>
                  <input
                    className="form-control"
                    type="password"
                    name=""
                    id="password"
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center my-3">
                <button className="continuebtn px-3 py-1">Continue</button>
                <div className="text-center my-3">
                  --------------------- or ---------------------{" "}
                </div>
                <div className="">
                  <img className="mx-3" src={google} alt="" height={50} />
                  <img className="mx-3" src={facebook} alt="" height={50} />
                </div>
                <div className="mt-3">
                  You don't have  Account?{" "}
                  <Link style={{ textDecoration: "none", color: "#00659D" }}>
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignInModal;
