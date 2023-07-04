import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./SignUpModal.css";
import facebook from "../../assets/FacebookLogo.png";
import google from "../../assets/googleLogo.png";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const SignUpModal = (props) => {
  const [continueShow, setContinueShow] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(false);

  const [countryDropDown, setCountryDropDown] = useState(false);
  const [cityDropDown, setCityDropDown] = useState(false);
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [ageDropDown, setAgeDropDown] = useState(false);

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
            <div className="m-2">
              <div className="d-flex justify-content-center">
                <span>LOGIN</span>
                <span>
                  <RxCross2
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
              <div className="position-relative">
                {/* Country Dropdown */}
                <div className="">
                  <span>Country</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setCountryDropDown(!countryDropDown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
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
                </div>
                {/* End Country Dropdown */}

                {/* City Dropdown */}
                <div className="">
                  <span>City</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setCityDropDown(!cityDropDown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      cityDropDown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">Surat</span>
                    <span className="dpcontent my-1 p-2">Baroda</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                  </div>
                </div>
                {/* End City Dropdown */}

                {/* Gender Dropdown */}
                <div className="">
                  <span>Gender</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setGenderDropDown(!genderDropDown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      genderDropDown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">Male</span>
                    <span className="dpcontent my-1 p-2">Female</span>
                    <span className="dpcontent my-1 p-2">
                      I don't want to specify
                    </span>
                  </div>
                </div>
                {/* End Gender Dropdown */}

                {/* Age Dropdown */}
                <div className="">
                  <span>Age</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setAgeDropDown(!ageDropDown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      ageDropDown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">18 - 24</span>
                    <span className="dpcontent my-1 p-2">25 - 34</span>
                    <span className="dpcontent my-1 p-2">35 - 44</span>
                    <span className="dpcontent my-1 p-2">44 +</span>
                  </div>
                </div>
                {/* End State Dropdown */}
              </div>
              <div className="text-center">
                <div className="my-3">
                  <input type="checkbox" name="" id="" className="me-2" />I have
                  read and agree to the{" "}
                  <span style={{ color: "#00659D" }}>Terms of use</span>
                </div>
                <div className="d-flex flex-column align-items-center my-3">
                  <button
                    className="continuebtn px-3 py-1"
                    onClick={() => {
                      setTermsOfUse(true);
                    }}
                  >
                    Continue
                  </button>
                  <div className="mt-3">
                    Already Account?{" "}
                    <Link style={{ textDecoration: "none", color: "#00659D" }}>
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Terms of use */}
      <Modal
        show={termsOfUse}
        onHide={() => setTermsOfUse(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div
            className="m-4"
            style={{ fontFamily: "none", color: "#0D2A53", fontWeight: "600" }}
          >
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
            <h4 style={{ color: "#00659D" }}>Terms of Use</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros. dapibus ac facilisis in,
              egestas eget quam. Morbi leo risus, porta ac consectetur ac,
              vestibulum at eros.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, excepturi odit, sint dolor est consequuntur harum
              inventore, quas nesciunt aspernatur expedita. Sint qui voluptatum
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, excepturi odit, sint dolor est consequuntur harum
              inventore, quas nesciunt aspernatur expedita. Sint qui voluptatum
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, excepturi odit, sint dolor est consequuntur harum
              inventore, quas nesciunt aspernatur expedita. Sint qui voluptatum
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, excepturi odit, sint dolor est consequuntur harum
              inventore, quas nesciunt aspernatur expedita. Sint qui voluptatum
              exercitationem eum sit impedit eligendi modi veniam rerum ipsam
              sapiente, dolore recusandae nesciunt sunt doloremque!
            </p>
            <div className="d-flex justify-content-center mb-4">
              <button className="continuebtn px-3 py-1">Approve</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
