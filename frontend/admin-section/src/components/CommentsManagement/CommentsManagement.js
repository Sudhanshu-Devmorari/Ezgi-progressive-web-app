import React, { useEffect, useState } from "react";
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
import moment from "moment";
import axios from "axios";
import config from "../../config";
import initialProfile from "../../assets/profile.png";

const CommentsManagement = (props) => {
  const [fData, setFdata] = useState({});
  const [status, setStatus] = useState("");
  const [secondStatus, setSecondStatus] = useState("");
  const [thirdStatus, setThirdStatus] = useState("");
  const [fourthStatus, setFourthStatus] = useState("");

  const [currentData, setCurrentData] = useState([]);
  const [selectedMatchDetails, setSelectedMatchDetails] = useState("Select");
  const [matchDetailsDropdown, setMatchDetailsDropdown] = useState(false);
  const [selectedPredictionType, setSelectedPredictionType] =
    useState("Select");
  const [predictionTypeDropdown, setPredictionTypeDropdown] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState("Select");
  const [predictionDropdown, setPredictionDropdown] = useState(false);
  // Get League / Date / Match details
  const [LeagueValue, setLeagueValue] = useState([]);
  const [DateValue, setDateValue] = useState([]);
  const [MatchdetailsValue, setMatchdetailsValue] = useState([]);

  const [displayUser, setDisplayUser] = useState(props?.commentData);
  useEffect(() => {
    setDisplayUser(props?.commentData);
  }, [props?.commentData]);

  const handleFilterState = () => {
    setSelectedCategory('Select')
    setSelectedCountry('Select')
    setSelectedDate('Select')
    setSelectedLeague('Select')
    setSelectedMatchDetails('Select')
    setSelectedPrediction('Select')
    setSelectedPredictionType('Select')
    setStatus("")
    setSecondStatus("")
  }

  const updateCommentApiData = async () => {
    const user_id = localStorage.getItem("admin-user-id");
    await axios
      .post(`${config?.apiUrl}/filter-comments/${user_id}/`, {
        category: selectedCategory,
        country: selectedCountry,
        league: selectedLeague,
        date: selectedDate,
        match_detail: selectedMatchDetails,
        level: selectedPrediction,
        prediction_type: selectedPredictionType,
        filter_type: status,
        filter_type0: secondStatus,
      })
      .then((res) => {
        // console.log(res.data,"=====>>filter");
        setFdata(res.data);
        setDisplayUser(res.data);
        handleFilterState()
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      });
  };

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
  const handleStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `${config?.apiUrl}/comments-management/${id}/`,
        { status: `${status}` }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
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

  useEffect(() => {
    const fetchData = async () => {
      const data1 = await cityApiData1();
      const data2 = await cityApiData2();
      const combinedCities = [...data1, ...data2];
      setCities(combinedCities);
    };

    fetchData();
  }, []);

  const [countryOptions, setCountryOptions] = useState([]);
  // const countryOptions = cities;
  const categoryOptions = ["Futbol", "Basketbol"];
  // const categoryOptions = ["Football", "Basketball"];
  // const dateOptions = ["Date 1", "Date 2", "Date 3"];
  const dateOptions = DateValue;
  // const leagueOptions = ["League 1", "League 2", "League 3"];
  const leagueOptions = LeagueValue;

  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select");
  const [dateDropdown, setDateDropdown] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("Select");
  const [leagueDropdown, setLeagueDropdown] = useState(false);
  const [categoryType, setCategoryType] = useState(null);
  const [matchId, setMatchId] = useState([]);
  const [predictionType, setPredictionType] = useState([]);

  useEffect(() => {
    async function getCountryOptions() {
      if (selectedCategory !== "Select") {
        try {
          const headers = {
            Authorization: `Bearer ${process.env.REACT_APP_NOISYAPIKEY}`,
          };
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

  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_NOISYAPIKEY}`,
  };

  useEffect(() => {
    async function getLeague() {
      try {
        const res = await axios.get(
          `https://www.nosyapi.com/apiv2/bets/getMatchesLeague?type=${categoryType}&country=${selectedCountry}`,
          { headers }
        );
        const leagueValue = res.data.data.map((item) => item.league);
        setLeagueValue(leagueValue);
      } catch (e) {}
    }
    getLeague();
  }, [selectedCountry]);
  useEffect(() => {
    async function getDate() {
      try {
        const res = await axios.get(
          `https://www.nosyapi.com/apiv2/bets/getMatchesDateList?type=${categoryType}&league=${selectedLeague}`,
          { headers }
        );
        setDateValue(res?.data?.data.map((item) => item.date));
      } catch (e) {}
    }
    getDate();
  }, [selectedLeague]);
  useEffect(() => {
    async function getMatch() {
      try {
        const res = await axios.get(
          `https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=${categoryType}&league=${selectedLeague}&t=${selectedDate}`,
          { headers }
        );
        setMatchdetailsValue(res?.data?.data?.map((item) => item.takimlar));
      } catch (e) {}
    }
    getMatch();
  }, [selectedDate]);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };
  const toggleCategoryDropdown = () => {
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setDateDropdown(false);
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCategoryDropdown(!categoryDropdown);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };
  const toggleDateDropdown = () => {
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCategoryDropdown(false);
    setDateDropdown(!dateDropdown);
  };

  const handleLeagueSelection = (league) => {
    setSelectedLeague(league);
  };
  const toggleLeagueDropdown = () => {
    setCountryDropDown(false);
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCategoryDropdown(false);
    setDateDropdown(false);
    setLeagueDropdown(!leagueDropdown);
  };
  const matchDetailsOptions = [
    "Match Details 1",
    "Match Details 2",
    "Match Details 3",
  ];
  const predictionTypeOptions = predictionType;
  const predictionOptions = [
    "Apprentice",
    "Journeyman",
    "Expert",
    "Grandmaster",
  ];

  const handleMatchDetailsSelection = (matchDetails) => {
    setSelectedMatchDetails(matchDetails);
  };
  const toggleMatchDetailsDropdown = () => {
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCategoryDropdown(false);
    setDateDropdown(false);
    setMatchDetailsDropdown(!matchDetailsDropdown);
  };
  const handlePredictionTypeSelection = (predictionType) => {
    setSelectedPredictionType(predictionType);
  };
  const togglePredictionTypeDropdown = () => {
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setCategoryDropdown(false);
    setDateDropdown(false);
    setPredictionTypeDropdown(!predictionTypeDropdown);
  };

  const handlePredictionSelection = (prediction) => {
    setSelectedPrediction(prediction);
  };
  const togglePredictionDropdown = () => {
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setMatchDetailsDropdown(false);
    setPredictionTypeDropdown(false);
    setCategoryDropdown(false);
    setDateDropdown(false);
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

  useEffect(() => {
    const fetchData = async () => {
      let type;
      if (selectedMatchDetails !== "Select") {
        if (selectedCategory === "Futbol") {
          type = 1;
        } else if (selectedCategory === "Basketbol") {
          type = 2;
        }

        try {
          const res11 = await axios.get(
            `https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=${type}&league=${selectedLeague}&t=${selectedDate}`,
            { headers }
          );
          const matchIds = res11?.data?.data.map((item) => item.MatchID);
          setMatchId(matchIds);

          const predictionsPromises = matchIds.map(async (val) => {
            const predictions = await axios.get(
              `https://www.nosyapi.com/apiv2/service/bettable-matches/detailsCustomv2?matchID=${val}`,
              { headers }
            );
            return predictions.data.data.gameType; // Assuming you want to return the data from each API call
          });

          // Wait for all API calls to complete
          const predictionsData = await Promise.all(predictionsPromises);

          // Flatten and remove duplicates from the predictionsData array
          const uniquePredictions = [...new Set(predictionsData.flat())];

          // console.log("Unique Predictions:", uniquePredictions);
          // Now you can work with the uniquePredictions array as needed
          setPredictionType(uniquePredictions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [
    selectedMatchDetails,
    selectedCategory,
    selectedLeague,
    selectedDate,
    headers,
  ]);

  const server_url = `${config?.apiUrl}`;
  return (
    <>
      <div className="dark-mode p-2 m-2 mb-0 home-height">
        <CommentsManagementFilter
          commentData={props?.commentData}
          setDisplayUser={setDisplayUser}
        />
        {props?.isLoading ? (
          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
            Loading...
          </div>
        ) : (
          <>
            {displayUser?.map((res, index) => (
              <MainDiv>
                <div className="col-3 d-flex align-items-center cursor">
                <span className="pe-1">{`# ${(index + 1)
                          .toString()
                          .padStart(4, "0")}`}</span>
                  <div className="position-relative">
                    <img
                      className="rounded-circle profile-icon"
                      src={`${
                        res.commentator_user?.profile_pic
                          ? server_url + res.commentator_user?.profile_pic
                          : initialProfile
                      }`}
                      alt=""
                      height={45}
                      width={45}
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
                  <span className="ps-2">{res.commentator_user?.name}</span>
                </div>
                <div className="col-2">
                  <img
                    className="flag-icon"
                    src={flag}
                    alt=""
                    height={26}
                    width={26}
                  />
                  <span className="ps-1">{res.league}</span>
                </div>
                <div className="col-4 ps-2">{res.match_detail}</div>
                <div className="col-3 justify-content-end d-flex">
                  <span className="pe-1">
                    {moment(res.date).format("DD-MM.YYYY - HH:mm")}
                  </span>
                  <img
                    className="eye-icon"
                    src={circle_check}
                    alt=""
                    height={23}
                    width={23}
                  />
                  <img
                    onClick={() => setCurrentData(res)}
                    data-bs-toggle="modal"
                    data-bs-target="#filter"
                    className="eye-icon cursor"
                    src={eye}
                    alt=""
                    height={23}
                    width={23}
                  />
                </div>
              </MainDiv>
            ))}
          </>
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body dark-mode">
              <div
                className="row g-0 my-3 gap-3 position-relative"
                style={{ fontSize: "15px" }}
              >
                <div className="col cursor">
                  <CustomDropdown
                    label="Category"
                    options={categoryOptions}
                    selectedOption={selectedCategory}
                    onSelectOption={handleCategorySelection}
                    isOpen={categoryDropdown}
                    toggleDropdown={toggleCategoryDropdown}
                  />
                </div>
                <div className="col cursor">
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
                <div className="col cursor">
                  <CustomDropdown
                    label="League"
                    options={leagueOptions}
                    selectedOption={selectedLeague}
                    onSelectOption={handleLeagueSelection}
                    isOpen={leagueDropdown}
                    toggleDropdown={toggleLeagueDropdown}
                  />
                </div>
                <div className="col cursor">
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
                className="my-3 position-relative cursor"
                style={{ fontSize: "14px" }}
              >
                <CustomDropdown
                  label="Match Details"
                  options={MatchdetailsValue}
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
                <div className="col cursor">
                  <CustomDropdown
                    label="Level"
                    options={predictionOptions}
                    selectedOption={selectedPrediction}
                    onSelectOption={handlePredictionSelection}
                    isOpen={predictionDropdown}
                    toggleDropdown={togglePredictionDropdown}
                  />
                </div>
                <div className="col cursor">
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
                <div className="d-flex justify-content-between my-2">
                  <div className="">
                    <img
                      onClick={() => {
                        setIsPublicSelected(!isPublicSelected);
                        setStatus("public_content");
                      }}
                      src={status == "public_content" ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <span className="px-2">Only Public</span>
                  </div>
                  <div className="">
                    <span className="px-2">Only Subscribers</span>
                    <img
                      onClick={() => {
                        setIsSubscriberSelected(!isSubscriberSelected);
                        setSecondStatus("only_subscriber");
                      }}
                      src={
                        secondStatus == "only_subscriber"
                          ? selectedRadio
                          : Radio
                      }
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <div className="">
                    <img
                      onClick={() => {
                        setIsWinningSelected(!isWinningSelected);
                        setStatus("winning");
                      }}
                      src={status == "winning" ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <span className="px-2">Winning</span>
                  </div>
                  <div className="">
                    <span className="px-2">Losing</span>
                    <img
                      onClick={() => {
                        setIsLosingSelected(!isLosingSelected);
                        setSecondStatus("lose");
                      }}
                      src={secondStatus == "lose" ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="">
                    <img
                      onClick={() => {
                        setIsPublishedSelected(!isPublishedSelected);
                        setStatus("published");
                      }}
                      src={status == "published" ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <span className="px-2">Published</span>
                  </div>
                  <div className="">
                    <span className="px-2">Pending</span>
                    <img
                      onClick={() => {
                        setIsPendingSelected(!isPendingSelected);
                        setSecondStatus("pending");
                      }}
                      src={secondStatus == "pending" ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <div className="">
                    <img
                      onClick={() => {
                        setIsFinishedSelected(!isFinishedSelected);
                        setStatus("finished");
                      }}
                      src={status == "finished" ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <span className="px-2">Finished</span>
                  </div>
                  <div className="">
                    <span className="px-2">Not Started</span>
                    <img
                      onClick={() => {
                        setIsNotStartedSelected(!isNotStartedSelected);
                        setSecondStatus("not_stated");
                      }}
                      src={secondStatus == "not_stated" ? selectedRadio : Radio}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center my-2">
                  <button
                    onClick={updateCommentApiData}
                    data-bs-dismiss="modal"
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
                  setCategoryDropdown(false);
                  setCountryDropDown(false);
                  setLeagueDropdown(false);
                  setDateDropdown(false);
                  setMatchDetailsDropdown(false);
                  setPredictionDropdown(false);
                  setPredictionTypeDropdown(false);
                  setStatus("");
                  setSecondStatus("");
                  setThirdStatus("");
                  setFourthStatus("");
                  handleFilterState()
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
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="filter"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="filterLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body dark-mode p-3">
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
                    <span className="ps-1">{currentData.league}</span>
                  </span>
                  <span style={{ paddingRight: "47px" }}>
                    {moment(currentData.date).format("DD-MM.YYYY")}
                  </span>
                  {currentData.public_content == true && (
                    <span>
                      Public Content
                      <img src={`${world}`} alt="" height={26} width={26} />
                    </span>
                  )}
                  {currentData.public_content == false && (
                    <span>
                      <p src="" alt="" height={26} width={26} />
                    </span>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <span className="mt-2 pt-1">
                    {currentData?.match_detail?.split(" - ")[0]}
                  </span>
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
                  <span className="mt-2 pt-1">
                    {currentData?.match_detail?.split(" - ")[1]}
                  </span>
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
                    <span
                      className="pe-1"
                      style={{ borderRight: "2px solid #0B2447" }}
                    >
                      FT - Home - 2.5 Over
                    </span>
                    <span className="ps-1">2.40</span>
                  </span>
                </div>
              </div>
              <div className="my-2">
                <textarea
                  value={currentData.comment}
                  style={{ height: "100px", fontSize: "0.8rem" }}
                  className="darkMode-input form-control"
                ></textarea>
              </div>
              <div className="my-3 d-flex justify-content-center gap-3">
                <div className="">
                  <button
                    data-bs-dismiss="modal"
                    onClick={() => handleStatus(currentData.id, "approve")}
                    className="px-3"
                    style={{
                      color: "#D2DB08",
                      backgroundColor: "transparent",
                      border: "1px solid #D2DB08",
                      borderRadius: "4px",
                    }}
                  >
                    Publish
                  </button>
                </div>
                <div className="">
                  <button
                    data-bs-dismiss="modal"
                    onClick={() => handleStatus(currentData.id, "reject")}
                    className="px-3"
                    style={{
                      color: "#FF5757",
                      backgroundColor: "transparent",
                      border: "1px solid #FF5757",
                      borderRadius: "4px",
                    }}
                  >
                    Reject
                  </button>
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
