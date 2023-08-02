import { useState } from "react";
import { GoSearch } from "react-icons/go";
import gender_female from "../../assets/gender-female.png";
import gender_male from "../../assets/gender-male.png";
import profile from "../../assets/profile.png";
import eye from "../../assets/eye.svg";
import user1 from "../../assets/user1.png";
import "./EditorManagemenet.css";
import camera from "../../assets/camera-plus.svg";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";
import { BiSolidCrown } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Dropdownmodal } from "../Dropdownmodal";
import selectedRadio from "../../assets/Group 316.svg";
import Radio from "../../assets/Group 314.svg";
import leftArrow from "../../assets/Group 271.svg";
import circle_check from "../../assets/circle-check-1.png";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import VerificationRequestsBtns from "../VerificationRequestsBtns/VerificationRequestsBtns";
import DeactivationRequestsBtns from "../DeactivationRequestsBtns/DeactivationRequestsBtns";

const EditorManagemenet = (props) => {
  const [isJourneymanSelected, setIsJourneymanSelected] = useState(false);
  const [isExpertSelected, setIsExpertSelected] = useState(false);
  const [isGrandmasterSelected, setIsGrandmasterSelected] = useState(false);
  const users = [
    {
      sr: "#0001",
      name: "John Doe",
      username: "johndoe",
      gender: gender_female,
      age: "25 - 34",
      country: "Ankara",
      date: "15-06-.2023 - 16:37",
      role: "Journeyman",
      profile: profile,
    },
    {
      sr: "#0002",
      name: "John Doe",
      username: "johndoe",
      gender: gender_male,
      age: "18 - 24",
      country: "İstanbul",
      date: "15-06-.2023 - 16:37",
      profile: user1,
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      gender: gender_female,
      age: "35 - 44",
      country: "İzmir",
      date: "15-06-.2023 - 16:37",
      role: "Expert",
      profile: profile,
    },
    {
      sr: "#0004",
      name: "John Doe",
      username: "johndoe",
      gender: gender_male,
      age: "25 - 34",
      country: "Bursa",
      date: "15-06-.2023 - 16:37",
      role: "Apprentice",
      profile: profile,
    },
  ];
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select");
  const [cityDropDown, setCityDropDown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select");
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Select");
  const [ageDropDown, setAgeDropDown] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Select");
  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const [showHistory, setshowHistory] = useState(false);

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
    if (categoryDropdown) {
      setCategoryDropdown(false);
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
    if (categoryDropdown) {
      setCategoryDropdown(false);
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
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
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
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    setAgeDropDown(!ageDropDown);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const toggleCategoryDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    if (cityDropDown) {
      setCityDropDown(false);
    }
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    setCategoryDropdown(!categoryDropdown);
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
  const categoryOptions = ["Category 1", "Category 2", "Category 3"];

  const [selectedHisory, setselectedHisory] = useState("subscriber");

  const subscriberArray = [
    { id: "#0001", profile: user1, name: "johndoe", month: "3 Months" },
    { id: "#0002", profile: user1, name: "johndoe", month: "3 Months" },
    { id: "#0003", profile: user1, name: "johndoe", month: "6 Months" },
    { id: "#0004", profile: user1, name: "johndoe", month: "3 Months" },
    { id: "#0005", profile: user1, name: "johndoe", month: "3 Months" },
  ];
  const withdrawalArray = [
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
  ];
  const paymentArray = [
    { id: "#0001", plan: "Expert Membership Plan" },
    { id: "#0002", plan: "Highlight Plan 2 Week" },
    { id: "#0003", plan: "Expert Membership Plan" },
    { id: "#0004", plan: "Highlight Plan 2 Week" },
  ];

  const GenderFilterOptions = ["option 1", "option 2"];
  const LevelOptions = ["option 1", "option 2"];
  const CityFilterOptions = ["option 1", "option 2"];
  const ageFilterOptions = ["option 1", "option 2"];
  const SuccessRateFilterOptions = ["option 3", "option 4"];
  const ScorePointFilterOptions = ["option 5", "option 6"];

  const [selectedSuccessRateFilter, setSelectedSuccessRateFilter] =
    useState("Select");
  const [successRateFilterDropDown, setSuccessRateFilterDropDown] =
    useState(false);

  const [selectedScorePointFilter, setSelectedScorePointFilter] =
    useState("Select");
  const [scorePointFilterDropDown, setScorePointFilterDropDown] =
    useState(false);

  const [selectedGenderFilter, setSelectedGenderFilter] = useState("Select");
  const [genderFilterDropDown, setGenderFilterDropDown] = useState(false);

  const [selectedLevelFilter, setSelectedLevelFilter] = useState("Select");
  const [levelFilterDropDown, setLevelFilterDropDown] = useState(false);

  const [selectedCityFilter, setSelectedCityFilter] = useState("Select");
  const [cityFilterDropDown, setCityFilterDropDown] = useState(false);

  const [selectedAgeFilter, setSelectedAgeFilter] = useState("Select");
  const [ageFilterDropDown, setAgeFilterDropDown] = useState(false);

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
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
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
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
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
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setAgeFilterDropDown(!ageFilterDropDown);
  };
  const toggleLevelFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setLevelFilterDropDown(!levelFilterDropDown);
  };
  const handleLevelFilterSelection = (gender) => {
    setSelectedLevelFilter(gender);
  };
  const handleSuccessRateFilterSelection = (rate) => {
    setSelectedSuccessRateFilter(rate);
  };

  const handleScorePointFilterSelection = (point) => {
    setSelectedScorePointFilter(point);
  };

  const toggleSuccessRateFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    setSuccessRateFilterDropDown(!successRateFilterDropDown);
  };

  const toggleScorePointFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setScorePointFilterDropDown(!scorePointFilterDropDown);
  };

  return (
    <>
      <div
        className="dark-mode p-2 m-2 mb-0 home-height"
      >
        <div className="d-flex p-2">
          <div className="p-2 flex-grow-1">
            <div class="input-group w-50">
              <span class="input-group-text search-icon-dark" id="basic-addon1">
                <GoSearch style={{ color: "#FFFFFF" }} />
              </span>
              <input type="text" className="input-field-dark" />
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
                border: "1px solid #5BDEAA",
                color: "#5BDEAA",
              }}
            >
              Create Editor
            </button>
          </div>
        </div>
        {users.map((res, index) => (
          <div
            className="px-2 py-1 mb-2 editor-section-fonts"
            style={{ backgroundColor: "#0B2447", fontSize: "1rem" }}
          >
            <div className="row g-0 d-flex justify-content-between align-items-center">
              <div className="col-3">
                <div className="d-flex align-items-center">
                  <span className="pe-1">{res.sr}</span>
                  <div className="position-relative">
                    <img
                      className="profile-icon"
                      src={res.profile}
                      alt=""
                      height={42}
                      width={42}
                    />
                    <div
                      className="position-absolute d-flex justify-content-center align-items-center crown-position"
                      style={{
                        height: "14px",
                        width: "14px",
                        border: "2px solid #FF9100",
                        borderRadius: "50%",
                        backgroundColor: "#0B2447",
                        top: "0px",
                        left: "27px",
                      }}
                    >
                      <BiSolidCrown
                        fontSize={"0.49rem"}
                        style={{ color: "#FF9100" }}
                      />
                    </div>
                  </div>
                  <span className="ps-1">{res.name}</span>
                </div>
              </div>
              <div className="d-flex gap-2 align-items-center col-1">
                <div>{res.username}</div>
              </div>
              <div
                className="d-flex align-items-center block-width col-3 gap-1"
                style={{ minWidth: "7.5rem" }}
              >
                <span style={{ color: "#D2DB0B", fontSize: "1rem" }}>%62</span>
                <img src={res.gender} alt="" height={28} width={28} />
                <span>{res.age}</span>
                <div className="">{res.country}</div>
              </div>
              <div className="d-flex align-items-center gap-1 col-3 justify-content-end eye-gap">
                <span>{res.date}</span>
                <img
                  className="icons-edit-eye"
                  src={circle_check}
                  alt=""
                  height={28}
                  width={28}
                />
                <img
                  className="icons-edit-eye"
                  src={eye}
                  alt=""
                  height={28}
                  width={28}
                />
              </div>
            </div>
            {props?.verifyRqst && (
              <VerificationRequestsBtns/>
            )}
            {props?.deactiveRqst && (
              <DeactivationRequestsBtns/>
            )}
          </div>
        ))}
      </div>

      {/* CREATE & UPDATE EDITOR */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-body dark-mode p-3">
              <div className="d-flex position-relative my-2">
                <div
                  className="my-1"
                  style={{
                    backgroundColor: "#E6E6E6",
                    borderRadius: "50%",
                    height: "7rem",
                    width: "7rem",
                  }}
                >
                  <img
                    style={{
                      position: "absolute",
                      top: "2rem",
                      left: "1.9rem",
                    }}
                    src={camera}
                    alt=""
                  />
                </div>
                <div
                  className="position-absolute d-flex justify-content-center align-items-center"
                  style={{
                    height: "1.78rem",
                    width: "1.78rem",
                    border: "3px solid #FFEE7D",
                    borderRadius: "50%",
                    backgroundColor: "#0B2447",
                    top: "6px",
                    left: "4.9rem",
                  }}
                >
                  <BiSolidCrown
                    fontSize={"0.8rem"}
                    style={{ color: "#FFEE7D" }}
                  />
                </div>
                <div
                  className={`${props.updateProfile === 2 ? "mt-3" : "mt-5"}`}
                  style={{ fontSize: "0.9rem" }}
                >
                  <div className="col">
                    {props.updateProfile === 2 && (
                      <div className="ms-2 mb-2">
                        <button
                          className="px-3"
                          style={{
                            border: "1px solid #FFA200",
                            color: "#FFA200",
                            backgroundColor: "transparent",
                            borderRadius: "18px",
                            fontSize: "0.9rem",
                          }}
                        >
                          Expert
                        </button>
                      </div>
                    )}
                    <div className="d-flex justify-content-center">
                      <span
                        className="py-1 mb-2 px-2"
                        style={{
                          backgroundColor: "#0B2447",
                          borderRadius: "2px",
                        }}
                      >
                        <img
                          className="mb-1"
                          src={upload}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <span className="ps-2">Upload</span>
                      </span>
                    </div>
                    <div
                      className="px-2 py-1"
                      style={{
                        backgroundColor: "#0B2447",
                        borderRadius: "2px",
                      }}
                    >
                      Membership Date
                    </div>
                  </div>
                </div>
                {props.updateProfile === 2 && (
                  <div className="col p-2 ps-3">
                    <div className="text-end" style={{ fontSize: "1.3rem" }}>
                      Total Balance 12.500
                    </div>
                    <div
                      onClick={() => setshowHistory(true)}
                      className="text-end"
                      style={{ fontSize: ".9rem", cursor: "pointer" }}
                    >
                      Transaction History
                    </div>
                    <div className="d-flex gap-4 justify-content-end my-2">
                      <div className="d-flex flex-column text-center">
                        <span>Subscribers</span>
                        <span>1.236</span>
                      </div>
                      <div className="d-flex flex-column text-center">
                        <span>Subscribers</span>
                        <span>1.236</span>
                      </div>
                      <div className="d-flex flex-column text-center">
                        <span>Subscribers</span>
                        <span>1.236</span>
                      </div>
                      <div className="d-flex flex-column text-center">
                        <span>Subscribers</span>
                        <span>1.236</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {showHistory ? (
                <div className="p-2">
                  <div className="d-flex justify-content-between">
                    <div className="p-1 gap-3 d-flex ">
                      <img src={leftArrow} alt="" height={20} width={20} />
                      <div
                        onClick={() => setselectedHisory("subscriber")}
                        className=""
                        style={{
                          color:
                            selectedHisory === "subscriber" ? "#D2DB0B" : "",
                          cursor: "pointer",
                        }}
                      >
                        Subscriber Income
                      </div>
                      <div
                        onClick={() => setselectedHisory("withdrawal")}
                        className=""
                        style={{
                          color:
                            selectedHisory === "withdrawal" ? "#D2DB0B" : "",
                          cursor: "pointer",
                        }}
                      >
                        Withdrawal
                      </div>
                      <div
                        onClick={() => setselectedHisory("payment")}
                        className=""
                        style={{
                          color: selectedHisory === "payment" ? "#D2DB0B" : "",
                          cursor: "pointer",
                        }}
                      >
                        Payment
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="px-3 py-1"
                        style={{
                          color: "#FF9100",
                          backgroundColor: "transparent",
                          border: "1px solid #FF9100",
                          borderRadius: "4px",
                        }}
                      >
                        Export
                      </button>
                    </div>
                  </div>
                  <div className="my-2" style={{ overflowY: "scroll" }}>
                    {selectedHisory === "subscriber" && (
                      <>
                        {subscriberArray.map((res, index) => (
                          <div
                            className="row g-0 my-2 dark-mode px-3"
                            style={{ backgroundColor: "#0B2447" }}
                          >
                            <div className="col d-flex align-items-center">
                              <span className="pe-2">{res.id}</span>
                              <img src={user1} alt="" height={50} width={50} />
                              <span className="ps-2">{res.name}</span>
                            </div>
                            <div className="col d-flex align-items-center gap-3 justify-content-center">
                              <div>{res.month}</div>
                              <div>1/3</div>
                              <div>229.90</div>
                            </div>
                            <div className="col d-flex align-items-center justify-content-end">
                              <div>15-06-2023 - 16:37</div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    {selectedHisory === "withdrawal" && (
                      <>
                        {withdrawalArray.map((res, index) => (
                          <div
                            className="my-2 dark-mode px-3 py-2 pe-0 d-flex gap-5"
                            style={{
                              backgroundColor: "#0B2447",
                              fontSize: "0.9rem",
                            }}
                          >
                            <div className="">{res.id}</div>
                            <div className="">{res.account}</div>
                            <div className="">15-06-2023 - 16:37</div>
                            <div className="">3.500</div>
                            <div className="gap-0">
                              <img
                                src={circle_check}
                                alt=""
                                height={25}
                                width={25}
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    {selectedHisory === "payment" && (
                      <>
                        {paymentArray.map((res, index) => (
                          <div
                            className="row g-0 my-2 dark-mode px-3 py-2"
                            style={{
                              backgroundColor: "#0B2447",
                              fontSize: "0.9rem",
                            }}
                          >
                            <div className="col gap-5 d-flex">
                              <div>{res.id}</div>
                              <div>{res.plan}</div>
                            </div>
                            <div className="col gap-5 d-flex justify-content-end">
                              <div>15-06-2023 - 16:37</div>
                              <div>369.90</div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="row g-0 gap-3 my-2">
                    <div className="col d-flex flex-column">
                      <span>Name Surname</span>
                      <input
                        type="text"
                        className="darkMode-input form-control"
                      />
                    </div>
                    <div className="col d-flex flex-column">
                      <span>Username</span>
                      <input
                        type="text"
                        className="darkMode-input form-control"
                      />
                    </div>
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
                          type="text"
                          class="form-control darkMode-input"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-0 gap-3">
                    <div className="col d-flex flex-column">
                      <span>Password</span>
                      <input
                        // style={{-webkit-text-security: square;}}
                        style={{ webkitTextSecurity: "circle" }}
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
                            top: "11rem",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <AiOutlineEye
                          fontSize={"1.5rem"}
                          style={{
                            position: "absolute",
                            right: "1.6rem",
                            top: "12rem",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                    <div className="col">
                      <Dropdownmodal
                        label="Country"
                        options={countryOptions}
                        selectedOption={selectedCountry}
                        onSelectOption={handleCountrySelection}
                        isOpen={countryDropDown}
                        toggleDropdown={toggleCountryDropdown}
                      />
                    </div>
                    <div className="col">
                      <Dropdownmodal
                        label="City"
                        options={cityOptions}
                        selectedOption={selectedCity}
                        onSelectOption={handleCitySelection}
                        isOpen={cityDropDown}
                        toggleDropdown={toggleCityDropdown}
                      />
                    </div>
                  </div>
                  <div className="row gap-3 g-0 my-2">
                    <div className="col">
                      <Dropdownmodal
                        label="Category"
                        options={categoryOptions}
                        selectedOption={selectedCategory}
                        onSelectOption={handleCategorySelection}
                        isOpen={categoryDropdown}
                        toggleDropdown={toggleCategoryDropdown}
                      />
                    </div>
                    <div className="col">
                      <Dropdownmodal
                        label="Gender"
                        options={genderOptions}
                        selectedOption={selectedGender}
                        onSelectOption={handleGenderSelection}
                        isOpen={genderDropDown}
                        toggleDropdown={toggleGenderDropdown}
                      />
                    </div>
                    <div className="col">
                      <Dropdownmodal
                        label="Age"
                        options={ageOptions}
                        selectedOption={selectedAge}
                        onSelectOption={handleAgeSelection}
                        isOpen={ageDropDown}
                        toggleDropdown={toggleAgeDropdown}
                      />
                    </div>
                  </div>
                  <div className="row g-0 my-2 gap-4">
                    <div className="col-7">
                      About
                      <div className="">
                        <span></span>
                        <div class="form-floating">
                          <textarea
                            style={{ height: "100px" }}
                            className="darkMode-input form-control"
                          ></textarea>
                        </div>
                        <span style={{ fontSize: "0.8rem" }}>
                          Max. 250 character
                        </span>
                      </div>
                    </div>
                    <div className="col-4 d-flex flex-column justify-content-center gap-2">
                      <div className="">
                        <img
                          height={30}
                          width={30}
                          onClick={() =>
                            setIsJourneymanSelected(!isJourneymanSelected)
                          }
                          src={isJourneymanSelected ? selectedRadio : Radio}
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <span className="px-2">Jouneyman</span>
                      </div>
                      <div className="">
                        <img
                          height={30}
                          width={30}
                          onClick={() => setIsExpertSelected(!isExpertSelected)}
                          src={isExpertSelected ? selectedRadio : Radio}
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <span className="px-2">Expert</span>
                      </div>
                      <div className="">
                        <img
                          height={30}
                          width={30}
                          onClick={() =>
                            setIsGrandmasterSelected(!isGrandmasterSelected)
                          }
                          src={isGrandmasterSelected ? selectedRadio : Radio}
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <span className="px-2">Jouneyman</span>
                      </div>
                    </div>

                    <div
                      className={`d-flex justify-content-center my-2 ${
                        props.updateProfile === 2 && "gap-3"
                      }`}
                    >
                      {props.updateProfile === 2 ? (
                        <>
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
                          <button
                            className="px-3 py-1"
                            style={{
                              color: "#D2DB08",
                              backgroundColor: "transparent",
                              border: "1px solid #D2DB08",
                              borderRadius: "4px",
                            }}
                          >
                            Update
                          </button>
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
                        </>
                      ) : (
                        <button
                          className="px-3 py-1"
                          style={{
                            color: "#D2DB08",
                            backgroundColor: "transparent",
                            border: "1px solid #D2DB08",
                            borderRadius: "4px",
                          }}
                        >
                          Create
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
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
      </div>

      {/* Filter Modal */}
      <div
        class="modal fade"
        id="filterModal"
        tabindex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body dark-mode position-relative">
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Level"
                    options={LevelOptions}
                    selectedOption={selectedLevelFilter}
                    onSelectOption={handleLevelFilterSelection}
                    isOpen={levelFilterDropDown}
                    toggleDropdown={toggleLevelFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Success Rate"
                    options={SuccessRateFilterOptions}
                    selectedOption={selectedSuccessRateFilter}
                    onSelectOption={handleSuccessRateFilterSelection}
                    isOpen={successRateFilterDropDown}
                    toggleDropdown={toggleSuccessRateFilterDropdown}
                  />
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Score Point"
                    options={ScorePointFilterOptions}
                    selectedOption={selectedScorePointFilter}
                    onSelectOption={handleScorePointFilterSelection}
                    isOpen={scorePointFilterDropDown}
                    toggleDropdown={toggleScorePointFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
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
                      {CityFilterOptions.map((option, index) => (
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

export default EditorManagemenet;
