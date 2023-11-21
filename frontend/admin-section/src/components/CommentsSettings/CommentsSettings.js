import React, { useEffect, useState } from "react";
import selectedRadio from "../../assets/Group 312.svg";
import Radio from "../../assets/Group 323.svg";
import { CustomDropDownForCommentsCreatetion } from "../CustomDropDownForCommentsCreatetion";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import config from "../../config";
import { Cookies, useCookies } from "react-cookie";
import AxiosInstance from "../AxiosInstance";

const CommentsSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    Authorization: `Bearer ${"lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np"}`,
  };

  const [allBetsData, setAllBetsData] = useState([]);

  const [isPublicSelected, setIsPublicSelected] = useState(true);
  const [isSubscriberSelected, setIsSubscriberSelected] = useState(false);

  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Select");
  const [countryDropDown, setCountryDropDown] = useState(false);

  const [leagueOptions, setLeagueOptions] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("Select");
  const [leagueDropdown, setLeagueDropdown] = useState(false);

  const [matchDetailsOptions, setmatchDetailsOptions] = useState([]);
  const [matchId, setMatchId] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const [selectedMatchDetails, setSelectedMatchDetails] = useState("Select");
  const [matchDetailsDropdown, setMatchDetailsDropdown] = useState(false);

  const [editorOptions, setEditorOptions] = useState([]);
  const [selectedEditor, setSelectedEditor] = useState("Select");
  const [editorDropDown, setEditorDropDown] = useState(false);

  const categoryOptions = ["Futbol", "Basketbol"];
  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categoryDropDown, setCategoryDropDown] = useState(false);

  const [predictionTypeOptions, setPredictionTypeOptions] = useState([]);
  const [predictionOptions, setPredictionOptions] = useState([]);

  const [selectedPredictionType, setSelectedPredictionType] =
    useState("Select");
  const [predictionTypeDropdown, setPredictionTypeDropdown] = useState(false);

  const [selectedPrediction, setSelectedPrediction] = useState("Select");
  const [predictionDropdown, setPredictionDropdown] = useState(false);

  const [selectedDate, setSelectedDate] = useState("Select");
  const [dateOptions, setDateOptions] = useState([]);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [alluserData, setAlluserData] = useState([]);
  const [userCategory, setUserCategory] = useState([]);

  // const admin_id = localStorage.getItem("admin-user-id")
  const cookies = new Cookies();
  const admin_id = cookies.get("admin-user-id");
  
  const [setCookie, removeCookie] = useCookies();
  useEffect(() => {
    try {
      AxiosInstance
        .get(`${config.apiUrl}/all-users/?userType=commentator`)
        .then((res) => {
          const data = res?.data?.data;
          if (data.length === 0) {
            setEditorOptions(["Editor not found"]);
          } else {
            setAlluserData(res?.data?.data);
            const names = (res?.data?.data).map((user) => user.username);
            setEditorOptions(names);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLeagueSelection = async (league) => {
    setSelectedLeague(league);
    setDropdownError({
      ...dropdownError,
      league: "",
    });

    try {
      const res = await axios.get(
        `https://www.nosyapi.com/apiv2/bets/getMatchesDateList?type=${categoryType}&league=${league}`,
        { headers }
      );
      const DateList = await res.data.data;
      setDateOptions(DateList.map((item) => item.date));
      // console.log(res,"MMM");
    } catch (error) {}
  };
  const toggleLeagueDropdown = async () => {
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCountryDropDown(false);
    setLeagueDropdown(!leagueDropdown);
  };

  const handleMatchDetailsSelection = async (matchDetails) => {
    setSelectedMatchDetails(matchDetails);
    setMatchId(
      matchList
        .filter((data) => matchDetails == data.takimlar)
        .map((data) => data.MatchID)
    );
    setDropdownError({
      ...dropdownError,
      match_details: "",
    });
    try {
      let holder = [];
      const predictionsPromises = matchId.map(async (val) => {
        const predictions = await axios.get(
          `https://www.nosyapi.com/apiv2/service/bettable-matches/detailsCustomv2?matchID=${val}`,
          { headers }
        );
        holder = [...holder, ...predictions.data.data.Bets];
        return predictions.data.data.gameType;
      });
      const predictionsData = await Promise.all(predictionsPromises);
      setAllBetsData(holder);

      const uniquePredictions = [...new Set(predictionsData.flat())];

      if (uniquePredictions.length === 0) {
        setPredictionTypeOptions(["No Prediction type available"]);
      } else {
        setPredictionTypeOptions(uniquePredictions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const toggleMatchDetailsDropdown = async () => {
    setPredictionTypeDropdown(false);
    setPredictionDropdown(false);
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setEditorDropDown(false);
    setCategoryDropDown(false);
    setMatchDetailsDropdown(!matchDetailsDropdown);
  };
  const handlePredictionTypeSelection = async (predictionType) => {
    setSelectedPredictionType(predictionType);
    setDropdownError({
      ...dropdownError,
      prediction_type: "",
    });
    setPredictionOptions([
      ...new Set(
        allBetsData
          .filter((x) => x.gameName == predictionType)
          .map((x) => x.odds)
          .flat()
          .map((x) => x.value)
      ),
    ]);
  };
  const togglePredictionTypeDropdown = () => {
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setPredictionDropdown(false);
    setEditorDropDown(false);
    setCategoryDropDown(false);
    setPredictionTypeDropdown(!predictionTypeDropdown);
  };

  const handlePredictionSelection = (prediction) => {
    setSelectedPrediction(prediction);
    setDropdownError({
      ...dropdownError,
      prediction: "",
    });
  };
  const togglePredictionDropdown = () => {
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setPredictionTypeDropdown(false);
    setMatchDetailsDropdown(false);
    setEditorDropDown(false);
    setCategoryDropDown(false);
    setPredictionDropdown(!predictionDropdown);
  };

  const handleCountrySelection = async (country) => {
    setSelectedCountry(country);
    setDropdownError({
      ...dropdownError,
      country: "",
    });
    try {
      const response = await axios.get(
        `https://www.nosyapi.com/apiv2/bets/getMatchesLeague?type=${categoryType}&country=${selectedCountry}`,
        { headers }
      );
      const LeagueList = response?.data?.data;
      if (LeagueList.length === 0) {
        setLeagueOptions(["No league available"]);
      } else {
        setLeagueOptions(LeagueList.map((item) => item?.league));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleCountryDropdown = () => {
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setLeagueDropdown(false);
    setEditorDropDown(false);
    setCategoryDropDown(false);
    setCountryDropDown(!countryDropDown);
  };
  const [categoryType, setCategoryType] = useState(null);
  const handleCategorySelection = async (category) => {
    setSelectedCategory(category);
    setDropdownError({
      ...dropdownError,
      category: "",
    });
    if (category !== "Select") {
      try {
        let type;
        if (category === "Futbol") {
          type = 1;
        } else if (category === "Basketbol") {
          type = 2;
        }
        setCategoryType(type);
        if (type) {
          const res = await axios.get(
            `https://www.nosyapi.com/apiv2/bets/getMatchesCountryList?type=${type}`,
            { headers }
          );
          const countryData = res.data.data;
          setCountryOptions(countryData.map((item) => item.country));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleCategoryDropdown = () => {
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setLeagueDropdown(false);
    setCountryDropDown(false);
    setEditorDropDown(false);
    setCategoryDropDown(!categoryDropDown);
  };

  const handleEditorSelection = async (editor) => {
    setSelectedEditor(editor);
    setDropdownError({
      ...dropdownError,
      editor: "",
    });
    const filterData = alluserData.filter((res) => res.username == editor);
    if (filterData.length !== 0) {
      filterData.map((res) => {
        setUserCategory(res.category);
      });
    }
  };

  const toggleEditorDropdown = () => {
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setLeagueDropdown(false);
    setCountryDropDown(false);
    setEditorDropDown(!editorDropDown);
  };

  const [dropdownError, setDropdownError] = useState({
    editor: "",
    category: "",
    country: "",
    league: "",
    match_details: "",
    prediction_type: "",
    prediction: "",
    comment: "",
    like: "",
    fav: "",
    clap: "",
    dateError: "",
  });

  const [comment, setComment] = useState("");
  const [like, setLike] = useState("");
  const [fav, setFav] = useState("");
  const [clap, setClap] = useState("");

  const handleSubmit = async (e) => {
    // console.log("=>>>submit called");
    e.preventDefault();
    if (
      selectedEditor === "Select" &&
      selectedCategory === "Select" &&
      selectedCountry === "Select" &&
      selectedLeague === "Select" &&
      selectedMatchDetails === "Select" &&
      selectedPredictionType === "Select" &&
      selectedPrediction === "Select" &&
      selectedDate === "Select" &&
      comment === "" &&
      like === "" &&
      fav === "" &&
      clap === ""
    ) {
      setDropdownError({
        editor: "*Required",
        category: "*Required",
        country: "*Required",
        league: "*Required",
        match_details: "*Required",
        prediction_type: "*Required",
        prediction: "*Required",
        comment: "*Required",
        like: "*Required",
        fav: "*Required",
        clap: "*Required",
        dateError: "*Required",
      });
    } else if (selectedEditor === "Select") {
      setDropdownError({
        ...dropdownError,
        editor: "*Required",
      });
    } else if (selectedCategory === "Select") {
      setDropdownError({
        ...dropdownError,
        category: "*Required",
      });
    } else if (selectedCountry === "Select") {
      setDropdownError({
        ...dropdownError,
        country: "*Required",
      });
    } else if (selectedLeague === "Select") {
      setDropdownError({
        ...dropdownError,
        league: "*Required",
      });
    } else if (selectedDate === "Select") {
      setDropdownError({
        ...dropdownError,
        dateError: "*Required",
      });
    } else if (selectedMatchDetails === "Select") {
      setDropdownError({
        ...dropdownError,
        match_details: "*Required",
      });
    } else if (selectedPredictionType === "Select") {
      setDropdownError({
        ...dropdownError,
        prediction_type: "*Required",
      });
    } else if (selectedPrediction === "Select") {
      setDropdownError({
        ...dropdownError,
        prediction: "*Required",
      });
    } else if (comment === "") {
      setDropdownError({
        ...dropdownError,
        comment: "*Required",
      });
    } else if (like === "") {
      setDropdownError({
        ...dropdownError,
        like: "*Required",
      });
    } else if (fav === "") {
      setDropdownError({
        ...dropdownError,
        fav: "*Required",
        selectedCategory,
      });
    } else if (clap === "") {
      setDropdownError({
        ...dropdownError,
        clap: "*Required",
      });
    } else {
      setIsLoading(true);
      try {
        // console.log("--------", matchId)
        let data = {
          editor: selectedEditor,
          category: selectedCategory,
          country: selectedCountry,
          league: selectedLeague,
          match_detail: selectedMatchDetails,
          prediction_type: selectedPredictionType,
          prediction: selectedPrediction,
          public_content: isPublicSelected ? true : false,
          comment: comment,
          like: like,
          favorite: fav,
          clap: clap,
          date: selectedDate,
          cmt_id:matchId,
        };
        const res = await AxiosInstance.post(
          `${config?.apiUrl}/comment-setting/?admin=${admin_id}`,
          data
        );
        if (res.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          removeCookie("access-token")
          window.location.reload();
        }
        if (res.status === 201) {
          setIsLoading(false);
          Swal.fire({
            title: "Success",
            text: "Comment Created!",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
          setSelectedEditor("Select");
          setSelectedCategory("Select");
          setSelectedCountry("Select");
          setSelectedLeague("Select");
          setSelectedMatchDetails("Select");
          setSelectedPredictionType("Select");
          setSelectedPrediction("Select");
          setComment("");
          setLike("");
          setFav("");
          setClap("");
          setSelectedDate("Select");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const data = {
    editor: "selectedEditor",
    category: ["selectedCategory"],
    country: "selectedCountry",
    league: "selectedLeague",
    match_detail: "selectedMatchDetails",
    prediction_type: "selectedPredictionType",
    prediction: "selectedPrediction",
    public_content: "isPublicSelected" ? true : false,
    comment: "comment",
    like: "like",
    favorite: fav,
    clap: clap,
  };

  const handleDateSelection = async (date) => {
    if (selectedDate !== date) {
      setSelectedMatchDetails("Select");
      setSelectedPrediction("Select");
      setSelectedPredictionType("Select");
    }
    setSelectedDate(date);
    // setDateError("");
    try {
      const res = await axios.get(
        `https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=${categoryType}&league=${selectedLeague}&t=${date}`,
        { headers }
      );
      const matchListData = res?.data?.data;
      if (matchListData.length === 0) {
        setmatchDetailsOptions(["No match available"]);
      } else {
        setMatchList(matchListData);
        setmatchDetailsOptions(matchListData.map((item) => item.takimlar));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDateDropdown = () => {
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setCategoryDropDown(false);
    setDateDropdown(!dateDropdown);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row g-0 my-2 mt-3">
          <div className="col">
            <div className="row my-2 g-0 gap-3">
              <div className="col">
                <div className="col d-flex flex-column cursor">
                  <CustomDropDownForCommentsCreatetion
                    label="Editor"
                    options={editorOptions}
                    selectedOption={selectedEditor}
                    onSelectOption={handleEditorSelection}
                    isOpen={editorDropDown}
                    toggleDropdown={toggleEditorDropdown}
                  />
                  <span className="text-danger">{dropdownError.editor}</span>
                </div>
              </div>
              <div className="col cursor">
                <CustomDropDownForCommentsCreatetion
                  label="Category"
                  // options={categoryOptions}
                  options={userCategory}
                  selectedOption={selectedCategory}
                  onSelectOption={handleCategorySelection}
                  isOpen={categoryDropDown}
                  toggleDropdown={toggleCategoryDropdown}
                />
                <span className="text-danger">{dropdownError.category}</span>
              </div>
              <div className="col me-3 cursor">
                <CustomDropDownForCommentsCreatetion
                  label="Country"
                  options={countryOptions}
                  selectedOption={selectedCountry}
                  onSelectOption={handleCountrySelection}
                  isOpen={countryDropDown}
                  toggleDropdown={toggleCountryDropdown}
                />
                <span className="text-danger">{dropdownError.country}</span>
              </div>
            </div>
            <div className="row my-2 g-0 gap-3">
              <div className="col cursor">
                <CustomDropDownForCommentsCreatetion
                  label="League"
                  options={leagueOptions}
                  selectedOption={selectedLeague}
                  onSelectOption={handleLeagueSelection}
                  isOpen={leagueDropdown}
                  toggleDropdown={toggleLeagueDropdown}
                />
                <span className="text-danger">{dropdownError.league}</span>
              </div>
              <div className="col">
                <CustomDropDownForCommentsCreatetion
                  options={dateOptions}
                  label="Date"
                  selectedOption={selectedDate}
                  onSelectOption={handleDateSelection}
                  isOpen={dateDropdown}
                  toggleDropdown={toggleDateDropdown}
                />
                <span className="text-danger">{dropdownError.dateError}</span>
              </div>
              <div className="col cursor">
                <CustomDropDownForCommentsCreatetion
                  label="Match Details"
                  options={matchDetailsOptions}
                  selectedOption={selectedMatchDetails}
                  onSelectOption={handleMatchDetailsSelection}
                  isOpen={matchDetailsDropdown}
                  toggleDropdown={toggleMatchDetailsDropdown}
                />
                <span className="text-danger">
                  {dropdownError.match_details}
                </span>
              </div>
              <div className="col me-3 cursor">
                <CustomDropDownForCommentsCreatetion
                  label="Prediction Type"
                  options={predictionTypeOptions}
                  selectedOption={selectedPredictionType}
                  onSelectOption={handlePredictionTypeSelection}
                  isOpen={predictionTypeDropdown}
                  toggleDropdown={togglePredictionTypeDropdown}
                />
                <span className="text-danger">
                  {dropdownError.prediction_type}
                </span>
              </div>
            </div>
            <div className="row g-0 gap-3 align-items-center">
              <div className="col me-3 cursor">
                <CustomDropDownForCommentsCreatetion
                  label="Prediction"
                  options={predictionOptions}
                  selectedOption={selectedPrediction}
                  onSelectOption={handlePredictionSelection}
                  isOpen={predictionDropdown}
                  toggleDropdown={togglePredictionDropdown}
                />
                <span className="text-danger">{dropdownError.prediction}</span>
              </div>
              <div className="mt-2 d-flex gap-2 col">
                <div className="">
                  <span className="px-2">Public</span>
                  <img
                    onClick={() => {
                      setIsPublicSelected(!isPublicSelected);
                      setIsSubscriberSelected(false);
                    }}
                    src={isPublicSelected ? selectedRadio : Radio}
                    alt=""
                    style={{ cursor: "pointer" }}
                    height={30}
                    width={30}
                  />
                </div>
                <div className="">
                  <span className="px-2">Only Subscribers</span>
                  <img
                    onClick={() => {
                      setIsSubscriberSelected(!isSubscriberSelected);
                      setIsPublicSelected(false);
                    }}
                    src={isSubscriberSelected ? selectedRadio : Radio}
                    alt=""
                    style={{ cursor: "pointer" }}
                    height={30}
                    width={30}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <span>Comment</span>
            <textarea
              onChange={(e) => {
                setComment(e.target.value);
                setDropdownError({
                  ...dropdownError,
                  comment: "",
                });
              }}
              name="comment"
              value={comment}
              style={{ height: "128px" }}
              className="darkMode-input form-control"
            />
            <span className="text-danger">{dropdownError.comment}</span>
            <div className="my-2 d-flex gap-3">
              <div className="col-2">
                <div className="col d-flex flex-column">
                  <span className="p-1 ps-0">Like</span>
                  <input
                    onChange={(e) => {
                      setLike(e.target.value);
                      setDropdownError({
                        ...dropdownError,
                        like: "",
                      });
                    }}
                    type="number"
                    className="darkMode-input form-control"
                    name="like"
                    value={like}
                  />
                  <span className="text-danger">{dropdownError.like}</span>
                </div>
              </div>
              <div className="col-2">
                <div className="col d-flex flex-column">
                  <span className="p-1 ps-0">Favorite</span>
                  <input
                    onChange={(e) => {
                      setFav(e.target.value);
                      setDropdownError({
                        ...dropdownError,
                        fav: "",
                      });
                    }}
                    value={fav}
                    type="number"
                    className="darkMode-input form-control"
                    name="favorite"
                  />
                  <span className="text-danger">{dropdownError.fav}</span>
                </div>
              </div>
              <div className="col-2">
                <div className="col d-flex flex-column">
                  <span className="p-1 ps-0">Clap</span>
                  <input
                    onChange={(e) => {
                      setClap(e.target.value);
                      setDropdownError({
                        ...dropdownError,
                        clap: "",
                      });
                    }}
                    value={clap}
                    type="number"
                    className="darkMode-input form-control"
                    name="clap"
                  />
                  <span className="text-danger">{dropdownError.clap}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div lassName="my-3 d-flex justify-content-center">
          <div
            class="fixed-bottom  d-flex justify-content-center"
            style={{ marginBottom: "200px" }}
          >
            <button
              type="submit"
              className="py-1 px-3"
              style={{
                color: "#D2DB08",
                border: "1px solid #D2DB08",
                borderRadius: "3px",
                backgroundColor: "transparent",
              }}
            >
              {isLoading ? "Loading..." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CommentsSettings;
