import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./SignUpModal.css";
import facebook from "../../assets/FacebookLogo.png";
import google from "../../assets/googleLogo.png";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import OtpInput from "react-otp-input";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const SignUpModal = (props) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <Modal.Body>
          {/* Signup modal 1 */}
          {props.ShowModal === 1 && (
            <div
              className=""
              style={{
                fontFamily: "none",
                color: "#0D2A53",
                fontWeight: "600",
              }}
            >
              <div className="m-2">
                <div className="d-flex justify-content-center">
                  <span>SIGN UP</span>
                  <span>
                    <RxCross2
                      onClick={() => {
                        props.onHide();
                      }}
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
                      props.setShowModal(2);
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
                    <span
                      style={{ color: "#00659D" }}
                      onClick={() => {
                        props.setShowModal(4);
                      }}
                    >
                      Sign In
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* End Signup modal 1 */}

          {/* Signup model 2 (dropdown) */}
          {props.ShowModal === 2 && (
            <div
              className=""
              style={{
                fontFamily: "none",
                color: "#0D2A53",
                fontWeight: "600",
              }}
            >
              <div className="m-4">
                <div
                  className="d-flex justify-content-between m-2"
                  style={{ fontWeight: "500", color: "#0D2A53" }}
                >
                  <span>
                    <i
                      onClick={() => props.setShowModal(1)}
                      // onClick={() => setContinueShow(false)}
                      className="fa-solid fa-arrow-left-long"
                      style={{
                        fontSize: "21px",
                        position: "absolute",
                        left: "17px",
                        top: "10px",
                        color: "#0D2A53",
                      }}
                    ></i>
                  </span>
                  <span className="">
                    <RxCross2
                      onClick={() => {
                        props.onHide();
                      }}
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
                  <div className="my-2">
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
                  <div className="my-2">
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
                  <div className="my-2">
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
                  <div className="my-2">
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
                    <input type="checkbox" name="" id="" className="me-2" />I
                    have read and agree to the{" "}
                    <span
                      style={{ color: "#00659D", cursor: "pointer" }}
                      onClick={() => {
                        // setTermsOfUse(true);
                        props.setShowModal(3);
                      }}
                    >
                      Terms of use
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center my-4">
                    <button
                      className="continuebtn px-3 py-1"
                      // onClick={() => {
                      //   setTermsOfUse(true);
                      // }}
                    >
                      Continue
                    </button>
                    <div className="mt-4">
                      Already Account?{" "}
                      <Link
                        style={{ textDecoration: "none", color: "#00659D" }}
                        onClick={() => {
                          props.setShowModal(4);
                        }}
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Terms of Use */}
          {props.ShowModal === 3 && (
            <div
              className="m-4"
              style={{
                fontFamily: "none",
                color: "#0D2A53",
                fontWeight: "600",
              }}
            >
              <div
                className="d-flex justify-content-between m-2"
                style={{ fontWeight: "500", color: "#0D2A53" }}
              >
                <span>
                  <i
                    onClick={() => {
                      props.setShowModal(2);
                    }}
                    className="fa-solid fa-arrow-left-long"
                    style={{
                      fontSize: "21px",
                      position: "absolute",
                      left: "17px",
                      top: "10px",
                      color: "#0D2A53",
                    }}
                  ></i>
                </span>
                <span className="">
                  <RxCross2
                    onClick={() => {
                      props.onHide();
                      // setContinueShow(false);
                      // setTermsOfUse(false);
                    }}
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
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros. dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, excepturi odit, sint dolor est consequuntur
                harum inventore, quas nesciunt aspernatur expedita. Sint qui
                voluptatum
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, excepturi odit, sint dolor est consequuntur
                harum inventore, quas nesciunt aspernatur expedita. Sint qui
                voluptatum
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, excepturi odit, sint dolor est consequuntur
                harum inventore, quas nesciunt aspernatur expedita. Sint qui
                voluptatum
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, excepturi odit, sint dolor est consequuntur
                harum inventore, quas nesciunt aspernatur expedita. Sint qui
                voluptatum exercitationem eum sit impedit eligendi modi veniam
                rerum ipsam sapiente, dolore recusandae nesciunt sunt
                doloremque!
              </p>
              <div className="d-flex justify-content-center mb-4">
                <button
                  className="continuebtn px-3 py-1"
                  onClick={() => {
                    props.setShowModal(2);
                  }}
                >
                  Approve
                </button>
              </div>
            </div>
          )}
          {/* End Terms of Use */}

          {/* Sign In  */}
          {props.ShowModal === 4 && (
            <div
              className=""
              style={{
                fontFamily: "none",
                color: "#0D2A53",
                fontWeight: "600",
              }}
            >
              <div className="m-2">
                <div className="d-flex justify-content-center">
                  <span>LOGIN</span>
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
                      <span
                        onClick={() => {
                          props.setShowModal(5);
                        }}
                      >
                        Forgot Password?
                      </span>
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
                    You don't have Account?{" "}
                    <Link
                      style={{ textDecoration: "none", color: "#00659D" }}
                      onClick={() => {
                        props.setShowModal(1);
                      }}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* End Sign In */}

          {/* Forgot Password */}
          {props.ShowModal === 5 && (
            <div
              className=""
              style={{
                fontFamily: "none",
                color: "#0D2A53",
                fontWeight: "600",
              }}
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
                  We will send an SMS verification code to your phone.
                </div>
                <div className="">
                  <div className="d-flex flex-column my-2">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      name=""
                      id="phone"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center my-4">
                  <button
                    onClick={() => {
                      props.setShowModal(6);
                    }}
                    className="continuebtn px-3 py-1"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* End Forgot Password */}

          {/* OTP */}
          {props.ShowModal === 6 && (
            <div
              className=""
              style={{
                fontFamily: "none",
                color: "#0D2A53",
                fontWeight: "600",
              }}
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
                    onClick={() => {
                      props.setShowModal(7);
                    }}
                    className="continuebtn px-3 py-1"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* End OTP */}

          {/* Password Reset */}
          {props.ShowModal === 7 && (
            <div
              className=""
              style={{
                fontFamily: "none",
                color: "#0D2A53",
                fontWeight: "600",
              }}
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
          )}
          {/* End Password Reset */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
