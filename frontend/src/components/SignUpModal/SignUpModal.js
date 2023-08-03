import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./SignUpModal.css";
import facebook from "../../assets/FacebookLogo.png";
import google from "../../assets/googleLogo.png";
import { RxCross2 } from "react-icons/rx";
import OtpInput from "react-otp-input";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";
import CheckBoxSelectDark from "../../assets/Checkbox Selected.svg";
import CheckBoxDark from "../../assets/Checkbox Unselected.svg";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";

const SignUpModal = (props) => {
  // THEME
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [otpError, setOtpError] = useState("");

  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Turkey");
  const [cityDropDown, setCityDropDown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select");
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Select");
  const [ageDropDown, setAgeDropDown] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Select");

  // SIGN UP API --------------------------------------------------

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  const [phone, setPhone] = useState("");
  const [usernameError, setNamerror] = useState("");
  const [nameError, setUsernamerror] = useState("");
  const [phonelError, setPhoneError] = useState("");
  const [cityError, setCityError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");

  const [passwordlError, setpasswordError] = useState("");
  const passwordReg = /^(?=.*\d)(?=.*[a-z])[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{8,}$/;
  const phonReg = /^\d{10}$/;

  const [signUpData, setSignUpData] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {
    const interval = setInterval(() => {
      if (props.ShowModal === 6 && minutes > 0 && seconds > 0) {
        clearInterval(interval);
      } else if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds, props.ShowModal]);

  const hadleValidation = () => {
    if (username === "") {
      setUsernamerror("Please enter your username");
    } else if (name === "") {
      setNamerror("Please enter your name");
    } else if (!phonReg.test(phone)) {
      setPhoneError("Invalid phone number");
    } else if (!passwordReg.test(password)) {
      setpasswordError(
        "Password should contain atleast one number and one special character"
      );
    } else {
      props.setShowModal(2);
    }
  };
  useEffect(() => {
    setSignUpData({
      name: name,
      username: username,
      phone: phone,
      password: password,
      country: selectedCountry,
      city: selectedCity,
      gender: selectedGender,
      age: selectedAge,
    });
  }, [
    name,
    username,
    phone,
    password,
    selectedCountry,
    selectedCity,
    selectedGender,
    selectedAge,
  ]);

  const handleSignUp = async () => {
    if (selectedCity === "Select") {
      setCityError("Please select your city.");
    } else if (selectedGender === "Select") {
      setCityError("");
      setGenderError("Please select your gender.");
    } else if (selectedAge === "Select") {
      setGenderError("");
      setAgeError("Please select your age.");
    } else if (!selectCheckBox) {
      setAgeError("");
      setCheckboxError("Please select the checkbox to proceed.");
    } else {
      
      const response = await axios.post(
        "http://127.0.0.1:8000/signup/",
        signUpData
      );
      console.log("response: ", response.data);
      props.setShowModal(6);
    }
  };

// OTP verify API
const handleOTPVerification = async () =>{
  console.log("verify otp clicked");
  const res = await axios.post('http://127.0.0.1:8000/otp-verify/',{otp:otp})
  console.log("afterrrrrrr");
  console.log(res.data, "======>>otp res");
}
// RESEND OTP API 
const handleResendOtp = async () => {
  const res = await axios.post('http://127.0.0.1:8000/otp-resend/',{phone:phone})
  console.log(res, "======>>otp resend");
  if (res.status === 200){
    props.onHide();
  }
  if (res.status === 400){
    
  }
}

  const [userPhone, setuserPhone] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };

  const toggleCountryDropdown = () => {
    if (cityDropDown) {
      setCityDropDown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    setCountryDropDown(!countryDropDown);
  };

  const handleCitySelection = (city) => {
    setSelectedCity(city);
  };

  const toggleCityDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    setCityDropDown(!cityDropDown);
  };

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const toggleGenderDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    if (cityDropDown) {
      setCityDropDown(false);
    }
    setGenderDropDown(!genderDropDown);
  };

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const toggleAgeDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    if (cityDropDown) {
      setCityDropDown(false);
    }
    setAgeDropDown(!ageDropDown);
  };

  const countryOptions = ["Turkey"];
  const cityOptions = [
    "Istanbul",
    "Ankara",
    "İzmir",
    "Bursa",
    "Antalya",
    "Konya",
    "Adana",
    "Gaziantep",
    "Şanlıurfa",
    "Mersin",
  ];
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
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}
          style={{ fontSize: "14px" }}
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
                        setpasswordError("");
                        setPhoneError("");
                        setNamerror("");
                        setUsernamerror("");
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
                      required
                      onChange={(e) => setUsername(e.target.value)}
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="text"
                      name="name"
                      id="name"
                    />
                  </div>
                  <small
                    className="text-danger"
                    style={{ fontSize: "0.71rem" }}
                  >
                    {usernameError}
                  </small>
                  <div className="d-flex flex-column m-2">
                    <label htmlFor="username">Username</label>
                    <input
                      required
                      onChange={(e) => setName(e.target.value)}
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="text"
                      name="username"
                      id="username"
                    />
                  </div>
                  <small
                    className="text-danger"
                    style={{ fontSize: "0.71rem" }}
                  >
                    {nameError}
                  </small>
                  <div className="d-flex flex-column m-2">
                    <label htmlFor="phone">Phone</label>
                    <div className="input-group">
                      <span
                        className={`input-group-text ${
                          currentTheme === "dark"
                            ? "darkMode-input"
                            : "lightMode-input"
                        }`}
                        id="basic-addon1"
                        style={{ padding: ".375rem 0 .375rem .5rem" }}
                      >
                        +90
                      </span>
                      <input
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        id="phone"
                        type="text"
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-input"
                            : "lightMode-input"
                        } form-control`}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <small
                      className="text-danger"
                      style={{ fontSize: "0.71rem" }}
                    >
                      {phonelError}
                    </small>
                  </div>
                  <div className="d-flex flex-column m-2">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="password"
                      name=""
                      id="password"
                    />
                    <small
                      className="text-danger"
                      style={{ fontSize: "0.71rem" }}
                    >
                      {passwordlError}
                    </small>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center my-3">
                  <button
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
                    onClick={() => {
                      hadleValidation();
                      // props.setShowModal(2);
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
                        setpasswordError("");
                        setPhoneError("");
                        setGenderError("");
                        setCityError("");
                        setAgeError("");
                        setCheckboxError("");
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
                    <small
                      className="text-danger"
                      style={{ fontSize: "0.71rem" }}
                    >
                      {cityError}
                    </small>
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
                    <small
                      className="text-danger"
                      style={{ fontSize: "0.71rem" }}
                    >
                      {genderError}
                    </small>
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
                    <small
                      className="text-danger"
                      style={{ fontSize: "0.71rem" }}
                    >
                      {ageError}
                    </small>
                  </div>
                </div>
                <div className="text-center">
                  <div className="mt-3">
                    {currentTheme === "dark" ? (
                      <img
                        alt=""
                        src={
                          !selectCheckBox ? CheckBoxDark : CheckBoxSelectDark
                        }
                        style={{ width: "25px", cursor: "pointer" }}
                        className="me-2"
                        onClick={() => setSelectCheckBox(!selectCheckBox)}
                      />
                    ) : (
                      <img
                        src={
                          !selectCheckBox ? CheckBoxLight : CheckBoxSelectLight
                        }
                        style={{ width: "25px", cursor: "pointer" }}
                        className="me-2"
                        onClick={() => setSelectCheckBox(!selectCheckBox)}
                        alt=""
                      />
                    )}
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
                  <small
                    className="text-danger mb-3"
                    style={{ fontSize: "0.71rem" }}
                  >
                    {checkboxError}
                  </small>
                  <div className="d-flex flex-column align-items-center my-4">
                    <button
                      onClick={() => {
                        // props.onHide();
                        // props.setShowModal(6);
                        // handleSignUp();
                        handleSignUp();
                      }}
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
                color: "#0D2A53",
                fontSize: "12px",
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  et est facilisis, malesuada tellus sed, tempor justo. Donec
                  nec enim mauris. Duis auctor arcu et neque malesuada
                  tristique. Sed ac sem nec metus ultrices tincidunt. Aenean id
                  nisl eget odio sollicitudin viverra. Cras quis tellus vel
                  ligula euismod dapibus. Integer eu rutrum eros. Sed efficitur
                  nulla id justo aliquet tempus. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Nulla et est facilisis, malesuada
                  tellus sed, tempor justo. Donec nec enim mauris. Duis auctor
                  arcu et neque malesuada tristique. Sed ac sem nec metus
                  ultrices tincidunt. Aenean id nisl eget odio sollicitudin
                  viverra. Cras quis tellus vel ligula euismod dapibus. Integer
                  eu rutrum eros. Sed efficitur nulla id justo aliquet tempus.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  et Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nulla et est facilisis, malesuada tellus sed, tempor justo.
                  Donec nec enim mauris. Duis auctor arcu et neque malesuada
                  tristique. Sed ac sem nec metus ultrices tincidunt. Aenean id
                  nisl eget odio sollicitudin viverra. Cras quis tellus vel
                  ligula euismod dapibus. Integer eu rutrum eros est facilisis,
                  malesuada tellus sed, tempor justo. Donec nec enim mauris.
                  Duis auctor arcu et neque malesuada tristique. Sed ac sem nec
                  metus ultrices tincidunt. Aenean id nisl eget odio
                  sollicitudin viverra. Cras quis tellus vel ligula euismod
                  dapibus. Integer eu rutrum eros. Sed efficitur nulla id justo
                  aliquet tempus.
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
            <div className="">
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
                    <div className="input-group">
                      <span
                        className={`input-group-text ${
                          currentTheme === "dark"
                            ? "darkMode-input"
                            : "lightMode-input"
                        }`}
                        id="basic-addon1"
                        style={{ padding: ".375rem 0 .375rem .5rem" }}
                      >
                        +90
                      </span>
                      <input
                        onChange={(e) => setuserPhone(e.target.value)}
                        id="phone"
                        type="text"
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-input"
                            : "lightMode-input"
                        } form-control`}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
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
                    onClick={() => {
                      localStorage.setItem("userPhone", userPhone);
                      props.onHide();
                      window.location.reload();
                    }}
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
                    <div className="input-group">
                      <span
                        className={`input-group-text ${
                          currentTheme === "dark"
                            ? "darkMode-input"
                            : "lightMode-input"
                        }`}
                        id="basic-addon1"
                        style={{ padding: ".375rem 0 .375rem .5rem" }}
                      >
                        +90
                      </span>
                      <input
                        id="phone"
                        type="text"
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-input"
                            : "lightMode-input"
                        } form-control`}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center my-4">
                  <button
                    onClick={() => {
                      props.setShowModal(6);
                    }}
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-4 py-1`}
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
            <div className="">
              <div className="m-3 mt-4">
                <div className="d-flex justify-content-center">
                  <span>
                    <RxCross2
                      onClick={()=>{props.onHide();}}
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
                    {/* <span
                      style={{
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}
                    >
                      1:45
                    </span> */}
                    {seconds > 0 && (
                      <span
                        style={{
                          color:
                            currentTheme === "dark" ? "#D2DB08" : "#00659D",
                        }}
                      >
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </span>
                    )}
                  </div>
                  <div className="w-100 d-flex justify-content-center">
                    <OtpInput
                      inputStyle={`${
                        currentTheme === "dark"
                          ? "otpinputdesign-dark-mode"
                          : "otpinputdesign-light-mode"
                      } `}
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span> </span>}
                      renderInput={(props) => <input {...props} />}
                      containerStyle={"otpbox my-2"}
                    />
                  </div>
                  <div className="text-end">
                    <small>Didn't get the code? </small>
                    <span
                    onClick={()=>{setSeconds(30);handleResendOtp()}}
                      style={{
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}
                    >
                      Send Again
                    </span>
                  </div>
                  <small className="text-danger" style={{ fontSize: "0.71rem" }}>{setOtpError}</small>
                </div>
                <div className="d-flex flex-column align-items-center my-4">
                  <button
                    onClick={() => {
                      handleOTPVerification()
                      // props.setShowModal(7);
                    }}
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* End OTP */}

          {/* Password Reset */}
          {props.ShowModal === 7 && (
            <div className="">
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
                    <label htmlFor="Password">New Password</label>
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
                    {showPassword ? (
                      <AiOutlineEyeInvisible
                        fontSize={"1.5rem"}
                        style={{
                          position: "absolute",
                          right: "2.5rem",
                          top: "6.4rem",
                        }}
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <AiOutlineEye
                        fontSize={"1.5rem"}
                        style={{
                          position: "absolute",
                          right: "2.5rem",
                          top: "6.4rem",
                        }}
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center my-4">
                  <button
                    onClick={() => {
                      props.onHide();
                    }}
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
