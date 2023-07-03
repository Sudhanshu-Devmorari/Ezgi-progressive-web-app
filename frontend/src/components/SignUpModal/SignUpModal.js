import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./SignUpModal.css";
import facebook from "../../assets/FacebookLogo.png";
import google from "../../assets/googleLogo.png";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";

const SignUpModal = (props) => {
  const [continueShow, setContinueShow] = useState(false);
  const [countryDropDown, setCountryDropDown] = useState(false);

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
                  <button
                    onClick={props.onHide}
                    type="button"
                    className="btn-close closeBtn"
                    aria-label="Close"
                  ></button>
                </span>
              </div>
              <div className="">
                <div className="d-flex flex-column m-2">
                  <label htmlFor="name">Name Surname</label>
                  <input
                    className="form-control"
                    type="text"
                    name=""
                    id="name"
                  />
                </div>
                <div className="d-flex flex-column m-2">
                  <label htmlFor="username">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    name=""
                    id="username"
                  />
                </div>
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
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name=""
                    id="password"
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center my-3">
                <button
                  className="continuebtn px-3 py-1"
                  onClick={() => {
                    setContinueShow(true);
                  }}
                >
                  Continue
                </button>
                <div className="text-center my-3">
                  --------------------- or ---------------------{" "}
                </div>
                <div className="">
                  <img className="mx-3" src={google} alt="" height={50} />
                  <img className="mx-3" src={facebook} alt="" height={50} />
                </div>
                <div className="mt-3">
                  Already Account?{" "}
                  <Link style={{ textDecoration: "none", color: "#00659D" }}>
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Next */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={continueShow}
        onHide={() => setContinueShow(false)}
      >
        <Modal.Body>
          <div
            className=""
            style={{ fontFamily: "none", color: "#0D2A53", fontWeight: "600" }}
          >
            <div className="m-2">
              <div
                className="d-flex justify-content-between m-2"
                style={{ fontWeight: "500", color: "#0D2A53" }}
              >
                <span>
                  <i
                    onClick={() => setContinueShow(false)}
                    className="fa-solid fa-arrow-left-long"
                    style={{ fontSize: "18px" }}
                  ></i>
                </span>
                <span className="">
                  <RxCross2
                    fontSize={"1.4rem"}
                    onClick={() => {
                      props.onHide();
                    }}
                  />
                </span>
              </div>
              <div className="position-relative">
                <span>Country</span>
                <div
                  className="customDropdown p-2 text-center"
                  onClick={() => setCountryDropDown(!countryDropDown)}
                >
                  <span>Country</span>
                </div>
                <div
                  className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 position-absolute ${
                    countryDropDown ? "d-block" : "d-none"
                  } `}
                >
                  <span className="dpcontent my-1 p-2">India</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                </div>

                {/* <span>State</span>
                <div className="customDropdown p-2 text-center">
                  <span>Country</span>
                </div>
                <div className="customDropdown-content p-2 flex-column d-flex text-center h-25">
                  <span className="dpcontent m-1 p-2">India</span>
                  <span className="dpcontent m-1 p-2">Turkey</span>
                  <span className="dpcontent m-1 p-2">Turkey</span>
                  <span className="dpcontent m-1 p-2">Turkey</span>
                  <span className="dpcontent m-1 p-2">Turkey</span>
                  <span className="dpcontent m-1 p-2">Turkey</span>
                  <span className="dpcontent m-1 p-2">Turkey</span>
                  <span className="dpcontent m-1 p-2">Turkey</span>
                  <span className="dpcontent m-1 p-2">Turkey</span>
                </div> */}

                {/* <div className="d-flex flex-column m-2">
                  <label htmlFor="Country">Country</label>
                  <select name="" id="Country" className="customDropdown p-2 text-center">
                    <option className="dpcontent" selected value="">Select</option>
                    <option className="dpcontent" value="">India</option>
                    <option className="dpcontent" value="">Turkey</option>
                  </select>
                </div>
                <div className="d-flex flex-column m-2">
                  <label htmlFor="Gender">Gender</label>
                  <select name="" id="Gender" className="customDropdown p-2 text-center">
                    <option className="dpcontent" selected value="">Select</option>
                    <option className="dpcontent" value="">India</option>
                    <option className="dpcontent" value="">Turkey</option>
                  </select>
                </div> */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
