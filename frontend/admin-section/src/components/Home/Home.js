import React, { useDebugValue, useState } from "react";
import userEdit from "../../assets/user-edit.svg";
import trash from "../../assets/trash.svg";
import "./Home.css";
import { GoSearch } from "react-icons/go";
import CreateUserModal from "../CreateUserModal/CreateUserModal";
import camera from "../../assets/camera-plus.svg";
import upload from "../../assets/upload.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import checkbox from "../../assets/Group 319.svg";
import Selectedcheckbox from "../../assets/Group 320.svg";

const Home = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [profile, setprofile] = useState(false);
  const [showTransactionHistory, setshowTransactionHistory] = useState(1);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Select");
  const [ageDropDown, setAgeDropDown] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Select");

  const [selectCheckBox, setSelectCheckBox] = useState(false);

  const currentUrl = window.location.href;
  const urlObject = new URL(currentUrl);

  const usersPart = urlObject.pathname
    .split("/")
    .filter((part) => part !== "")[0];

  const genderOptions = ["Male", "Female", "I don't want to specify"];
  const ageOptions = ["18 - 24", "25 - 34", "35 - 44", "44+"];
  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const toggleGenderDropdown = () => {
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    setGenderDropDown(!genderDropDown);
  };

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const toggleAgeDropdown = () => {
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    setAgeDropDown(!ageDropDown);
  };
  return (
    <>
      <div
        className="dark-mode p-2 m-2 mb-0 home-height"
        style={{ height: "65vh" }}
      >
        {usersPart === "users" && (
          <div className="d-flex p-2" style={{ fontSize: "1.2rem" }}>
            <div className="p-2 flex-grow-1">
              <div class="input-group w-50">
                <span
                  class="input-group-text search-icon-dark"
                  id="basic-addon1"
                >
                  <GoSearch style={{ color: "#FFFFFF" }} />
                </span>
                <input type="text" className="input-field-dark" />
              </div>
            </div>
            <div className="p-2">
              <button
                className="px-2"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "3px",
                  border: "1px solid #E6E6E6",
                  color: "#E6E6E6",
                }}
              >
                Filter
              </button>
            </div>
            <div className="p-2">
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setModalShow(true)}
                className="px-2"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "3px",
                  border: "1px solid #0CC6FF",
                  color: "#0CC6FF",
                }}
              >
                Add User
              </button>
            </div>
          </div>
        )}
        {props?.users?.map((res, index) => (
          <div
            className="d-flex justify-content-between px-2 py-1 mb-2 users-section-fonts"
            style={{ backgroundColor: "#0B2447", fontSize: "1rem" }}
          >
            <div className="">
              <div className="">
                <span className="pe-1">{res.sr}</span>
                <img src={res.profile} alt="" height={37} width={37} />
                <span className="ps-1">{res.name}</span>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div>{res.username}</div>
              <div className="">
                <img src={res.gender} alt="" height={23} width={23} />
                <span
                  // className="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setprofile(true)}
                >
                  {res.age}
                </span>
              </div>
              <div className="">{res.country}</div>
            </div>
            {usersPart === "users" && (
              <div
                className="d-flex align-items-center block-width"
                style={{ minWidth: "7.5rem" }}
              >
                {res.role ? (
                  <button
                    className="btn-user"
                    style={{
                      textAlign: "center",
                      paddingTop: "0.1rem",
                      width: "7.5rem",
                      color:
                        (res.role === "Journeyman" && "#4DD5FF") ||
                        (res.role === "Expert" && "#FF9100") ||
                        (res.role === "Apprentice" && "#FFEE7D"),
                      border:
                        (res.role === "Journeyman" && "1px solid #4DD5FF") ||
                        (res.role === "Expert" && "1px solid #FF9100") ||
                        (res.role === "Apprentice" && "1px solid #FFEE7D"),
                      borderRadius: "2px",
                      backgroundColor: "transparent",
                    }}
                  >
                    {res.role}
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
            )}
            <div className="d-flex align-items-center gap-2 edit-icon-gap">
              <span>{res.date}</span>
              <img src={userEdit} alt="" height={28} width={28} />
              <img src={trash} alt="" height={28} width={28} />
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
      >
        <div class="modal-dialog modal-dialog-centered">
          {showTransactionHistory === 1 && (
            <div className="modal-content p-2 dark-mode">
              <div className="d-flex justify-content-center position-relative my-2">
                <div
                  className="my-1"
                  style={{
                    backgroundColor: "#E6E6E6",
                    borderRadius: "50%",
                    height: "8rem",
                    width: "8rem",
                  }}
                >
                  <img
                    style={{
                      position: "absolute",
                      top: "2.3rem",
                      left: "13.3rem",
                    }}
                    src={camera}
                    alt=""
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center my-2">
                <span
                  className="px-3 py-2"
                  style={{ backgroundColor: "#0B2447", borderRadius: "2px" }}
                >
                  <label htmlFor="upload">
                    <img
                      className="mb-1"
                      src={upload}
                      alt=""
                      height={20}
                      width={20}
                    />
                  </label>
                  <input type="file" name="" id="upload" className="d-none" />
                  <span className="ps-1">Upload</span>
                </span>
              </div>
              <div className="d-flex justify-content-center">
                {profile ? (
                  <>
                    <div className="d-flex flex-column">
                      <span
                        className="px-3 py-2 text-center"
                        style={{
                          backgroundColor: "#0B2447",
                          borderRadius: "2px",
                        }}
                      >
                        12-02-2023
                      </span>
                      <span className="p-1">Transaction History</span>
                    </div>
                  </>
                ) : (
                  <span
                    className="px-3 py-2"
                    style={{ backgroundColor: "#0B2447", borderRadius: "2px" }}
                  >
                    Membership Date
                  </span>
                )}
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <span>Name Surname</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
                <div className="col d-flex flex-column">
                  <span>Username</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <span>Phone</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
                <div className="col d-flex flex-column">
                  <span>Password</span>
                  <input
                    // style={{-webkit-text-security: square;}}
                    // style={{webkitTextSecurity: "star"}}
                    className="darkMode-input form-control"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      fontSize={"1.5rem"}
                      style={{
                        position: "absolute",
                        right: "1.6rem",
                        top: "23.1rem",
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiOutlineEye
                      fontSize={"1.5rem"}
                      style={{
                        position: "absolute",
                        right: "1.6rem",
                        top: "23.1rem",
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Gender"
                    options={genderOptions}
                    selectedOption={selectedGender}
                    onSelectOption={handleGenderSelection}
                    isOpen={genderDropDown}
                    toggleDropdown={toggleGenderDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
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
              <div className="d-flex" style={{ gap: "4rem" }}>
                <div>Free Subscription</div>
                <div>Free Subscription Limit</div>
              </div>
              <div className="row g-0 d-flex justify-content-between">
                <div className="col-4">
                  <img
                    alt=""
                    src={!selectCheckBox ? checkbox : Selectedcheckbox}
                    style={{ cursor: "pointer" }}
                    height={58}
                    width={55}
                    onClick={() => setSelectCheckBox(!selectCheckBox)}
                  />
                </div>
                <div className="col-8">
                  <div className="row g-0 gap-2">
                    <div className="col">
                      <CustomDropdown
                        options={ageOptions}
                        selectedOption={selectedAge}
                        onSelectOption={handleAgeSelection}
                        isOpen={ageDropDown}
                        toggleDropdown={toggleAgeDropdown}
                      />
                    </div>
                    <div className="col">
                      <CustomDropdown
                        options={ageOptions}
                        selectedOption={selectedAge}
                        onSelectOption={handleAgeSelection}
                        isOpen={ageDropDown}
                        toggleDropdown={toggleAgeDropdown}
                      />
                    </div>
                    <div className="col">
                      <CustomDropdown
                        options={ageOptions}
                        selectedOption={selectedAge}
                        onSelectOption={handleAgeSelection}
                        isOpen={ageDropDown}
                        toggleDropdown={toggleAgeDropdown}
                      />
                    </div>
                  </div>
                </div>
                {profile ? (
                  <div className="my-2 d-flex row g-0 mb-3 gap-4 px-3">
                    <div className="col">
                      <button
                        className="px-3 py-1"
                        style={{
                          color: "#FF5757",
                          backgroundColor: "transparent",
                          border: "1px solid #FF5757",
                          borderRadius: "4px",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="px-3 py-1"
                        style={{
                          color: "#FF9100",
                          backgroundColor: "transparent",
                          border: "1px solid #FF9100",
                          borderRadius: "4px",
                        }}
                      >
                        Deactive
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="px-3 py-1"
                        style={{
                          color: "#D2DB08",
                          backgroundColor: "transparent",
                          border: "1px solid #D2DB08",
                          borderRadius: "4px",
                        }}
                      >
                        Deactive
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="px-3 py-1"
                        style={{
                          color: "#E6E6E6",
                          backgroundColor: "transparent",
                          border: "1px solid #E6E6E6",
                          borderRadius: "4px",
                        }}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="my-2 d-flex justify-content-center">
                    <button
                      className="px-3 py-1"
                      style={{
                        color: "#D2DB0B",
                        backgroundColor: "transparent",
                        border: "1px solid #D2DB0B",
                        borderRadius: "4px",
                      }}
                    >
                      Create
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {showTransactionHistory === 2 && (
            <div className="modal-content p-2 dark-mode">
              <div className=""></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
