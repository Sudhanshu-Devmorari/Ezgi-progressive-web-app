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
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomDropdownHome } from "../CustomDropdownHome/CustomDropdownHome";

const Home = (props) => {
  const [isLoadingActions, setIsLoadingActions] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const admin_id = localStorage.getItem("admin-user-id");
  const handleDeactive = async (id, action) => {
    try {
      setIsLoadingActions(true);
      const res = await axios.delete(
        `${config?.apiUrl}/user-management/${id}/?action=${action}&admin=${admin_id}`
      );
      if (res.status === 200) {
        const modalElement = document.getElementById("exampleModal");
        if (modalElement) {
          const closeButton = modalElement.querySelector(
            "[data-bs-dismiss='modal']"
          );
          if (closeButton) {
            closeButton.click();
          }
        }
        setIsLoadingActions(false);
        clearError();
        props?.adminHomeApiData();
        const confirmation = await Swal.fire({
          title: "Success",
          text: res?.data?.data,
          icon: "success",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
        if (confirmation.value === true) {
          window.location.reload();
        }
      }
      if (res.status == 204) {
        localStorage.clear();
        removeCookie("admin-user-id");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const [validName, setValidName] = useState(null);
  const [validUsername, setValidUsername] = useState(null);
  const [validPhone, setValidPhone] = useState(null);
  const [validPassword, setValidPassword] = useState(null);
  const [validGender, setValidGender] = useState(null);
  const [validAge, setValidAge] = useState(null);

  const [addUser, setAddUser] = useState({});
  const [addUserError, setAddUserError] = useState({});
  const submitUserData = (e) => {
    let name, value;

    name = e.target.name;

    value = e.target.value;

    setAddUser({ ...addUser, [name]: value });

    if (name == "name") {
      if (value?.length <= 4 || value?.length >= 20) {
        // console.log("asdadasdadd");
        setValidName("Name must be 5 to 20 characters.");
      } else {
        setValidName(null);
      }
    } else if (name == "username") {
      if (value?.length <= 4 || value?.length >= 15) {
        setValidUsername("UserName must be 5 to 15 characters.");
      } else {
        setValidUsername(null);
      }
    } else if (name == "phone") {
      // console.log("regex", value?.match(/^5\d*$/));
      if (value?.match(/^5\d*$/) == null || value?.length != 10) {
        setValidPhone("Phone must start with '5' and must be 10 digits.");
      } else {
        setValidPhone(null);
      }
    } else if (name == "password") {
      if (value?.length < 8) {
        setValidPassword("Password must be at least 8 characters.");
      } else {
        setValidPassword(null);
      }
    }
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data1 = await cityApiData1();
  //     const data2 = await cityApiData2();
  //     const combinedCities = [...data1, ...data2];
  //     setCities(combinedCities);
  //   };

  //   fetchData();
  // }, []);

  const [displayUser, setDisplayUser] = useState([]);
  const [allFilterData, setAllFilterData] = useState([]);

  useEffect(() => {
    setDisplayUser(props.users);
    setAllFilterData(props.users);
  }, [props.users]);

  useEffect(() => {}, [displayUser]);

  const filterData = (e) => {
    const val = e.target.value.toLowerCase();
    const filteredArray = displayUser.filter(
      (obj) =>
        // { console.log(obj?.username?.toLowerCase().includes(val),"*********")
          obj?.name?.toLowerCase().startsWith(val) ||
        obj?.username?.toLowerCase().startsWith(val) ||
        obj?.username?.toLowerCase().includes(val) ||
        obj?.name?.toLowerCase().includes(val)
    );
    setAllFilterData(filteredArray);
  };

  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const [userData, setUserData] = useState([]);
  const handleShow = async () => {
    setIsFilterLoading(true);
    try {
      const response = await axios.post(
        `${config?.apiUrl}/filter-user-management/`,
        {
          user_type: selectedUserTypeFilter,
          city: selectedCityFilter,
          gender: selectedGenderFilter,
          age: selectedAgeFilter,
          users: selectedUserFilter,
        }
      );
      // console.log("API Response:::::::::::::", response.data);
      setDisplayUser(response.data);
      setAllFilterData(response.data);
      response.data && setIsFilterLoading(false);
    } catch (error) {
      setIsFilterLoading(false);
      console.error("Error making POST request:", error);
    }
  };
  const [subscriberIncome, setSubscriberIncome] = useState([]);

  const handleTransectionHistory = async (id) => {
    // console.log("IDDD: ", id);
    try {
      // setIsLoadingDeactive(true);
      const res = await axios.get(
        `${config?.apiUrl}/user-transaction-history/${id}/`
      );
      if (res.status === 200) {
        // console.log("-->: ", res.data);
        const data = res.data;
        data.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
        setSubscriberIncome(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [modelClose, setModelClose] = useState(false);
  const [preveiwProfile, setPreveiwProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(false);

  function handleAddProfilePic(e) {
    const imageFile = e.target.files[0];
    setPreveiwProfile(URL.createObjectURL(imageFile));
    setPreveiwProfilePic(URL.createObjectURL(imageFile));
    setSelectedImage(imageFile);
  }
  const clearError = () => {
    setValidName(null);
    setValidUsername(null);
    setValidPhone(null);
    setValidPassword(null);
    setValidGender(null);
    setValidAge(null);
  };
  const handleAddUser = async (e) => {
    // console.log(Object.keys(addUser).length >= 6);
    if (addUser.name == "" || addUser.name == undefined) {
      setValidName("Please enter name.");
    } else {
      setValidName(null);
    }
    if (addUser.username == "" || addUser.username == undefined) {
      setValidUsername("Please enter username.");
    } else {
      setValidUsername(null);
    }
    if (
      addUser.phone?.match(/^5\d*$/) == null ||
      addUser.phone == "" ||
      addUser.phone == undefined
    ) {
      setValidPhone("Please enter valid phone.");
    } else {
      setValidPhone(null);
    }
    if (addUser?.phone?.match(/^5\d*$/) == null || addUser.phone.length != 10) {
      setValidPhone("Phone must start with '5' and must be 10 digits.");
    } else {
      setValidPhone(null);
    }
    if (addUser.password == "" || addUser.password == undefined) {
      setValidPassword("Please enter password.");
    } else {
      setValidPassword(null);
    }
    if (selectedGender == "Select") {
      setValidGender("Please select gender.");
    } else {
      setValidGender(null);
    }

    if (selectedAge == "Select") {
      setValidAge("Please select age.");
    } else {
      setValidAge(null);
    }

    if (
      Object.keys(addUser).length >= 6 &&
      validName == null &&
      validUsername == null &&
      validPhone == null &&
      validPassword == null &&
      validGender == null && selectedGender !== "Select" &&
      validAge == null && selectedAge !== "Select" 
    ) {
      const formData = new FormData();
      selectedImage != false && formData.append("file", selectedImage);
      // formData.append("date", addUser.date);
      formData.append("name", addUser.name);
      formData.append("username", addUser.username.toLowerCase());
      formData.append("phone", addUser.phone);
      formData.append("password", addUser.password);
      formData.append("gender", addUser.gender);
      formData.append("age", addUser.age);
      formData.append("subscription", addUser.subscription);
      formData.append("duration", addUser.duration);
      formData.append("number", addUser.month);
      formData.append("level", addUser.level);
      try {
        const response = await axios.post(
          `${config?.apiUrl}/user-management/?admin=${admin_id}`,
          formData
        );
        // e.target.setAttribute("data-bs-dismiss","modal")
        const modalElement = document.getElementById("exampleModal");
        if (modalElement) {
          const closeButton = modalElement.querySelector(
            "[data-bs-dismiss='modal']"
          );
          if (closeButton) {
            closeButton.click();
          }
        }
        if (response.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          window.location.reload();
        }
        window.location.reload();
        clearError();
        props?.userManagementApiData();
      } catch (error) {
        if (error?.response?.data?.error) {
          Swal.fire({
            title: "Error",
            text: `${error?.response?.data?.error}`,
            icon: "error",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        }
        // console.error("Error making POST request:", error);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: `Please fill all fields.`,
        icon: "error",
        backdrop: false,
        customClass: "dark-mode-alert",
      });
    }
    // }
  };

  const handleUpdateUser = async (id, user_id) => {
    if (addUser.name == "" || addUser.name == undefined) {
      setValidName("Please enter name.");
    } else {
      setValidName(null);
    }
    if (addUser.username == "" || addUser.username == undefined) {
      setValidUsername("Please enter username.");
    } else {
      setValidUsername(null);
    }
    if (
      addUser.phone.match(/^5\d*$/) == null ||
      addUser.phone == "" ||
      addUser.phone == undefined
    ) {
      setValidPhone("Please enter valid phone.");
    } else {
      setValidPhone(null);
    }
    if (addUser.phone.match(/^5\d*$/) == null || addUser.phone.length != 10) {
      setValidPhone("Phone must start with '5' and must be 10 digits.");
    } else {
      setValidPhone(null);
    }
    if (addUser.password == "" || addUser.password == undefined) {
      setValidPassword("Please enter password.");
    } else {
      setValidPassword(null);
    }
    if (addUser.gender == "" || addUser.gender == "Select") {
      setValidGender("Please select gender.");
    } else {
      setValidGender(null);
    }

    if (addUser.age == "" || addUser.age == "Select") {
      setValidAge("Please select age.");
    } else {
      setValidAge(null);
    }

    if (
      Object.keys(addUser).length >= 6 &&
      validName == null &&
      validUsername == null &&
      validPhone == null &&
      validPassword == null &&
      validGender == null
    ) {
      // console.log("::::::::", addUser);
      const formData = new FormData();
      selectedImage != false && formData.append("profile_pic", selectedImage);
      // formData.append("date", addUser.date);
      formData.append("name", addUser.name);
      formData.append("username", addUser.username.toLowerCase());
      formData.append("phone", addUser.phone);
      formData.append("password", addUser.password);
      formData.append("gender", addUser.gender);
      formData.append("age", addUser.age);
      formData.append("subscription", addUser.subscription);
      formData.append("duration", addUser.duration);
      formData.append("number", addUser.month);
      formData.append("level", addUser.level);
      formData.append("user_id", user_id);
      try {
        const response = await axios.patch(
          `${config?.apiUrl}/user-management/${id}/?admin=${admin_id}`,
          formData
        );
        // console.log("API Response:", response);
        if (response.status === 200) {
          const modalElement = document.getElementById("exampleModal");
          if (modalElement) {
            const closeButton = modalElement.querySelector(
              "[data-bs-dismiss='modal']"
            );
            if (closeButton) {
              closeButton.click();
            }
          }
          // console.log(addUser);
          clearError();
          setAddUser({
            name: "",
            username: "",
            phone: "",
            password: "",
            gender: "",
            age: "",
            duration: "",
            number: "",
            level: "",
          });
          setprofile(false);
          setPreveiwProfilePic(null);
          props?.adminHomeApiData();
          const confirm = await Swal.fire({
            title: "Success",
            text: "User Updated!",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
          if (confirm.value === true) {
            window.location.reload();
          }
        }
        if (response.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          window.location.reload();
        }
      } catch (error) {
        if (error?.response?.data?.error) {
          Swal.fire({
            title: "Error",
            text: `${error?.response?.data?.error}`,
            icon: "error",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        }
        console.error("Error making POST request:", error);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: `Please fill all fields.`,
        icon: "error",
        backdrop: false,
        customClass: "dark-mode-alert",
      });
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
    setUserFilterDropDown(false);
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
    setUserFilterDropDown(false);
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
    setUserFilterDropDown(false);
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
    setUserFilterDropDown(false);
    setAgeFilterDropDown(!ageFilterDropDown);
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

  const userOptions = ["Deactivated Users", "Deleted Users"];

  const [selectedUserFilter, setSelectedUserFilter] = useState("Select");
  const [userFilterDropDown, setUserFilterDropDown] = useState(false);

  const handleUserFilterSelection = (userOption) => {
    setSelectedUserFilter(userOption);
  };

  const toggleUserFilterDropdown = () => {
    setGenderFilterDropDown(false);
    setCityFilterDropDown(false);
    setUserTypeFilterDropDown(false);
    setAgeFilterDropDown(false);
    setUserFilterDropDown(!userFilterDropDown);
  };
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      <div
        className={`dark-mode p-2 m-2 mb-0 home-height pt-3 ${
          props?.isLoading &&
          usersPart !== "users" &&
          "d-flex align-items-center justify-content-center"
        }`}
      >
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
        {props?.isLoading || isFilterLoading ? (
          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
            Loading...
          </div>
        ) : (
          <>
            {allFilterData?.length == 0 ? (
              <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                No Record Found!
              </div>
            ) : (
              allFilterData?.map((res, index) => (
                <React.Fragment key={index}>
                  <MainDiv>
                    <div className="col">
                      {/* <span className="pe-1">{`# ${res?.id
                          .toString()
                          .padStart(4, "0")}`}</span> */}
                      <span className="pe-1">{`# ${(allFilterData.length - index)
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
                    <div className="d-flex justify-content-between gap-2 align-items-center col ">
                      <div style={{ width: "33%" }}>
                        {res?.username?.trim()}
                      </div>
                      <div className="d-flex" style={{ width: "33%" }}>
                        <span
                          style={{
                            display: "block",
                            minWidth: "fit-content",
                            textWrap: "nowrap",
                          }}
                        >
                          {res.gender == "Male" && (
                            <img
                              src={gender_male}
                              alt=""
                              height={22}
                              width={22}
                            />
                          )}
                          {res.gender == "Female" && (
                            <img
                              src={gender_female}
                              alt=""
                              height={22}
                              width={22}
                            />
                          )}
                          {res.age}
                        </span>
                      </div>
                      <div className="" style={{ width: "33%" }}>
                        {res.country?.trim()}
                      </div>
                    </div>
                    {usersPart === "users" && (
                      <div
                        className="d-flex  align-items-center block-width col justify-content-center"
                        style={{ minWidth: "7.5rem" }}
                      >
                        {res.commentator_level &&
                        res.commentator_level !== "undefined" ? (
                          <button
                            className="btn-user"
                            style={{
                              textAlign: "center",
                              paddingTop: "0.1rem",
                              width: "7.5rem",
                              color:
                                (res.commentator_level === "journeyman" &&
                                  "#4DD5FF") ||
                                (res.commentator_level === "master" &&
                                  "#03fc77") ||
                                (res.commentator_level === "grandmaster" &&
                                  "#FF9100") ||
                                (res.commentator_level === "apprentice" &&
                                  "#FFEE7D"),
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
                      <span>
                        {moment(res.created).format("DD-MM.YYYY - HH:mm")}
                      </span>
                      <img
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          setprofile(true);
                          setUserData(res);
                          setAddUser(res);
                          setPreveiwProfilePic(true);
                          res?.subscription ? setSelectCheckBox(true) : setSelectCheckBox(false)
                        }}
                        className="cursor"
                        src={userEdit}
                        alt=""
                        height={25}
                        width={25}
                      />
                      {/* {path != "/" && 
                      <img
                        onClick={
                          () => {
                            // if (userData?.is_delete) {
                            handleDeactive(res.id, "delete");
                          }
                          // }
                        }
                        className="cursor"
                        src={trash}
                        alt=""
                        height={25}
                        width={25}
                      />
                      } */}
                    </div>
                  </MainDiv>
                </React.Fragment>
              ))
            )}
          </>
        )}
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
                    src={
                      addUser.profile_pic
                        ? server_url + addUser.profile_pic
                        : initialProfile
                    }
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
                        onClick={() => {
                          setshowTransactionHistory(2);
                          handleTransectionHistory(addUser.id);
                        }}
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
                    onChange={(e) => {
                      submitUserData(e);
                    }}
                    name="name"
                    value={addUser.name}
                    type="text"
                    className="darkMode-input form-control"
                    // {...formik.getFieldProps("name")}
                  />
                  {/* {addUserError && addUserError.name ? (
                    <small className="text-danger">{addUserError.name}</small>
                  ) : null} */}
                  {validName ? (
                    <small className="text-danger">{validName}</small>
                  ) : null}
                </div>
                <div className="col d-flex flex-column">
                  <span>Username</span>
                  <input
                    onChange={(e) => {
                      submitUserData(e);
                    }}
                    name="username"
                    value={addUser.username}
                    type="text"
                    className="darkMode-input form-control"
                    required
                    // {...formik.getFieldProps("username")}
                  />
                  {/* {formik.touched.username && formik.errors.username ? (
                    <small className="text-danger">
                      {formik.errors.username}
                    </small>
                  ) : null} */}
                  {validUsername ? (
                    <small className="text-danger">{validUsername}</small>
                  ) : null}
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
                      onChange={(e) => {
                        submitUserData(e);
                      }}
                      name="phone"
                      value={addUser.phone}
                      type="number"
                      class="form-control darkMode-input"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      // {...formik.getFieldProps("phone")}
                    />
                  </div>
                  {validPhone ? (
                    <small className="text-danger">{validPhone}</small>
                  ) : null}
                </div>
                <div className="col d-flex flex-column ">
                  <span>Password</span>
                  <div className="darkMode-input input-group align-items-center">
                    <input
                      onChange={(e) => {
                        submitUserData(e);
                      }}
                      name="password"
                      value={addUser.password}
                      // style={{-webkit-text-security: square;}}
                      // style={{webkitTextSecurity: "star"}}
                      className="darkMode-input form-control"
                      type={showPassword ? "text" : "password"}
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      style={{ width: "12rem" }}
                    />
                    {profile ? (
                      <>
                        {showPassword ? (
                          <div className="input-group-append">
                            <AiOutlineEyeInvisible
                              fontSize={"1.5rem"}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </div>
                        ) : (
                          <div className="input-group-append">
                            <AiOutlineEye
                              fontSize={"1.5rem"}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {showPassword ? (
                          <div className="input-group-append">
                            <AiOutlineEyeInvisible
                              fontSize={"1.5rem"}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </div>
                        ) : (
                          <div className="input-group-append">
                            <AiOutlineEye
                              fontSize={"1.5rem"}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {validPassword ? (
                    <small className="text-danger">{validPassword}</small>
                  ) : null}
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
                  {validGender ? (
                    <small className="text-danger">{validGender}</small>
                  ) : null}
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
                  {validAge ? (
                    <small className="text-danger">{validAge}</small>
                  ) : null}
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
                    // src={addUser.subscription === "True" ? Selectedcheckbox : checkbox}
                    style={{ cursor: "pointer" }}
                    height={58}
                    width={55}
                    name="subscription"
                    value={addUser.selectCheckBox}
                    // value={addUser.subscription ? addUser.subscription : addUser.selectCheckBox}
                    onClick={() => {
                      setSelectCheckBox(!selectCheckBox);
                      // setSelectCheckBox(addUser.subscription ? Selectedcheckbox : checkbox);
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
                      <CustomDropdownHome
                        onChange={submitUserData}
                        name="duration"
                        value={
                          userData ? userData?.duration : addUser.selectedMonth
                        }
                        // value={
                        //   addUser?.duration ? addUser?.duration : addUser.selectedMonth
                        // }
                        label=" "
                        options={monthOptions}
                        selectedOption={addUser?.duration ? addUser?.duration : selectedMonth}
                        onSelectOption={handleduration}
                        isOpen={monthDropDown}
                        toggleDropdown={toggleMonthDropdown}
                      />
                    </div>
                    <div className="col">
                      <CustomDropdownHome
                        onChange={submitUserData}
                        name="month"
                        value={
                          userData ? addUser.selectedNumber : selectedNumber
                        }
                        // value={
                        //   addUser?.number ? addUser?.number : addUser.selectedNumber
                        // }
                        label=" "
                        options={numberOptions}
                        selectedOption={addUser?.number ? addUser?.number : selectedNumber}
                        onSelectOption={handleNumber}
                        isOpen={numberDropDown}
                        toggleDropdown={toggleNumberDropdown}
                      />
                    </div>
                    <div className="col">
                      <CustomDropdownHome
                        onChange={submitUserData}
                        name="level"
                        value={
                          userData
                            ? userData?.commentator_level
                            : addUser.selectedLevel
                        }
                        // value={
                        //   addUser?.level ? addUser?.level : addUser.selectedLevel
                        // }
                        label=" "
                        options={levelOptions}
                        selectedOption={addUser?.level ? addUser?.level : selectedLevel}
                        onSelectOption={handleLevel}
                        isOpen={levelDropDown}
                        toggleDropdown={toggleLevelDropdown}
                      />
                    </div>
                  </div>
                </div>
                {profile ? (
                  <>
                    <div className="my-2 d-flex justify-content-center gap-3 mb-3 px-3">
                      <div className="">
                        <button
                          // disabled={true}
                          onClick={() => {
                            handleDeactive(userData?.id, "remove");
                            setAddUser({
                              name: "",
                              username: "",
                              phone: "",
                              password: "",
                              gender: "",
                              age: "",
                              duration: "",
                              number: "",
                              level: "",
                            });
                            setprofile(false);
                            setPreveiwProfilePic(null);
                            clearError();
                          }}
                          // data-bs-dismiss="modal"
                          className="px-3 py-1"
                          style={{
                            color: "#FF5757",
                            backgroundColor: "transparent",
                            border: "1px solid #FF5757",
                            borderRadius: "4px",
                          }}
                        >
                          {isLoadingActions ? "Loading..." : "Remove"}
                        </button>
                      </div>
                      <div className="">
                        <button
                          onClick={() => {
                            handleUpdateUser(userData?.id, addUser.id);
                          }}
                          // data-bs-dismiss="modal"
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
                      <div className="">
                        <button
                          // disabled={true}
                          onClick={() => {
                            handleDeactive(
                              userData?.id,
                              userData?.is_active ? "deactive" : "active"
                            );
                            setAddUser({
                              name: "",
                              username: "",
                              phone: "",
                              password: "",
                              gender: "",
                              age: "",
                              duration: "",
                              number: "",
                              level: "",
                            });
                            setprofile(false);
                            setPreveiwProfilePic(null);
                          }}
                          // data-bs-dismiss="modal"
                          className="px-3 py-1"
                          style={{
                            color: "#D2DB08",
                            backgroundColor: "transparent",
                            border: "1px solid #D2DB08",
                            borderRadius: "4px",
                          }}
                        >
                          {isLoadingActions
                            ? "Loading..."
                            : userData?.is_active
                            ? "Deactive"
                            : "Active"}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="my-2 d-flex justify-content-center">
                    <button
                      // data-bs-target="modal"
                      onClick={(e) => {
                        handleAddUser(e);
                        // setModelClose(false)

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
                    duration: "",
                    number: "",
                    level: "",
                  });
                  setprofile(false);
                  setPreveiwProfilePic(null);
                  setAgeDropDown(false);
                  setGenderDropDown(false);
                  setMonthDropDown(false);
                  setNumberDropDown(false);
                  setLevelDropDown(false);
                  clearError();
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
              <div
                className=""
                style={{ overflowY: "scroll", height: "18rem" }}
              >
                {subscriberIncome?.length == 0 ? (
                  <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                    No Record Found!
                  </div>
                ) : (
                  subscriberIncome?.map((res, key) => (
                    <div className="row g-0 my-2" key={res.id}>
                      <div
                        className="px-2 d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "#0B2447" }}
                      >
                        <div className="position-relative">
                          <img
                            src={
                              res?.user?.profile_pic
                                ? `${config.apiUrl}${res?.user?.profile_pic}`
                                : res?.commentator_user?.profile_pic
                                ? `${config.apiUrl}${res?.commentator_user?.profile_pic}`
                                : initialProfile
                            }
                            className="rounded-circle"
                            alt=""
                            height={56}
                            width={56}
                          />
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
                          <span className="ps-2">
                            {res?.user
                              ? res?.user.name
                              : res?.commentator_user.name}
                          </span>
                        </div>
                        <div className="">
                          <span>{res.duration} </span>
                          <span className="px-2">
                            {moment(res.created).format("DD-MM.YYYY - HH:mm")}
                          </span>
                          <span>{res.money}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <img
                onClick={() => {
                  // setNumberDropDown(false)
                  setshowTransactionHistory(1);
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
                      style={{ cursor: "pointer" }}
                    >
                      <span>{selectedCityFilter}</span>
                    </div>
                    <div
                      className={`customDropdown-content-dark-mode p-2 flex-column d-flex text-center ${
                        cityFilterDropDown ? "d-block" : "d-none"
                      }`}
                      style={{
                        width: "45%",
                        cursor: "pointer",
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
              <div className="mb-5">
                <CustomDropdown
                  label="Users"
                  options={userOptions}
                  selectedOption={selectedUserFilter}
                  onSelectOption={handleUserFilterSelection}
                  isOpen={userFilterDropDown}
                  toggleDropdown={toggleUserFilterDropdown}
                />
              </div>
              <div className="d-flex justify-content-center my-4">
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
              onClick={() => {
                setUserTypeFilterDropDown(false);
                setCityFilterDropDown(false);
                setGenderFilterDropDown(false);
                setAgeFilterDropDown(false);
                setUserFilterDropDown(false);
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
        </div>
      </div>
    </>
  );
};

export default Home;
