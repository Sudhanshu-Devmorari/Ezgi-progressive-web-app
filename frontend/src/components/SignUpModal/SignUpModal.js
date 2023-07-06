import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./SignUpModal.css";
import facebook from "../../assets/FacebookLogo.png";
import google from "../../assets/googleLogo.png";
import { RxCross2 } from "react-icons/rx";
import OtpInput from "react-otp-input";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

const SignUpModal = (props) => {
  // THEME
  const currentTheme = localStorage.getItem("CurrentTheme");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [selectCheckBox, setSelectCheckBox] = useState(false);

  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select");
  const [cityDropDown, setCityDropDown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select");
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Select");
  const [ageDropDown, setAgeDropDown] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Select");

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };

  const toggleCountryDropdown = () => {
    setCountryDropDown(!countryDropDown);
  };

  const handleCitySelection = (city) => {
    setSelectedCity(city);
  };

  const toggleCityDropdown = () => {
    setCityDropDown(!cityDropDown);
  };

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const toggleGenderDropdown = () => {
    setGenderDropDown(!genderDropDown);
  };

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const toggleAgeDropdown = () => {
    setAgeDropDown(!ageDropDown);
  };

  const countryOptions = [
    "India",
    "Turkey",
    "Paris",
    "Japan",
    "Germany",
    "USA",
    "UK",
  ];
  const cityOptions = ["Surat", "Baroda"];
  const genderOptions = ["Male", "Female", "I don't want to specify"];
  const ageOptions = ["18 - 24", "25 - 34", "35 - 44", "44+"];

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Body
          className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}
        >
          {/* Signup modal 1 */}
          {props.ShowModal === 1 && (
            <div>
              <div className="m-2">
                <div className="d-flex justify-content-center">
                  <span>SIGN UP</span>
                  <span>
                    <RxCross2
                      onClick={() => {
                        props.onHide();
                      }}
                      fontSize={"1.8rem"}
                      className={`${
                        currentTheme === "dark"
                          ? "closeBtn-dark"
                          : "closeBtn-light"
                      }`}
                    />
                  </span>
                </div>
                <div className="">
                  <div className="d-flex flex-column m-2">
                    <label htmlFor="name">Name Surname</label>
                    <input
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="text"
                      name=""
                      id="name"
                    />
                  </div>
                  <div className="d-flex flex-column m-2">
                    <label htmlFor="username">Username</label>
                    <input
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="text"
                      name=""
                      id="username"
                    />
                  </div>
                  <div className="d-flex flex-column m-2">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="text"
                      name=""
                      id="phone"
                    />
                  </div>
                  <div className="d-flex flex-column m-2">
                    <label htmlFor="password">Password</label>
                    <input
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="password"
                      name=""
                      id="password"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center my-3">
                  <button
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
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
                      style={{
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}
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
              className={`${
                currentTheme === "dark" ? "darkMode" : "lightMode"
              }`}
            >
              <div className="m-4">
                <div
                  className="d-flex justify-content-between m-2"
                  style={{ fontWeight: "500", color: "#0D2A53" }}
                >
                  <span>
                    <i
                      onClick={() => props.setShowModal(1)}
                      className="fa-solid fa-arrow-left-long"
                      style={{
                        fontSize: "21px",
                        position: "absolute",
                        left: "17px",
                        top: "10px",
                        color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                      }}
                    ></i>
                  </span>
                  <span className="">
                    <RxCross2
                      onClick={() => {
                        props.onHide();
                      }}
                      fontSize={"1.8rem"}
                      className={`${
                        currentTheme === "dark"
                          ? "closeBtn-dark"
                          : "closeBtn-light"
                      }`}
                    />
                  </span>
                </div>
                <div className="position-relative">
                  <div className="my-2">
                    <CustomDropdown
                      label="Country"
                      options={countryOptions}
                      selectedOption={selectedCountry}
                      onSelectOption={handleCountrySelection}
                      isOpen={countryDropDown}
                      toggleDropdown={toggleCountryDropdown}
                    />
                  </div>

                  <div className="my-2">
                    <CustomDropdown
                      label="City"
                      options={cityOptions}
                      selectedOption={selectedCity}
                      onSelectOption={handleCitySelection}
                      isOpen={cityDropDown}
                      toggleDropdown={toggleCityDropdown}
                    />
                  </div>

                  <div className="my-2">
                    <CustomDropdown
                      label="Gender"
                      options={genderOptions}
                      selectedOption={selectedGender}
                      onSelectOption={handleGenderSelection}
                      isOpen={genderDropDown}
                      toggleDropdown={toggleGenderDropdown}
                    />
                  </div>
                  <div className="my-2">
                    <CustomDropdown
                      label="Age"
                      options={ageOptions}
                      selectedOption={selectedAge}
                      onSelectOption={handleAgeSelection}
                      isOpen={ageDropDown}
                      toggleDropdown={toggleAgeDropdown}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div className="my-3">
                    <img
                      src={
                        !selectCheckBox ? CheckBoxLight : CheckBoxSelectLight
                      }
                      style={{ width: "25px", cursor: "pointer" }}
                      className="me-2"
                      onClick={() => setSelectCheckBox(!selectCheckBox)}
                      alt=""
                    />
                    I have read and agree to the{" "}
                    <span
                      style={{
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}
                      onClick={() => {
                        props.setShowModal(3);
                      }}
                    >
                      Terms of use
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center my-4">
                    <button
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-btn"
                          : "lightMode-btn"
                      } px-3 py-1`}
                    >
                      Continue
                    </button>
                    <div className="mt-4">
                      Already Account?{" "}
                      <sapn
                        style={{
                          color:
                            currentTheme === "dark" ? "#D2DB08" : "#00659D",
                        }}
                        onClick={() => {
                          props.setShowModal(4);
                        }}
                      >
                        Sign In
                      </sapn>
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
                      color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                    }}
                  ></i>
                </span>
                <span className="">
                  <RxCross2
                    onClick={() => {
                      props.onHide();
                    }}
                    fontSize={"1.8rem"}
                    className={`${
                      currentTheme === "dark"
                        ? "closeBtn-dark"
                        : "closeBtn-light"
                    }`}
                  />
                </span>
              </div>
              <h4
                style={{
                  color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                }}
              >
                Terms of Use
              </h4>
              <div
                style={{
                  color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                }}
              >
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
              </div>
              <div className="d-flex justify-content-center mb-4">
                <button
                  className={`${
                    currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                  } px-3 py-1`}
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
            >
              <div className="m-2">
                <div className="d-flex justify-content-center">
                  <span>LOGIN</span>
                  <span>
                    <RxCross2
                      onClick={props.onHide}
                      fontSize={"1.8rem"}
                      className={`${
                        currentTheme === "dark"
                          ? "closeBtn-dark"
                          : "closeBtn-light"
                      }`}
                    />
                  </span>
                </div>
                <div className="">
                  <div className="d-flex flex-column m-2">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
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
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="password"
                      name=""
                      id="password"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center my-3">
                  <button
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
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
                    You don't have Account?{" "}
                    <span
                      style={{
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}
                      onClick={() => {
                        props.setShowModal(1);
                      }}
                    >
                      Sign Up
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* End Sign In */}

          {/* Forgot Password */}
          {props.ShowModal === 5 && (
            <div>
              <div className="m-3 mt-4">
                <div className="d-flex justify-content-center">
                  <span>
                    <RxCross2
                      onClick={props.onHide}
                      fontSize={"1.8rem"}
                      className={`${
                        currentTheme === "dark"
                          ? "closeBtn-dark"
                          : "closeBtn-light"
                      }`}
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
                       className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
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
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
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
            >
              <div className="m-3 mt-4">
                <div className="d-flex justify-content-center">
                  <span>
                    <RxCross2
                      onClick={props.onHide}
                      fontSize={"1.8rem"}
                      className={`${
                        currentTheme === "dark"
                          ? "closeBtn-dark"
                          : "closeBtn-light"
                      }`}
                    />
                  </span>
                </div>
                <div className="">
                  We sent a SMS verification code to your phone.
                </div>
                <div className="my-1">
                  <div className="d-flex justify-content-between">
                    <span>Enter 6 digit code</span>
                    <span style={{
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}>1:45</span>
                  </div>
                  <div className="otp-container">
                    <OtpInput
                      inputStyle={`${currentTheme === "dark" ? "otpinputdesign-dark-mode" : "otpinputdesign-light-mode"}`}
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span> </span>}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                  <div className="text-end">
                    <small>Didn't get the code? </small>
                    <span style={{
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}>Send Again</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center my-4">
                  <button
                    onClick={() => {
                      props.setShowModal(7);
                    }}
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
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
            >
              <div className="m-3 mt-4">
                <div className="d-flex justify-content-center">
                  <span>
                    <RxCross2
                      onClick={props.onHide}
                      fontSize={"1.8rem"}
                      className={`${
                        currentTheme === "dark"
                          ? "closeBtn-dark"
                          : "closeBtn-light"
                      }`}
                    />
                  </span>
                </div>
                <div className="">You can create your new password</div>
                <div className="">
                  <div className="d-flex flex-column my-2">
                    <label htmlFor="Password">Password</label>
                    <input
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
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
                  <button
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
                  >
                    Create
                  </button>
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
