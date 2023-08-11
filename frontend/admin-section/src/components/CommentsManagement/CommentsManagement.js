import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import user4 from "../../assets/user4.png";
import user5 from "../../assets/user5.png";
import UKflag from "../../assets/Flag_of_the_United_Kingdom.png";
import flag from "../../assets/Roundel_flag_of_Turkey.svg.png";
import circle_check from "../../assets/circle-check-1.png";
import circle_x from "../../assets/circle-x.png";
import selectedRadio from "../../assets/Group 312.svg";
import Radio from "../../assets/Group 323.svg";
import clock_exclamation from "../../assets/clock-exclamation.png";
import eye from "../../assets/eye.svg";
import "./CommentsManagement.css";
import { BiSolidCrown } from "react-icons/bi";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import cross from "../../assets/Group 81.svg";
import { MainDiv } from "../CommonBgRow";
import champicon from "../../assets/994_champions_league.svg";
import world from "../../assets/world-check.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CommentsManagementFilter from "../CommentsManagementFilter/CommentsManagementFilter";

const CommentsManagement = () => {
  const [isPublicSelected, setIsPublicSelected] = useState(false);
  const [isSubscriberSelected, setIsSubscriberSelected] = useState(false);
  const [isWinningSelected, setIsWinningSelected] = useState(false);
  const [isLosingSelected, setIsLosingSelected] = useState(false);
  const [isPublishedSelected, setIsPublishedSelected] = useState(false);
  const [isPendingSelected, setIsPendingSelected] = useState(false);
  const [isFinishedSelected, setIsFinishedSelected] = useState(false);
  const [isNotStartedSelected, setIsNotStartedSelected] = useState(false);

  const [AllDropdown, setAllDropdown] = useState(false);
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select");

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };

  const toggleCountryDropdown = () => {
    if (categoryDropdown) {
      setCountryDropDown(false);
    }
    if (leagueDropdown) {
      setLeagueDropdown(false);
    }
    if (dateDropdown) {
      setDateDropdown(false);
    }
    setCountryDropDown(!countryDropDown);
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

  const categoryOptions = ["Category 1", "Category 2", "Category 3"];
  const dateOptions = ["Date 1", "Date 2", "Date 3"];
  const leagueOptions = ["League 1", "League 2", "League 3"];

  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select");
  const [dateDropdown, setDateDropdown] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("Select");
  const [leagueDropdown, setLeagueDropdown] = useState(false);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };
  const toggleCategoryDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (leagueDropdown) {
      setLeagueDropdown(false);
    }
    if (dateDropdown) {
      setDateDropdown(false);
    }
    setCategoryDropdown(!categoryDropdown);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };
  const toggleDateDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (leagueDropdown) {
      setLeagueDropdown(false);
    }
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    setDateDropdown(!dateDropdown);
  };

  const handleLeagueSelection = (league) => {
    setSelectedLeague(league);
  };
  const toggleLeagueDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (dateDropdown) {
      setDateDropdown(false);
    }
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    setLeagueDropdown(!leagueDropdown);
  };
  const matchDetailsOptions = [
    "Match Details 1",
    "Match Details 2",
    "Match Details 3",
  ];
  const predictionTypeOptions = [
    "Prediction Type 1",
    "Prediction Type 2",
    "Prediction Type 3",
  ];
  const predictionOptions = ["Prediction 1", "Prediction 2", "Prediction 3"];

  const [selectedMatchDetails, setSelectedMatchDetails] = useState("Select");
  const [matchDetailsDropdown, setMatchDetailsDropdown] = useState(false);
  const [selectedPredictionType, setSelectedPredictionType] =
    useState("Select");
  const [predictionTypeDropdown, setPredictionTypeDropdown] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState("Select");
  const [predictionDropdown, setPredictionDropdown] = useState(false);

  const handleMatchDetailsSelection = (matchDetails) => {
    setSelectedMatchDetails(matchDetails);
  };
  const toggleMatchDetailsDropdown = () => {
    if (predictionTypeDropdown) {
      setPredictionTypeDropdown(false);
    }
    if (predictionDropdown) {
      setPredictionDropdown(false);
    }
    setMatchDetailsDropdown(!matchDetailsDropdown);
  };
  const handlePredictionTypeSelection = (predictionType) => {
    setSelectedPredictionType(predictionType);
  };
  const togglePredictionTypeDropdown = () => {
    if (matchDetailsDropdown) {
      setMatchDetailsDropdown(false);
    }
    if (predictionDropdown) {
      setPredictionDropdown(false);
    }
    setPredictionTypeDropdown(!predictionTypeDropdown);
  };

  const handlePredictionSelection = (prediction) => {
    setSelectedPrediction(prediction);
  };
  const togglePredictionDropdown = () => {
    if (predictionTypeDropdown) {
      setPredictionTypeDropdown(false);
    }
    if (matchDetailsDropdown) {
      setMatchDetailsDropdown(false);
    }
    setPredictionDropdown(!predictionDropdown);
  };

  const users = [
    {
      sr: "#0001",
      name: "john Doe",
      username: "johndoe",
      flag: flag,
      league: "Süper Lig",
      date: "15-06-.2023 - 16:37",
      role: "Antalyaspor - Başakşehir",
      profile: user1,
      status: circle_check,
    },
    {
      sr: "#0002",
      name: "john Doe",
      username: "johndoe",
      flag: UKflag,
      league: "Championship",
      date: "15-06-.2023 - 16:37",
      role: "Sheffield United - West Bromwich",
      profile: user2,
      status: clock_exclamation,
    },
    {
      sr: "#0003",
      name: "john Doe",
      username: "johndoe",
      flag: flag,
      league: "Süper Lig",
      date: "15-06-.2023 - 16:37",
      role: "Antalyaspor - Başakşehir",
      profile: user3,
      status: circle_x,
    },
    {
      sr: "#0004",
      name: "john Doe",
      username: "johndoe",
      flag: UKflag,
      league: "Championship",
      date: "15-06-.2023 - 16:37",
      role: "Sheffield United - West Bromwich",
      profile: user4,
      status: circle_check,
    },
  ];
  return (
    <>
      <div
        className="dark-mode p-2 m-2 mb-0 home-height"
      >
        <CommentsManagementFilter />
        {users.map((res, index) => (
          <MainDiv>
            <div className="col-3 d-flex align-items-center cursor" data-bs-toggle="modal" data-bs-target="#filter">
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
                  className="position-absolute d-flex justify-content-center align-items-center"
                  style={{
                    height: "16px",
                    width: "16px",
                    border: "2px solid #FF9100",
                    borderRadius: "50%",
                    backgroundColor: "#0B2447",
                    top: "0px",
                    left: "25px",
                  }}
                >
                  <BiSolidCrown
                    fontSize={"0.62rem"}
                    style={{ color: "#FF9100" }}
                  />
                </div>
              </div>
              <span className="ps-2">{res.name}</span>
            </div>
            <div className="col-2">
              <img
                className="flag-icon"
                src={res.flag}
                alt=""
                height={26}
                width={26}
              />
              <span className="ps-1">{res.league}</span>
            </div>
            <div className="col-4 ps-2">{res.role}</div>
            <div className="col-3 justify-content-end d-flex">
              <span className="pe-1">{res.date}</span>
              <img
                className="eye-icon"
                src={res.status}
                alt=""
                height={23}
                width={23}
              />
              <img
                className="eye-icon"
                src={eye}
                alt=""
                height={23}
                width={23}
              />
            </div>
          </MainDiv>
        ))}
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body dark-mode">
              <div
                className="row g-0 my-3 gap-3 position-relative"
                style={{ fontSize: "15px" }}
              >
                <div className="col">
                  <CustomDropdown
                    label="Category"
                    options={categoryOptions}
                    selectedOption={selectedCategory}
                    onSelectOption={handleCategorySelection}
                    isOpen={categoryDropdown}
                    toggleDropdown={toggleCategoryDropdown}
                  />
                </div>
                <div className="col">
                  <div className="my-2">
                    <span>Country</span>
                    <div
                      className="customDropdown-dark-mode p-1 text-center"
                      onClick={toggleCountryDropdown}
                    >
                      <span>{selectedCountry}</span>
                    </div>
                    <div
                      className={`
                       customDropdown-content-dark-mode
                       pt-2 flex-column d-flex text-center ${
                         countryDropDown ? "d-block" : "d-none"
                       }`}
                      style={{
                        width: "46%",
                      }}
                    >
                      {countryOptions.map((option, index) => (
                        <span
                          className="dpcontent-dark-mode my-1 p-2"
                          key={index}
                          onClick={() => {
                            handleCountrySelection(option);
                            toggleCountryDropdown();
                          }}
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row g-0 my-3 gap-3 position-relative"
                style={{ fontSize: "15px" }}
              >
                {/* <div className="row my-3" style={{ fontSize: "15px" }}> */}
                <div className="col">
                  <CustomDropdown
                    label="League"
                    options={leagueOptions}
                    selectedOption={selectedLeague}
                    onSelectOption={handleLeagueSelection}
                    isOpen={leagueDropdown}
                    toggleDropdown={toggleLeagueDropdown}
                  />
                </div>
                <div className="col">
                  <CustomDropdown
                    label="Date"
                    options={dateOptions}
                    selectedOption={selectedDate}
                    onSelectOption={handleDateSelection}
                    isOpen={dateDropdown}
                    toggleDropdown={toggleDateDropdown}
                  />
                </div>
              </div>
              <div
                className="my-3 position-relative"
                style={{ fontSize: "14px" }}
              >
                <CustomDropdown
                  label="Match Details"
                  options={matchDetailsOptions}
                  selectedOption={selectedMatchDetails}
                  onSelectOption={handleMatchDetailsSelection}
                  isOpen={matchDetailsDropdown}
                  toggleDropdown={toggleMatchDetailsDropdown}
                />
              </div>
              <div
                className="row g-0 my-3 gap-3 position-relative"
                style={{ fontSize: "14px" }}
              >
                <div className="col">
                  <CustomDropdown
                    label="Level"
                    options={predictionOptions}
                    selectedOption={selectedPrediction}
                    onSelectOption={handlePredictionSelection}
                    isOpen={predictionDropdown}
                    toggleDropdown={togglePredictionDropdown}
                  />
                </div>
                <div className="col">
                  <CustomDropdown
                    label="Prediction Type"
                    options={predictionTypeOptions}
                    selectedOption={selectedPredictionType}
                    onSelectOption={handlePredictionTypeSelection}
                    isOpen={predictionTypeDropdown}
                    toggleDropdown={togglePredictionTypeDropdown}
                  />
                </div>
              </div>
              <div className="">
                http://localhost:3000/subuser/http://localhost:3000/subuser/
                <div className="d-flex justify-content-between my-2">
                  <div className="">
                    <img
                      onClick={() => setIsWinningSelected(!isWinningSelected)}
                      src={isWinningSelected ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <span className="px-2">Winning</span>
                  </div>
                  <div className="">
                    <span className="px-2">Losing</span>
                    <img
                      onClick={() => setIsLosingSelected(!isLosingSelected)}
                      src={isLosingSelected ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="">
                    <img
                      onClick={() =>
                        setIsPublishedSelected(!isPublishedSelected)
                      }
                      src={isPublishedSelected ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <span className="px-2">Published</span>
                  </div>
                  <div className="">
                    <span className="px-2">Pending</span>
                    <img
                      onClick={() => setIsPendingSelected(!isPendingSelected)}
                      src={isPendingSelected ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <div className="">
                    <img
                      onClick={() => setIsFinishedSelected(!isFinishedSelected)}
                      src={isFinishedSelected ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <span className="px-2">Finished</span>
                  </div>
                  <div className="">
                    <span className="px-2">Not Started</span>
                    <img
                      onClick={() =>
                        setIsNotStartedSelected(!isNotStartedSelected)
                      }
                      src={isNotStartedSelected ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
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
      </div>

            {/* <!-- Modal --> */}
            <div
        class="modal fade"
        id="filter"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="filterLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body dark-mode p-3">
              <div
                className="p-1"
                style={{
                  backgroundColor: "#0B2447",
                  fontSize: "13px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center gap-1">
                  <span>
                    <img
                      className=""
                      src={champicon}
                      alt=""
                      height={26}
                      width={26}
                    />
                    <span className="ps-1">Champions League</span>
                  </span>
                  <span style={{ paddingRight: "47px" }}>07.05.2023</span>
                  <span>
                    Public Content
                    <img src={`${world}`} alt="" height={26} width={26} />
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <span className="mt-2 pt-1">Galatasaray FC</span>
                  <div
                    className="px-2"
                    style={{
                      width: "66px",
                      height: "38px",
                    }}
                  >
                    <CircularProgressbar
                      circleRatio={0.75}
                      strokeWidth={3}
                      value={100}
                      text="14:30"
                      styles={buildStyles({
                        rotation: 1 / 2 + 1 / 8,
                        textColor: "#E6E6E6",
                        textSize: "26px",
                        paddingRight: "0px",
                        pathColor: "#E6E6E6",
                      })}
                    />
                  </div>
                  <span className="mt-2 pt-1">Real Madrid</span>
                </div>
                <div className="text-end mt-3 mb-2">
                  <span
                    className={`p-1  "px-2"}`}
                    style={{
                      backgroundColor: "#00659D",
                      color: "#FFFFFF",
                      fontSize: "12px",
                    }}
                  >
                    <span className="pe-1" style={{ borderRight: "2px solid #0B2447" }}>
                      FT - Home - 2.5 Over
                    </span>
                    <span className="ps-1">2.40</span>
                  </span>
                </div>
              </div>
              <div className="my-2">
                <textarea
                  style={{ height: "100px", fontSize:"0.8rem" }}
                  className="darkMode-input form-control"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  eleifend vehicula tristique. Suspendisse vitae lectus sed
                  massa interdum consectetur. Pellentesque habitant morbi
                  tristique senectus et netus et malesuada fames ac turpis
                  egestas. Integer auctor nisl in lacus fringilla, et tincidunt
                  ex laoreet.
                </textarea>
              </div>
              <div className="my-3 d-flex justify-content-center gap-3">
                <div className="">
                  <button className="px-3" style={{color:"#D2DB08", backgroundColor:"transparent", border:"1px solid #D2DB08", borderRadius:"4px"}}>Publish</button>
                </div>
                <div className="">
                  <button className="px-3" style={{color:"#FF5757", backgroundColor:"transparent", border:"1px solid #FF5757", borderRadius:"4px"}}>Reject</button>
                </div>
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

export default CommentsManagement;
