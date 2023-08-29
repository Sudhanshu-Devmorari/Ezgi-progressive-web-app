import React, { useEffect, useDebugValue, useState } from "react";
import userEdit from "../../assets/user-edit.svg";
import trash from "../../assets/trash.svg";
import "./Home.css";
import gender_female from "../../assets/gender-female.png";
import gender_male from "../../assets/gender-male.png";
import { GoSearch } from "react-icons/go";
import { BiSolidCrown } from "react-icons/bi";
import camera from "../../assets/camera-plus.svg";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";
import user from "../../assets/user1.png";
import user1 from "../../assets/user3.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import checkbox from "../../assets/Group 319.svg";
import Selectedcheckbox from "../../assets/Group 320.svg";
import moment from "moment";
import axios from "axios";
import { MainDiv } from "../CommonBgRow";
import config from "../../config";
import initialProfile from "../../assets/profile.png";

import Swal from "sweetalert2";
import { CustomDropdownHome } from "../CustomDropdownHome/CustomDropdownHome";

const Home = (props) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    // console.log(":::::::: ", file?.path);
  };
  const handleDeactive = async (id) => {
    try {
      const res = await axios.delete(
        `${config?.apiUrl}/user-management/${id}/`
      );
      if (res.status === 200) {
        props?.adminHomeApiData();
        Swal.fire({
          title: "Success",
          text: "User profile Delete sucessfully.",
          icon: "success",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const [addUser, setAddUser] = useState({});
  const submitUserData = (e) => {
    let name, value;

    name = e.target.name;

    value = e.target.value;

    setAddUser({ ...addUser, [name]: value });
  };
  const [cities, setCities] = useState([]);

  const cityApiData1 = async () => {
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_NOISYAPIKEY}`,
    };
    try {
      const res = await axios.get(
        "https://www.nosyapi.com/apiv2/bets/getMatchesCountryList?type=1",
        { headers }
      );
      const cityData = res?.data.data.map((item) => item.country);
      return cityData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const cityApiData2 = async () => {
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_NOISYAPIKEY}`,
    };
    try {
      const res = await axios.get(
        "https://www.nosyapi.com/apiv2/bets/getMatchesCountryList?type=2",
        { headers }
      );
      const cityData = res?.data.data.map((item) => item.country);
      return cityData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data1 = await cityApiData1();
      const data2 = await cityApiData2();
      const combinedCities = [...data1, ...data2];
      setCities(combinedCities);
    };

    fetchData();
  }, []);

  const [displayUser, setDisplayUser] = useState(props?.users);

  // const [displayUser, setDisplayUser] = useState(props?.users);

  const [userData, setUserData] = useState([]);
  const handleShow = async () => {
    try {
      const response = await axios.post(
        `${config?.apiUrl}/filter-user-management/`,
        {
          user_type: selectedUserTypeFilter,
          city: selectedCityFilter,
          gender: selectedGenderFilter,
          age: selectedAgeFilter,
        }
      );
      setDisplayUser(response.data);
      // console.log('API Response:', response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const [displaySelectedImg, setdisplaySelectedImg] = useState(false);
  const [preveiwProfile, setPreveiwProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(false);

  function handleAddProfilePic(e) {
    const imageFile = e.target.files[0];
    setPreveiwProfile(URL.createObjectURL(imageFile));
    setPreveiwProfilePic(URL.createObjectURL(imageFile));
    setSelectedImage(imageFile);
  }

  const handleAddUser = async () => {
    const formData = new FormData();
    selectedImage != false && formData.append("file", selectedImage);
    // formData.append("date", addUser.date);
    formData.append("name", addUser.name);
    formData.append("username", addUser.username);
    formData.append("phone", addUser.phone);
    formData.append("password", addUser.password);
    formData.append("gender", addUser.gender);
    formData.append("age", addUser.age);
    formData.append("subscription", addUser.subscription);
    formData.append("duration", addUser.duration);
    // formData.append("month", addUser.month);
    formData.append("level", addUser.level);
    try {
      const response = await axios.post(
        `${config?.apiUrl}/user-management/`,
        formData
      );
      props?.userManagementApiData();
      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const handleUpdateUser = async (id) => {
    // console.log("::::::::", addUser);
    const formData = new FormData();
    selectedImage != false && formData.append("profile_pic", selectedImage);
    // formData.append("date", addUser.date);
    formData.append("name", addUser.name);
    formData.append("username", addUser.username);
    formData.append("phone", addUser.phone);
    formData.append("password", addUser.password);
    formData.append("gender", addUser.gender);
    formData.append("age", addUser.age);
    formData.append("subscription", addUser.subscription);
    formData.append("duration", addUser.duration);
    // formData.append("month", addUser.month);
    formData.append("level", addUser.level);
    try {
      const response = await axios.patch(
        `${config?.apiUrl}/user-management/${id}/`,
        formData
      );

      console.log("API Response:", response);
      if (response.status === 200) {
        props?.adminHomeApiData();
        Swal.fire({
          title: "Success",
          text: "User Updated!",
          icon: "success",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const handleduration = (name, value) => {
    setSelectedMonth(value);
    setAddUser({ ...addUser, [name]: value });
  };
  const handleNumber = (name, value) => {
    setSelectedNumber(value);
    setAddUser({ ...addUser, [name]: value });
  };
  const handleLevel = (name, value) => {
    setSelectedLevel(value);
    setAddUser({ ...addUser, [name]: value });
  };

  // console.log("Cities:", cities);

  const server_url = `${config?.apiUrl}`;
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
  const handleGenderSelection = (name, value) => {
    setSelectedGender(value);
    setAddUser({ ...addUser, [name]: value });
  };

  const toggleGenderDropdown = () => {
    setAgeDropDown(false);
    setLevelDropDown(false);
    setMonthDropDown(false);
    setNumberDropDown(false);
    setGenderDropDown(!genderDropDown);
  };

  const handleAgeSelection = (name, value) => {
    setSelectedAge(value);
    setAddUser({ ...addUser, [name]: value });
  };

  const toggleAgeDropdown = () => {
    setLevelDropDown(false);
    setMonthDropDown(false);
    setNumberDropDown(false);
    setGenderDropDown(false);
    setAgeDropDown(!ageDropDown);
  };

  const transactionHistoryArray = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
  ];

  const UserTypeOptions = ["Standard", "Commentator", "Sub_User"];
  const cityOptions = [
    "Istanbul",
    "Ankara",
    "Izmir",
    "Bursa",
    "Antalya",
    "Adana",
    "Gaziantep",
    "Konya",
    "Kayseri",
    "Mersin",
    "Diyarbakir",
    "Eskisehir",
    "Sakarya",
    "Denizli",
    "Samsun",
  ];
  const GenderFilterOptions = ["Male", "Female", "I don't want to specify"];
  const ageFilterOptions = ["18 - 24", "25 - 34", "35 - 44", "44+"];
  const [selectedGenderFilter, setSelectedGenderFilter] = useState("Select");
  const [genderFilterDropDown, setGenderFilterDropDown] = useState(false);

  const [selectedCityFilter, setSelectedCityFilter] = useState("Select");
  const [cityFilterDropDown, setCityFilterDropDown] = useState(false);

  const [selectedAgeFilter, setSelectedAgeFilter] = useState("Select");
  const [ageFilterDropDown, setAgeFilterDropDown] = useState(false);

  const [selectedUserTypeFilter, setSelectedUserTypeFilter] =
    useState("Select");
  const [userTypeFilterDropDown, setUserTypeFilterDropDown] = useState(false);

  // console.log("diaplay: ", displayUser)
  // console.log("users: ", props?.users)

  useEffect(() => {
    setDisplayUser(props.users);
  }, [props.users]);

  const handleUserTypeFilterSelection = (gender) => {
    setSelectedUserTypeFilter(gender);
  };
  const toggleUserTypeDropdown = () => {
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    setUserTypeFilterDropDown(!userTypeFilterDropDown);
  };
  const handleCityFilterSelection = (gender) => {
    setSelectedCityFilter(gender);
  };
  const toggleCityFilterDropdown = () => {
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (userTypeFilterDropDown) {
      setUserTypeFilterDropDown(false);
    }
    setCityFilterDropDown(!cityFilterDropDown);
  };
  const handleGenderFilterSelection = (gender) => {
    setSelectedGenderFilter(gender);
  };
  const toggleGenderFilterDropdown = () => {
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (userTypeFilterDropDown) {
      setUserTypeFilterDropDown(false);
    }
    setGenderFilterDropDown(!genderFilterDropDown);
  };
  const handleAgeFilterSelection = (gender) => {
    setSelectedAgeFilter(gender);
  };
  const toggleAgeFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (userTypeFilterDropDown) {
      setUserTypeFilterDropDown(false);
    }
    setAgeFilterDropDown(!ageFilterDropDown);
  };

  const filterData = (e) => {
    const val = e.target.value.toLowerCase();
    const filteredArray = props.users.filter(
      (obj) =>
        obj?.name?.toLowerCase().startsWith(val) ||
        obj?.username?.toLowerCase().startsWith(val) ||
        obj?.username?.toLowerCase().includes(val) ||
        obj?.name?.toLowerCase().includes(val)
    );
    setDisplayUser(filteredArray);
  };
  const monthOptions = ["1 Month", "3 Month", "6 Month"];
  const [selectedMonth, setSelectedMonth] = useState("Select");
  const [monthDropDown, setMonthDropDown] = useState(false);

  const numberOptions = [1, 3, 5];
  const [selectedNumber, setSelectedNumber] = useState("Select");
  const [numberDropDown, setNumberDropDown] = useState(false);

  const levelOptions = ["Journeyman", "Expert", "Grandmaster"];
  const [selectedLevel, setSelectedLevel] = useState("Select");
  const [levelDropDown, setLevelDropDown] = useState(false);

  const toggleMonthDropdown = () => {
    setGenderDropDown(false);
    setAgeDropDown(false);
    setNumberDropDown(false);
    setLevelDropDown(false);
    setMonthDropDown(!monthDropDown);
  };
  const toggleNumberDropdown = () => {
    setGenderDropDown(false);
    setAgeDropDown(false);
    setLevelDropDown(false);
    setMonthDropDown(false);
    setNumberDropDown(!numberDropDown);
  };
  const toggleLevelDropdown = () => {
    setGenderDropDown(false);
    setAgeDropDown(false);
    setMonthDropDown(false);
    setNumberDropDown(false);
    setLevelDropDown(!levelDropDown);
  };

  const [preveiwProfilePic, setPreveiwProfilePic] = useState(null);
  function handleAddProfile(e) {
    const imageFile = e.target.files[0];
    setPreveiwProfilePic(URL.createObjectURL(imageFile));
  }
  return (
    <>
      <div className="dark-mode p-2 m-2 mb-0 home-height pt-3">
        {usersPart === "users" && (
          <div className="d-flex p-2">
            <div className="p-2 flex-grow-1">
              <div class="input-group w-50">
                <span
                  class="input-group-text search-icon-dark"
                  id="basic-addon1"
                >
                  <GoSearch style={{ color: "#FFFFFF" }} />
                </span>
                <input
                  onChange={filterData}
                  type="text"
                  className="input-field-dark"
                />
              </div>
            </div>
            <div className="p-2">
              <button
                data-bs-toggle="modal"
                data-bs-target="#filterModal"
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
        {displayUser
          ?.slice()
          .reverse()
          .map((res, index) => (
            <MainDiv key={index}>
              <div className="col">
                <span className="pe-1">{`# ${res?.id
                  .toString()
                  .padStart(4, "0")}`}</span>
                <img
                  src={`${
                    res?.profile_pic
                      ? server_url + res?.profile_pic
                      : initialProfile
                  }`}
                  className="rounded-circle"
                  alt=""
                  height={42}
                  width={42}
                />
                <span className="ps-1">{res?.name}</span>
              </div>
              <div className="d-flex gap-2 align-items-center col ">
                <div>{res?.username?.trim()}</div>
                <div className="">
                  {res.gender == "Male" && (
                    <img src={gender_male} alt="" height={22} width={22} />
                  )}
                  {res.gender == "Female" && (
                    <img src={gender_female} alt="" height={22} width={22} />
                  )}
                  <span

                  // data-bs-toggle="modal"
                  // data-bs-target="#exampleModal"
                  // onClick={() => {
                  //   setprofile(true);
                  //   setUserData(res);
                  //   setAddUser(res);
                  //   setPreveiwProfilePic(true);
                  // }}
                  >
                    {res.age}
                  </span>
                </div>
                <div className="">{res.country?.trim()}</div>
              </div>
              {usersPart === "users" && (
                <div
                  className="d-flex align-items-center block-width col justify-content-center"
                  style={{ minWidth: "7.5rem" }}
                >
                  {(res.commentator_level && res.commentator_level !== "undefined") ? (
                    <button
                      className="btn-user"
                      style={{
                        textAlign: "center",
                        paddingTop: "0.1rem",
                        width: "7.5rem",
                        color:
                          (res.commentator_level === "journeyman" &&
                            "#4DD5FF") ||
                          (res.commentator_level === "master" && "#03fc77") ||
                          (res.commentator_level === "grandmaster" &&
                            "#FF9100") ||
                          (res.commentator_level === "apprentice" && "#FFEE7D"),
                        border:
                          (res.commentator_level === "journeyman" &&
                            "1px solid #4DD5FF") ||
                          (res.commentator_level === "master" &&
                            "1px solid #03fc77") ||
                          (res.commentator_level === "grandmaster" &&
                            "1px solid #FF9100") ||
                          (res.commentator_level === "apprentice" &&
                            "1px solid #FFEE7D"),
                        borderRadius: "2px",
                        backgroundColor: "transparent",
                      }}
                    >
                      {res.commentator_level.charAt(0).toUpperCase() +
                        res.commentator_level.slice(1).toLowerCase()}
                    </button>
                  ) : (
                    <span></span>
                  )}
                </div>
              )}
              <div className="d-flex align-items-center justify-content-end gap-2 edit-icon-gap col">
                <span>{moment(res.created).format("DD-MM.YYYY - HH:mm")}</span>
                <img
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    setprofile(true);
                    setUserData(res);
                    setAddUser(res);
                    setPreveiwProfilePic(true);
                  }}
                  className="cursor"
                  src={userEdit}
                  alt=""
                  height={25}
                  width={25}
                />
                <img
                  onClick={() => handleDeactive(res.id)}
                  className="cursor"
                  src={trash}
                  alt=""
                  height={25}
                  width={25}
                />
              </div>
            </MainDiv>
          ))}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
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
                    display: preveiwProfilePic === null ? "block" : "none",
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
                {/* {console.log("********", preveiwProfilePic)} */}
                {profile ? (
                  <img
                    src={server_url + addUser.profile_pic}
                    alt=""
                    height={135}
                    width={135}
                    style={{
                      display: preveiwProfilePic !== null ? "block" : "none",
                      objectFit: "cover",
                      borderRadius: "50%  ",
                    }}
                  />
                ) : (
                  <>
                    <img
                      src={preveiwProfilePic}
                      alt=""
                      height={135}
                      width={135}
                      style={{
                        display: preveiwProfilePic !== null ? "block" : "none",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </>
                )}
              </div>
              <div className="d-flex justify-content-center my-2">
                <label htmlFor="upload">
                  <span
                    className="px-3 py-2 cursor"
                    style={{ backgroundColor: "#0B2447", borderRadius: "2px" }}
                  >
                    <img
                      className="mb-1"
                      src={upload}
                      alt=""
                      height={20}
                      width={20}
                    />
                    <input
                      onChange={(e) => {
                        handleAddProfile(e);
                        handleAddProfilePic(e);
                      }}
                      type="file"
                      name=""
                      id="upload"
                      className="d-none"
                    />
                    <span className="ps-1">Upload</span>
                  </span>
                </label>
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
                      <span
                        onClick={() => setshowTransactionHistory(2)}
                        className="p-1"
                      >
                        Transaction History
                      </span>
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
                  <input
                    onChange={submitUserData}
                    name="name"
                    value={addUser.name}
                    type="text"
                    className="darkMode-input form-control"
                  />
                </div>
                <div className="col d-flex flex-column">
                  <span>Username</span>
                  <input
                    onChange={submitUserData}
                    name="username"
                    value={addUser.username}
                    type="text"
                    className="darkMode-input form-control"
                  />
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <span>Phone</span>
                  <div class="input-group">
                    <span
                      class="input-group-text darkMode-input"
                      id="basic-addon1"
                      style={{ padding: ".375rem 0 .375rem .5rem" }}
                    >
                      +90
                    </span>
                    <input
                      onChange={submitUserData}
                      name="phone"
                      value={addUser.phone}
                      type="text"
                      class="form-control darkMode-input"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col d-flex flex-column">
                  <span>Password</span>
                  <input
                    onChange={submitUserData}
                    name="password"
                    value={addUser.password}
                    // style={{-webkit-text-security: square;}}
                    // style={{webkitTextSecurity: "star"}}
                    className="darkMode-input form-control"
                    type={showPassword ? "text" : "password"}
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                  {profile ? (
                    <>
                      {showPassword ? (
                        <AiOutlineEyeInvisible
                          fontSize={"1.5rem"}
                          style={{
                            position: "absolute",
                            right: "1.6rem",
                            top: "24.1rem",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <AiOutlineEye
                          fontSize={"1.5rem"}
                          style={{
                            position: "absolute",
                            right: "1.6rem",
                            top: "24.1rem",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {showPassword ? (
                        <AiOutlineEyeInvisible
                          fontSize={"1.5rem"}
                          style={{
                            position: "absolute",
                            right: "1.6rem",
                            top: "22.1rem",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <AiOutlineEye
                          fontSize={"1.5rem"}
                          style={{
                            position: "absolute",
                            right: "1.6rem",
                            top: "22.1rem",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdownHome
                    onChange={submitUserData}
                    name="gender"
                    value={addUser.selectedGender}
                    label="Gender"
                    options={genderOptions}
                    selectedOption={
                      addUser.gender ? addUser.gender : selectedGender
                    }
                    onSelectOption={handleGenderSelection}
                    isOpen={genderDropDown}
                    toggleDropdown={toggleGenderDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  <CustomDropdownHome
                    onChange={submitUserData}
                    name="age"
                    value={addUser.selectedAge}
                    label="Age"
                    options={ageOptions}
                    selectedOption={addUser.age ? addUser.age : selectedAge}
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
                    name="subscription"
                    value={addUser.selectCheckBox}
                    onClick={() => {
                      setSelectCheckBox(!selectCheckBox);
                      setAddUser({
                        ...addUser,
                        subscription:
                          !selectCheckBox == true ? "True" : "False",
                      });
                    }}
                  />
                </div>
                <div className="col-8">
                  <div className="row g-0 gap-2">
                    <div className="col">
                      <CustomDropdown
                        onChange={submitUserData}
                        name="duration"
                        value={
                          userData ? userData?.duration : addUser.selectedMonth
                        }
                        label=" "
                        options={monthOptions}
                        selectedOption={selectedMonth}
                        onSelectOption={handleduration}
                        isOpen={monthDropDown}
                        toggleDropdown={toggleMonthDropdown}
                      />
                    </div>
                    <div className="col">
                      <CustomDropdown
                        onChange={submitUserData}
                        name="month"
                        value={
                          userData ? userData?.duration : addUser.selectedNumber
                        }
                        label=" "
                        options={numberOptions}
                        selectedOption={selectedNumber}
                        onSelectOption={handleNumber}
                        isOpen={numberDropDown}
                        toggleDropdown={toggleNumberDropdown}
                      />
                    </div>
                    <div className="col">
                      <CustomDropdown
                        onChange={submitUserData}
                        name="level"
                        value={
                          userData
                            ? userData?.commentator_level
                            : addUser.selectedLevel
                        }
                        label=" "
                        options={levelOptions}
                        selectedOption={selectedLevel}
                        onSelectOption={handleLevel}
                        isOpen={levelDropDown}
                        toggleDropdown={toggleLevelDropdown}
                      />
                    </div>
                  </div>
                </div>
                {profile ? (
                  <div className="my-2 d-flex row g-0 mb-3 gap-4 px-3">
                    <div className="col">
                      <button
                        onClick={() => {
                          setAddUser({
                            name: "",
                            username: "",
                            phone: "",
                            password: "",
                            gender: "",
                            age: "",
                          });
                          setprofile(false);
                          setPreveiwProfilePic(null);
                        }}
                        data-bs-dismiss="modal"
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
                        onClick={() => {
                          handleUpdateUser(userData?.id);
                          setAddUser({
                            name: "",
                            username: "",
                            phone: "",
                            password: "",
                            gender: "",
                            age: "",
                          });
                          setprofile(false);
                          setPreveiwProfilePic(null);
                        }}
                        data-bs-dismiss="modal"
                        className="px-3 py-1"
                        style={{
                          color: "#FF9100",
                          backgroundColor: "transparent",
                          border: "1px solid #FF9100",
                          borderRadius: "4px",
                        }}
                      >
                        Update
                      </button>
                    </div>
                    <div className="col">
                      <button
                        onClick={() => {
                          handleDeactive(userData?.id);
                          setAddUser({
                            name: "",
                            username: "",
                            phone: "",
                            password: "",
                            gender: "",
                            age: "",
                          });
                          setprofile(false);
                          setPreveiwProfilePic(null);
                        }}
                        data-bs-dismiss="modal"
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
                        onClick={() => {
                          setAddUser({
                            name: "",
                            username: "",
                            phone: "",
                            password: "",
                            gender: "",
                            age: "",
                          });
                          setprofile(false);
                          setPreveiwProfilePic(null);
                        }}
                        data-bs-dismiss="modal"
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
                      data-bs-dismiss="modal"
                      onClick={() => {
                        handleAddUser();
                        // props.onHide();
                      }}
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

              <img
                onClick={() => {
                  setAddUser({
                    name: "",
                    username: "",
                    phone: "",
                    password: "",
                    gender: "",
                    age: "",
                  });
                  setprofile(false);
                  setPreveiwProfilePic(null);
                }}
                data-bs-dismiss="modal"
                src={cross}
                alt=""
                style={{
                  position: "absolute",
                  top: "-1rem",
                  right: "-1.1rem",
                  cursor: "pointer",
                }}
                height={45}
                width={45}
              />
            </div>
          )}
          {showTransactionHistory === 2 && (
            <div className="modal-content p-2 dark-mode position-relative">
              <div className="p-1">
                <i
                  onClick={() => setshowTransactionHistory(1)}
                  className="fa-solid fa-arrow-left-long"
                  style={{
                    fontSize: "21px",
                    color: "#E6E6E6",
                  }}
                ></i>
              </div>
              <div className="row g-0">
                <div className="col d-flex text-center justify-content-center align-items-center">
                  <div className="d-flex flex-column">
                    <span>Subscriptions</span>
                    <span>23</span>
                  </div>
                </div>
                <div className="col d-flex justify-content-center text-center">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={user} alt="" height={80} width={80} />
                    <span className="p-2">Transaction History</span>
                  </div>
                </div>
                <div className="col d-flex text-center justify-content-center align-items-center">
                  <div className="d-flex flex-column">
                    <span>Following</span>
                    <span>197</span>
                  </div>
                </div>
              </div>
              <div className="" style={{ overflowY: "scroll" }}>
                {transactionHistoryArray.map((res, key) => (
                  <div className="row g-0 my-2" key={res.id}>
                    <div
                      className="px-2 d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "#0B2447" }}
                    >
                      <div className="position-relative">
                        <img src={user1} alt="" height={56} width={56} />
                        <div
                          className="position-absolute d-flex justify-content-center align-items-center"
                          style={{
                            height: "19px",
                            width: "19px",
                            border: "2px solid #FFEE7D",
                            borderRadius: "50%",
                            backgroundColor: "#0B2447",
                            top: "5px",
                            left: "40px",
                          }}
                        >
                          <BiSolidCrown
                            fontSize={"0.65rem"}
                            style={{ color: "#FFEE7D" }}
                          />
                        </div>
                        <span className="ps-2">johndoe</span>
                      </div>
                      <div className="">
                        <span>1 Month </span>
                        <span className="px-2">15-06-2023 - 16:37</span>
                        <span>69.90</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <img
                data-bs-dismiss="modal"
                src={cross}
                alt=""
                style={{
                  position: "absolute",
                  top: "-1rem",
                  right: "-1.1rem",
                  cursor: "pointer",
                }}
                height={45}
                width={45}
              />
            </div>
          )}
        </div>
      </div>

      {/* filter modal */}
      <div
        className="modal fade"
        id="filterModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body dark-mode position-relative">
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="User Type"
                    options={UserTypeOptions}
                    selectedOption={selectedUserTypeFilter}
                    onSelectOption={handleUserTypeFilterSelection}
                    isOpen={userTypeFilterDropDown}
                    toggleDropdown={toggleUserTypeDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  {/* <CustomDropdown
                    label="City"
                    options={cityOptions}
                    selectedOption={selectedCityFilter}
                    onSelectOption={handleCityFilterSelection}
                    isOpen={cityFilterDropDown}
                    toggleDropdown={toggleCityFilterDropdown}
                  /> */}
                  <div className="my-2">
                    <span>City</span>
                    <div
                      className={`${"customDropdown-dark-mode"} p-1 text-center`}
                      onClick={toggleCityFilterDropdown}
                    >
                      <span>{selectedCityFilter}</span>
                    </div>
                    <div
                      className={`customDropdown-content-dark-mode p-2 flex-column d-flex text-center ${
                        cityFilterDropDown ? "d-block" : "d-none"
                      }`}
                      style={{
                        width: "45%",
                      }}
                    >
                      {cityOptions.map((option, index) => (
                        <span
                          className="dpcontent-dark-mode my-1 p-2"
                          key={index}
                          onClick={() => {
                            handleCityFilterSelection(option);
                            toggleCityFilterDropdown();
                          }}
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Gender"
                    options={GenderFilterOptions}
                    selectedOption={selectedGenderFilter}
                    onSelectOption={handleGenderFilterSelection}
                    isOpen={genderFilterDropDown}
                    toggleDropdown={toggleGenderFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Age"
                    options={ageFilterOptions}
                    selectedOption={selectedAgeFilter}
                    ap-2
                    onSelectOption={handleAgeFilterSelection}
                    isOpen={ageFilterDropDown}
                    toggleDropdown={toggleAgeFilterDropdown}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center my-2">
                <button
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleShow();
                    // props.onHide();
                  }}
                  className="px-3 py-1"
                  style={{
                    color: "#D2DB08",
                    backgroundColor: "transparent",
                    border: "1px solid #D2DB08",
                    borderRadius: "4px",
                  }}
                >
                  Show
                </button>
              </div>
            </div>
            <img
              data-bs-dismiss="modal"
              src={cross}
              alt=""
              style={{
                position: "absolute",
                top: "-1rem",
                right: "-1.1rem",
                cursor: "pointer",
              }}
              height={45}
              width={45}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
