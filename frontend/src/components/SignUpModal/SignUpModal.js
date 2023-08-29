import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./SignUpModal.css";
import facebook from "../../assets/FacebookLogo.png";
import google from "../../assets/googleLogo.png";
import { RxCross2 } from "react-icons/rx";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";
import CheckBoxSelectDark from "../../assets/Checkbox Selected.svg";
import CheckBoxDark from "../../assets/Checkbox Unselected.svg";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import SignInModal from "../SignInModal/SignInModal";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import OTPModal from "../OTPModal/OTPModal";
import PasswordReset from "../PasswordReset/PasswordReset";
import TermsOfUse from "../TermsOfUse/TermsOfUse";
import GoogleLogin from "../GoogleLogin";
import FacebookLogin from "../FacebookLogin";
import { useFormik } from "formik";
import * as Yup from "yup";
import config from "../../config";

const SignUpModal = (props) => {
  // THEME
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);

  const [password, setPassword] = useState("");

  const [selectCheckBox, setSelectCheckBox] = useState(false);

  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Turkey");
  const [cityDropDown, setCityDropDown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select");
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Select");
  const [ageDropDown, setAgeDropDown] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Select");

  // SIGN UP API --------------------------------------------------

  const [phone, setPhone] = useState("");
  const [nameError, setNamerror] = useState("");
  const [usernameError, setUsernamerror] = useState("");
  const [phonelError, setPhoneError] = useState("");
  const [cityError, setCityError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");

  const [passwordlError, setpasswordError] = useState("");
  const passwordReg = /^(?=.*\d)(?=.*[a-z])[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{8,}$/;
  const phonReg = /^\d{10}$/;

  const [signUpData, setSignUpData] = useState({name: '',
    username: '',
    phone: '',
    password: '',
    country: '',
    city: '',
    gender: '',
    age: '',});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const hadleValidation = () => {
    // console.log("nnnnnn");
    if (name === "") {
      setNamerror("Please enter your name");
    } else if (username === "") {
      setNamerror("");
      setUsernamerror("Please enter your username");
    } else if (!phonReg.test(phone)) {
      setUsernamerror("");
      setPhoneError("Invalid phone number");
    } else if (!passwordReg.test(password)) {
      setPhoneError("");
      setpasswordError(
        "Password should contain atleast one number and one special character"
      );
    } else {
      setShowModal(2);
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

  const [userExists, setuserExists] = useState("");

  const handleSignUp = async () => {
    if (selectedCity === "Select") {
      setCityError("Please select your city.");
    }
    if (selectedGender === "Select") {
      setGenderError("Please select your gender.");
    }
    if (selectedAge === "Select") {
      setAgeError("Please select your age.");
    }
    if (!selectCheckBox) {
      setCheckboxError("Please select the checkbox to proceed.");
    } else {
      setCityError("");
      setGenderError("");
      setAgeError("");
      setCheckboxError("");
      setSignUpData({
        name : name,
        username : username,
        phone : phone,
        password : password,
        country: selectedCountry,
        city: selectedCity,
        gender: selectedGender,
        age: selectedAge,
      })
      const response = await axios.post(
        `${config.apiUrl}/signup/`,
        signUpData
      );
      console.log("response: ", response.data);
      console.log("response: ", response.data.user);
      if (response.data.status === 200) {
        localStorage.setItem("user-role", response.data.user.user_role);
        localStorage.setItem("user-id", response.data.user.id);
        window.location.reload();
        // props.onHide();
      } else if (response.data.status === 400) {
        setuserExists(response.data?.data);
      }
    }
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
    setCityError("");
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
    setGenderError("");
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
    setAgeError("");
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

  const [forgotPsPhone, setForgotPsPhone] = useState("");

  // ===================================== UPDATE CODE ====================================================
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Phone must be 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setShowModal(2);
      setName(values.name);
      setUsername(values.username);
      setPassword(values.password);
      setPhone(values.phone);
    },
  });

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
          {ShowModal === 1 && (
            <div>
              {/* <div className="m-2">
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
                      onChange={(e) => setName(e.target.value)}
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="text"
                      name="name"
                      id="name"
                    />
                    <small
                      className="text-danger"
                      style={{ fontSize: "0.71rem" }}
                    >
                      {nameError}
                    </small>
                  </div>
                  <div className="d-flex flex-column m-2">
                    <label htmlFor="username">Username</label>
                    <input
                      required
                      onChange={(e) => setUsername(e.target.value)}
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control`}
                      type="text"
                      name="username"
                      id="username"
                    />
                    <small
                      className="text-danger"
                      style={{ fontSize: "0.71rem" }}
                    >
                      {usernameError}
                    </small>
                  </div>
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
                    }}
                  >
                    Continue
                  </button>
                  <div className="text-center my-3">
                    --------------------- or ---------------------{" "}
                  </div>
                  <div className="d-flex">
                    <GoogleLogin />
                    <FacebookLogin />
                  </div>
                  <div className="mt-3">
                    Already Account?{" "}
                    <span
                      style={{
                        color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      }}
                      onClick={() => {
                        setShowModal(4);
                      }}
                    >
                      Sign In
                    </span>
                  </div>
                </div>
              </div> */}
              <div className="m-2">
                <div className="d-flex justify-content-center">
                  <span>SIGN UP</span>
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
                  <form onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-column m-2">
                      <label htmlFor="name">Name Surname</label>
                      <input
                        // value={name}
                        // onChange={(e)=>{setName(e.target.value); console.log(e.target.value,"=>>>>>");}}
                        id="name"
                        type="text"
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-input"
                            : "lightMode-input"
                        } form-control`}
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <small className="text-danger">
                          {formik.errors.name}
                        </small>
                      ) : null}
                    </div>
                    <div className="d-flex flex-column m-2">
                      <label htmlFor="username">Username</label>
                      <input
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        id="username"
                        type="text"
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-input"
                            : "lightMode-input"
                        } form-control`}
                        {...formik.getFieldProps("username")}
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <small className="text-danger">
                          {formik.errors.username}
                        </small>
                      ) : null}
                    </div>
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
                          value={phone}
                          onChange={(e)=>setPhone(e.target.value)}
                          id="phone"
                          type="text"
                          className={`${
                            currentTheme === "dark"
                              ? "darkMode-input"
                              : "lightMode-input"
                          } form-control`}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          {...formik.getFieldProps("phone")}
                        />
                      </div>
                      {formik.touched.phone && formik.errors.phone ? (
                        <small className="text-danger">
                          {formik.errors.phone}
                        </small>
                      ) : null}
                    </div>
                    <div className="d-flex flex-column m-2">
                      <label htmlFor="password">Password</label>
                      <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        id="password"
                        type="password"
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-input"
                            : "lightMode-input"
                        } form-control`}
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <small className="text-danger">
                          {formik.errors.password}
                        </small>
                      ) : null}
                    </div>
                    <div className="d-flex flex-column align-items-center my-3">
                      <button
                        type="submit"
                        className={`${
                          currentTheme === "dark"
                            ? "darkMode-btn"
                            : "lightMode-btn"
                        } px-3 py-1`}
                      >
                        Continue
                      </button>
                      <div className="text-center my-3">
                        --------------------- or ---------------------
                      </div>
                      <div className="d-flex">
                        <GoogleLogin />
                        <FacebookLogin />
                      </div>
                      <div className="mt-3">
                        Already have an account?{" "}
                        <span
                          style={{
                            color:
                              currentTheme === "dark" ? "#D2DB08" : "#00659D",
                          }}
                          onClick={() => {
                            setShowModal(4);
                          }}
                        >
                          Sign In
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {ShowModal === 2 && (
            <div
              className={`${
                currentTheme === "dark" ? "darkMode" : "lightMode"
              }`}
            >
              <div className="m-4">
                <div className="text-danger text-center text-capitalize">
                  {userExists}
                </div>
                <div
                  className="d-flex justify-content-between m-2"
                  style={{ fontWeight: "500", color: "#0D2A53" }}
                >
                  <span>
                    <i
                      onClick={() => setShowModal(1)}
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
                        setShowModal(3);
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

          {ShowModal === 3 && <TermsOfUse hide={props.onHide} />}

          {ShowModal === 4 && <SignInModal hide={props.onHide} />}

          {ShowModal === 5 && (
            <ForgotPassword
              setForgotPsPhone={setForgotPsPhone}
              hide={props.onHide}
            />
          )}

          {ShowModal === 6 && (
            <OTPModal hide={props.onHide} forgotPsPhone={forgotPsPhone} />
          )}

          {ShowModal === 7 && (
            <PasswordReset hide={props.onHide} forgotPsPhone={forgotPsPhone} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
