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
import { cityOptions } from "./_data";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUpModal = (props) => {
  // THEME
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [selectCheckBox, setSelectCheckBox] = useState(false);

  const [countryDropDown, setCountryDropDown] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState("Turkey");
  const [cityDropDown, setCityDropDown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select");
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Select");
  const [ageDropDown, setAgeDropDown] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Select");
  const [btnLoading, setbtnLoading] = useState(false);

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

  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    country: "",
    city: "",
    gender: "",
    age: "",
  });
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
      // country: selectedCountry,
      city: selectedCity,
      gender: selectedGender,
      age: selectedAge,
    });
  }, [
    name,
    username,
    phone,
    password,
    // selectedCountry,
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
      setbtnLoading(true);
      setCityError("");
      setGenderError("");
      setAgeError("");
      setCheckboxError("");
      setSignUpData({
        name: name,
        username: username,
        phone: phone,
        password: password,
        country: "Turkey",
        city: selectedCity,
        gender: selectedGender,
        age: selectedAge,
      });
      const response = await axios.post(`${config.apiUrl}/signup/`, signUpData);
      // console.log("response8: ", response.data);
      // console.log("response: ", response.data.user);
      if (response.data.status === 200) {
        setShowModal(6);
        setbtnLoading(false);
        setSelectedCity("Select")
        setSelectedGender("Select")
        setSelectedAge("Select")
        setSelectCheckBox(false)
      } else if (response.data.status === 400) {
        setuserExists(response.data?.data);
        setbtnLoading(false);
        setShowModal(2);
      } else if (response.data.status === 500) {
        setShowModal(2);
        setbtnLoading(false);
        Swal.fire({
          title: "Error",
          text: response.data.error,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
    }
  };

  // const handleCountrySelection = (country) => {
  //   setSelectedCountry(country);
  // };

  // const toggleCountryDropdown = () => {
  //   if (cityDropDown) {
  //     setCityDropDown(false);
  //   }
  //   if (genderDropDown) {
  //     setGenderDropDown(false);
  //   }
  //   if (ageDropDown) {
  //     setAgeDropDown(false);
  //   }
  //   setCountryDropDown(!countryDropDown);
  // };

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

  const genderOptions = ["Male", "Female", "I don't want to specify"];
  const ageOptions = ["18 - 24", "25 - 34", "35 - 44", "44+"];

  const [forgotPsPhone, setForgotPsPhone] = useState("");
  // console.log(forgotPsPhone,"========")

  // ===================================== UPDATE CODE ====================================================
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(5, "Name must be at least 5 characters")
      .max(20, "Name must be at most 20 characters"),
    username: Yup.string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters")
      .max(15, "Username must be at most 15 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^5\d*$/, "Phone must start with '5' and contain only digits")
      .min(10, "Phone must be 10 digits")
      .max(10, "Phone must be 10 digits"),
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
    onSubmit: async (values) => {
      setbtnLoading(true);
      try {
        const res = await axios.post(`${config.apiUrl}/signup-user-exists/`, {
          phone: values.phone,
          username: values.username,
        });
        if (res.data.status === 400) {
          setbtnLoading(false);
          setuserExists(res.data?.data);
        } else if (res.data.status === 200) {
          formik.resetForm()
          setShowModal(2);
          setuserExists("");
          setName(values.name);
          setUsername(values.username);
          setPassword(values.password);
          setPhone(values.phone);
          setbtnLoading(false);
        }

        // .then((res) => {
        //   console.log(res);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
      } catch (error) {
        setbtnLoading(false);
      }
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
                  <div className="text-danger text-center text-capitalize">
                    {userExists}
                  </div>
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
                        onChange={(e) => setUsername(e.target.value)}
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
                          onChange={(e) => setPhone(e.target.value)}
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
                    <div className="d-flex flex-column m-2 position-relative">
                      <label htmlFor="password">Password</label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type={`${showPassword ? "text" : "password"}`}
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
                      {showPassword ? (
                        <AiOutlineEyeInvisible
                          fontSize={"1.5rem"}
                          style={{
                            position: "absolute",
                            right: ".5rem",
                            top: "1.7rem",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <AiOutlineEye
                          fontSize={"1.5rem"}
                          style={{
                            position: "absolute",
                            right: ".5rem",
                            top: "1.7rem",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
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
                        {btnLoading ? "Loading…" : "Continue"}
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
              <div className="my-4 mx-3">
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
                    {/* <CustomDropdown
                      label="Country"
                      options={countryOptions}
                      selectedOption={selectedCountry}
                      onSelectOption={handleCountrySelection}
                      isOpen={countryDropDown}
                      toggleDropdown={toggleCountryDropdown}
                    /> */}
                    <label htmlFor="name">Country</label>
                    <input
                      value="Turkey"
                      id="country"
                      type="text"
                      className={`${
                        currentTheme === "dark"
                          ? "darkMode-input"
                          : "lightMode-input"
                      } form-control text-center p-1 `}
                      style={{
                        fontSize: "14px",
                      }}
                      disabled
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
                  <div className="mt-3" style={{fontSize: "13px"}}>
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
                      {btnLoading ? "Loading…" : "Continue"}
                    </button>
                    <div className="mt-4">
                      Already Account?{" "}
                      <sapn
                        style={{
                          color:
                            currentTheme === "dark" ? "#D2DB08" : "#00659D",
                        }}
                        onClick={() => {
                          setShowModal(4);
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
            <OTPModal
              hide={props.onHide}
              phone={phone}
              signUpData={signUpData}
              forgotPsPhone={forgotPsPhone}
            />
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
