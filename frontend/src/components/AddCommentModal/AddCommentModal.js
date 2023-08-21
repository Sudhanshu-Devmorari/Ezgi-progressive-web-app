import React, { useContext, useEffect, useState } from "react";
import { CommentFilter } from "../CommentFilter/CommentFilter";
import Modal from "react-bootstrap/Modal";
import { RxCross2 } from "react-icons/rx";
import "./AddCommentModal.css";
import Form from "react-bootstrap/Form";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";
import CurrentTheme from "../../context/CurrentTheme";
import CheckBoxDark from "../../assets/Checkbox Unselected.svg";
import CheckBoxSelectDark from "../../assets/Checkbox Selected.svg";
import SelecttoggleinputDark from "../../assets/Group 711.png";
import toggleinputDark from "../../assets/Group 711.svg";
import toggleinputLight from "../../assets/Group 720.png";
import toggleinputLightSelected from "../../assets/Group 720_selected.png";
import { userId } from "../GetUser";
import axios from "axios";
import { headers } from "../AuthorizationBearer";
import { LeagueAPI } from "../GetLeagueAPI";
import { DateAPI } from "../GetDateAPI";
import { MatchDetailsAPI } from "../GetMatchDetailsAPI";
import Swal from "sweetalert2";

const AddCommentModal = (props) => {
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  // const matchDetailsOptions = [
  //   "Match Details 1",
  //   "Match Details 2",
  //   "Match Details 3",
  // ];
  const [matchDetailsOptions, setMatchDetailsOptions] = useState([]);
  const predictionTypeOptions = [
    "Prediction Type 1",
    "Prediction Type 2",
    "Prediction Type 3",
  ];
  const predictionOptions = ["Prediction 1", "Prediction 2", "Prediction 3"];
  const [countryOptions, setCountryOptions] = useState([]);
  // const countryOptions = [
  //   "India",
  //   "Turkey",
  //   "Paris",
  //   "Japan",
  //   "Germany",
  //   "USA",
  //   "UK",
  // ];

  const categoryOptions = ["Futbol", "Basketbol"];
  // const dateOptions = ["Date 1", "Date 2", "Date 3"];
  const [dateOptions, setDateOptions] = useState([]);
  // const leagueOptions = ["League 1", "League 2", "League 3"];
  const [leagueOptions, setLeagueOptions] = useState([]);

  const [selectedMatchDetails, setSelectedMatchDetails] = useState("Select");
  const [matchDetailsDropdown, setMatchDetailsDropdown] = useState(false);
  const [selectedPredictionType, setSelectedPredictionType] =
    useState("Select");
  const [predictionTypeDropdown, setPredictionTypeDropdown] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState("Select");
  const [predictionDropdown, setPredictionDropdown] = useState(false);
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select");
  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select");
  const [dateDropdown, setDateDropdown] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("Select");
  const [leagueDropdown, setLeagueDropdown] = useState(false);

  const handleMatchDetailsSelection = (matchDetails) => {
    setSelectedMatchDetails(matchDetails);
  };
  const toggleMatchDetailsDropdown = () => {
    MatchDetailsAPI(categoryType, selectedLeague, selectedDate)
      .then((res) => {
        // console.log(res.data, "========================res");
        const MatchList = res.data;
        setMatchDetailsOptions(MatchList.map((item) => item.takimlar));
      })
      .catch((err) => {});
    setPredictionTypeDropdown(false);
    setPredictionDropdown(false);
    setCountryDropDown(false);
    setDateDropdown(false);
    setCategoryDropdown(false);
    setLeagueDropdown(false);
    setMatchDetailsDropdown(!matchDetailsDropdown);
  };
  const handlePredictionTypeSelection = (predictionType) => {
    setSelectedPredictionType(predictionType);
  };
  const togglePredictionTypeDropdown = () => {
    setCountryDropDown(false);
    setDateDropdown(false);
    setCategoryDropdown(false);
    setLeagueDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(!predictionTypeDropdown);
  };

  const handlePredictionSelection = (prediction) => {
    setSelectedPrediction(prediction);
  };
  const togglePredictionDropdown = () => {
    setCountryDropDown(false);
    setDateDropdown(false);
    setCategoryDropdown(false);
    setLeagueDropdown(false);
    setPredictionTypeDropdown(false);
    setMatchDetailsDropdown(false);
    setPredictionDropdown(!predictionDropdown);
  };
  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };
  const toggleCountryDropdown = () => {
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCategoryDropdown(false);
    setLeagueDropdown(false);
    setDateDropdown(false);
    setCountryDropDown(!countryDropDown);
  };
  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };
  const toggleCategoryDropdown = () => {
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setDateDropdown(false);
    setCategoryDropdown(!categoryDropdown);
  };
  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };
  const toggleDateDropdown = () => {
    DateAPI(categoryType, selectedLeague)
      .then((res) => {
        // console.log(res.data, "========================res date");
        const DateList = res.data;
        setDateOptions(DateList.map((item) => item.date));
      })
      .catch((error) => {});
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setCategoryDropdown(false);
    setDateDropdown(!dateDropdown);
  };

  const handleLeagueSelection = (league) => {
    setSelectedLeague(league);
  };
  const toggleLeagueDropdown = () => {
    LeagueAPI(categoryType, selectedCountry)
      // console.log(res,"========================res leauge");
      // const LeagueList = res.data;
      .then((res) => {
        // console.log(res, "========================res leauge");
        const LeagueList = res.data;
        setLeagueOptions(LeagueList.map((item) => item.league));
      })
      .catch((error) => {});
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCountryDropDown(false);
    setDateDropdown(false);
    setCategoryDropdown(false);
    setLeagueDropdown(!leagueDropdown);
  };

  const [toggleInput, setToggleInput] = useState(false);

  const [termsOfUseShow, setTermsOfUseShow] = useState(false);

  const [commentText, setcommentText] = useState("");

  const [categoryError, setCategoryError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [leagueError, setLeagueError] = useState("");
  const [dateError, setDateError] = useState("");
  const [matchDetailsError, setMatchDetailsError] = useState("");
  const [predictionTypeError, setPredictionTypeError] = useState("");
  const [predictionError, setPredictionError] = useState("");
  const [commentError, setCommentError] = useState("");

  function closeModal() {
    setCategoryError("");
    setCountryError("");
    setLeagueError("");
    setDateError("");
    setMatchDetailsError("");
    setPredictionTypeError("");
    setPredictionError("");
    setCommentError("");
    props.onHide();
  }

  // Get Country from Category
  const [categoryType, setCategoryType] = useState(null);
  useEffect(() => {
    async function getCountryOptions() {
      if (selectedCategory !== "Select") {
        try {
          let type;
          if (selectedCategory === "Futbol") {
            type = 1;
          } else if (selectedCategory === "Basketbol") {
            type = 2;
          }
          setCategoryType(type);
          const res = await axios.get(
            `https://www.nosyapi.com/apiv2/bets/getMatchesCountryList?type=${type}`,
            { headers }
          );
          const countryData = res.data.data;
          setCountryOptions(countryData.map((item) => item.country));
        } catch (error) {
          console.log(error);
        }
      }
    }
    getCountryOptions();
  }, [selectedCategory]);

  // Get League / Date / Match details
  // const [LeagueValue, setLeagueValue] = useState("");
  // const [DateValue, setDateValue] = useState("");
  // const [MatchdetailsValue, setMatchdetailsValue] = useState("");
  // useEffect(() => {
  //   async function getLeague() {
  //     if (selectedCountry !== "Select") {
  //       try {
  //         contriesAPi(categoryType, selectedCountry);
  //         const res = await axios.get(
  //           `https://www.nosyapi.com/apiv2/bets/getMatchesLeague?type=${categoryType}&country=${selectedCountry}`,
  //           { headers }
  //         );
  //         console.log("res=>>>>>>", res.data);
  //         console.log("res=>>>>>>", res?.data?.data[0]?.league);
  //         const leagueValue = res?.data?.data[0]?.league;
  //         console.log("League Value from API:", leagueValue);
  //         setLeagueValue(leagueValue);
  //         if (leagueValue !== "") {
  //           const res = await axios.get(
  //             `https://www.nosyapi.com/apiv2/bets/getMatchesDateList?type=${categoryType}&league=${leagueValue}`,
  //             { headers }
  //           );
  //           setDateValue(res?.data?.data[0]?.date);
  //           const date = res?.data?.data[0]?.date;
  //           const res1 = await axios.get(
  //             `https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=${categoryType}&league=${leagueValue}&t=${date}`,
  //             { headers }
  //           );
  //           console.log("===??????>>>>>..", res1?.data?.data[0]?.takimlar);
  //           setMatchdetailsValue(res1?.data?.data[0]?.takimlar);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   getLeague();
  // }, [selectedCountry]);

  // Add Comment pr Post comment API
  const postComment = async () => {
    if (selectedCategory === "Select") {
      setCategoryError("Required*");
    }
    if (countryOptions === "Select") {
      setCountryError("Required*");
    }
    if (selectedLeague === "Select") {
      setLeagueError("Required*");
    }
    if (selectedDate === "Select") {
      setDateError("Required*");
    }
    if (selectedMatchDetails === "Select") {
      setMatchDetailsError("Required*");
    }
    // if (selectedPredictionType === "Select") {
    //   setPredictionTypeError("Required*");
    // }
    // if (selectedPrediction === "Select") {
    //   setPredictionError("Required*");
    // }
    if (commentText === "") {
      setCommentError("Required*");
    }
    if (selectCheckBox) {
      console.log(toggleInput, "========================toggleInput");
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/post-comment/${userId}`,
          {
            category: selectedCategory,
            country: selectedCountry,
            league: selectedLeague,
            date: selectedDate,
            match_detail: selectedMatchDetails,
            prediction_type: selectedPredictionType,
            prediction: selectedPrediction,
            public_content: toggleInput,
            comment: commentText,
          }
        );
        console.log("res", res);
        if (res.data.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Level Rules setting Updated!",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.data.message);
        if (error.response.status === 404){
          console.log("KKKK");
          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            backdrop: false,
            customClass: currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          });
        }
      }
    }
  };

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
        {termsOfUseShow ? (
          <Modal.Body
            className={`${currentTheme === "dark" ? "dark-mode" : "ligh-mode"}`}
          >
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
                      setTermsOfUseShow(!termsOfUseShow);
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
                      closeModal();
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
                    setTermsOfUseShow(!termsOfUseShow);
                  }}
                >
                  Approve
                </button>
              </div>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body
            className={`${currentTheme === "dark" ? "dark-mode" : "ligh-mode"}`}
          >
            <div className="">
              <span className="mb-2">
                <RxCross2
                  onClick={() => {
                    closeModal();
                  }}
                  fontSize={"1.8rem"}
                  className={`${
                    currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                  }`}
                />
              </span>
            </div>
            <div
              className="row g-0 my-3 gap-3 position-relative"
              style={{ fontSize: "15px" }}
            >
              <div className="col">
                <div className="my-2">
                  <span>Category</span>
                  <div
                    className={`${
                      currentTheme === "dark"
                        ? "customDropdown-dark-mode"
                        : "customDropdown-light-mode"
                    } p-1 text-center`}
                    onClick={toggleCategoryDropdown}
                  >
                    <span>{selectedCategory}</span>
                  </div>
                  <div
                    className={`${
                      currentTheme === "dark"
                        ? "customDropdown-content-dark-mode"
                        : "customDropdown-content-light-mode"
                    } pt-2 flex-column d-flex text-center ${
                      categoryDropdown ? "d-block" : "d-none"
                    }`}
                    style={{
                      width: "48%",
                    }}
                  >
                    {categoryOptions.map((option, index) => (
                      <span
                        className={`${
                          currentTheme === "dark"
                            ? "dpcontent-dark-mode"
                            : "dpcontent-light-mode"
                        } my-1 p-2`}
                        key={index}
                        onClick={() => {
                          handleCategorySelection(option);
                          toggleCategoryDropdown();
                        }}
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                  <small
                    className="text-danger"
                    style={{ fontSize: "0.78rem" }}
                  >
                    {categoryError}
                  </small>
                </div>
              </div>
              <div className="col">
                <div className="my-2">
                  <span>Country</span>
                  <div
                    className={`${
                      currentTheme === "dark"
                        ? "customDropdown-dark-mode"
                        : "customDropdown-light-mode"
                    } p-1 text-center`}
                    onClick={toggleCountryDropdown}
                  >
                    <span>{selectedCountry}</span>
                  </div>
                  <div
                    className={`${
                      currentTheme === "dark"
                        ? "customDropdown-content-dark-mode"
                        : "customDropdown-content-light-mode"
                    } pt-2 flex-column d-flex text-center ${
                      countryDropDown ? "d-block" : "d-none"
                    }`}
                    style={{
                      width: "46%",
                    }}
                  >
                    {countryOptions.map((option, index) => (
                      <span
                        className={`${
                          currentTheme === "dark"
                            ? "dpcontent-dark-mode"
                            : "dpcontent-light-mode"
                        } my-1 p-2`}
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
                  <small
                    className="text-danger"
                    style={{ fontSize: "0.78rem" }}
                  >
                    {countryError}
                  </small>
                </div>
              </div>
            </div>
            <div
              className="row g-0 my-3 gap-3 position-relative"
              // style={{ fontSize: "15px" }}
            >
              <div className="col">
                <CustomDropdown
                  label="League"
                  options={leagueOptions}
                  selectedOption={selectedLeague}
                  onSelectOption={handleLeagueSelection}
                  isOpen={leagueDropdown}
                  toggleDropdown={toggleLeagueDropdown}
                />
                {/* <div className="d-flex flex-column">
                  <label htmlFor="name">League</label>
                  <input
                    // style={{ fontSize: "12px" }}
                    value={LeagueValue}
                    required
                    className={`${
                      currentTheme === "dark"
                        ? "darkMode-input"
                        : "lightMode-input"
                    } form-control text-center`}
                    type="text"
                    name="name"
                    id="name"
                  />
                </div> */}
                <small className="text-danger" style={{ fontSize: "0.78rem" }}>
                  {leagueError}
                </small>
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
                {/* <div className="d-flex flex-column">
                  <label htmlFor="name">Date</label>
                  <input
                    value={DateValue}
                    required
                    className={`${
                      currentTheme === "dark"
                        ? "darkMode-input"
                        : "lightMode-input"
                    } form-control text-center`}
                    type="text"
                    name="Date"
                    id="Date"
                  />
                </div> */}
                <small className="text-danger" style={{ fontSize: "0.78rem" }}>
                  {dateError}
                </small>
              </div>
            </div>
            <div
              className="my-3 position-relative"
              // style={{ fontSize: "14px" }}
            >
              <CustomDropdown
                label="Match Details"
                options={matchDetailsOptions}
                selectedOption={selectedMatchDetails}
                onSelectOption={handleMatchDetailsSelection}
                isOpen={matchDetailsDropdown}
                toggleDropdown={toggleMatchDetailsDropdown}
              />
              {/* <div className="d-flex flex-column">
                <label htmlFor="name">Match Details</label>
                <input
                  value={MatchdetailsValue}
                  className={`${
                    currentTheme === "dark"
                      ? "darkMode-input"
                      : "lightMode-input"
                  } form-control text-center`}
                  type="text"
                  name="Match Details"
                  id="Match Details"
                />
              </div> */}
              <small className="text-danger" style={{ fontSize: "0.78rem" }}>
                {matchDetailsError}
              </small>
            </div>
            <div
              className="row g-0 my-3 gap-3 position-relative"
              // style={{ fontSize: "14px" }}
            >
              <div className="col">
                <CustomDropdown
                  label="Prediction Type"
                  options={predictionTypeOptions}
                  selectedOption={selectedPredictionType}
                  onSelectOption={handlePredictionTypeSelection}
                  isOpen={predictionTypeDropdown}
                  toggleDropdown={togglePredictionTypeDropdown}
                />
                {/* <div className="d-flex flex-column">
                  <label htmlFor="name">Prediction Type</label>
                  <input
                    required
                    className={`${
                      currentTheme === "dark"
                        ? "darkMode-input"
                        : "lightMode-input"
                    } form-control text-center`}
                    type="text"
                    name="Match Details"
                    id="Match Details"
                  />
                </div> */}
                <small className="text-danger" style={{ fontSize: "0.78rem" }}>
                  {predictionTypeError}
                </small>
              </div>
              <div className="col">
                <CustomDropdown
                  label="Prediction"
                  options={predictionOptions}
                  selectedOption={selectedPrediction}
                  onSelectOption={handlePredictionSelection}
                  isOpen={predictionDropdown}
                  toggleDropdown={togglePredictionDropdown}
                />
                {/* <div className="d-flex flex-column">
                  <label htmlFor="name">Prediction</label>
                  <input
                    required
                    className={`${
                      currentTheme === "dark"
                        ? "darkMode-input"
                        : "lightMode-input"
                    } form-control text-center`}
                    type="text"
                    name="Prediction"
                    id="Prediction"
                  />
                </div> */}
                <small className="text-danger" style={{ fontSize: "0.78rem" }}>
                  {predictionError}
                </small>
              </div>
            </div>
            <div className="">
              {currentTheme === "dark" ? (
                <img
                  onClick={() => setToggleInput(!toggleInput)}
                  src={!toggleInput ? SelecttoggleinputDark : toggleinputDark}
                  alt=""
                  height={23}
                  width={55}
                />
              ) : (
                <img
                  onClick={() => setToggleInput(!toggleInput)}
                  src={
                    !toggleInput ? toggleinputLight : toggleinputLightSelected
                  }
                  alt=""
                  height={23}
                  width={55}
                />
              )}
              <span className="ps-2">Public Content</span>
            </div>
            <div className="">
              <span style={{ fontSize: "10px" }}>
                Comment
                <span style={{ color: "#FF5757", fontSize: ".55rem" }}>
                  {" "}
                  ( If illegal content is detected, the membership will be
                  terminated. )
                </span>
              </span>
              <Form.Control
                onChange={(e) => {
                  setcommentText(e.target.value);
                }}
                as="textarea"
                maxLength={250}
                className={`${
                  currentTheme === "dark"
                    ? "textArea-dark-mode content-font"
                    : "textArea-light-mode content-font"
                }`}
              />
              <span style={{ fontSize: "10px" }}>
                Max. 250 character{" "}
                <small
                  className="text-danger ps-2"
                  style={{ fontSize: "0.78rem" }}
                >
                  {commentError}
                </small>
              </span>
            </div>

            <div className="text-center">
              <div className="my-3" style={{ fontSize: "13px" }}>
                {currentTheme === "dark" ? (
                  <img
                    alt=""
                    src={!selectCheckBox ? CheckBoxDark : CheckBoxSelectDark}
                    style={{ width: "25px", cursor: "pointer" }}
                    className="me-2"
                    onClick={() => setSelectCheckBox(!selectCheckBox)}
                  />
                ) : (
                  <img
                    src={!selectCheckBox ? CheckBoxLight : CheckBoxSelectLight}
                    style={{ width: "25px", cursor: "pointer" }}
                    className="me-2"
                    onClick={() => setSelectCheckBox(!selectCheckBox)}
                    alt=""
                  />
                )}
                I have read and agree to the{" "}
                <span
                  onClick={() => setTermsOfUseShow(!termsOfUseShow)}
                  style={{
                    color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                  }}
                >
                  Terms of use
                </span>
              </div>
              <div className="d-flex justify-content-center my-3">
                <button
                  onClick={postComment}
                  style={{ fontSize: "14px" }}
                  className={`${
                    currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                  } px-3 py-1`}
                >
                  Publish
                </button>
              </div>
              <div className="my-3" style={{ fontSize: "12px" }}>
                "The published predictions can be edited withis 5 minutes."
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default AddCommentModal;
