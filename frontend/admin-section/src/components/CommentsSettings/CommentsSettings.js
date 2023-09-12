import React, { useEffect, useState } from "react";
import selectedRadio from "../../assets/Group 312.svg";
import Radio from "../../assets/Group 323.svg";
import { CustomDropDownForCommentsCreatetion } from "../CustomDropDownForCommentsCreatetion";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import config from "../../config";

const CommentsSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [dropdownError, setDropdownError] = useState({
    category: "",
    country: "",
    league: "",
    match: "",
    prediction: "",
    prediction_type: "",
  });

  const headers = {
    Authorization: `Bearer ${"lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np"}`,
  };

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
  const [selectedMatchDetails, setSelectedMatchDetails] = useState("Select");
  const [matchDetailsDropdown, setMatchDetailsDropdown] = useState(false);

  const [editorOptions, setEditorOptions] = useState([]);
  const [selectedEditor, setSelectedEditor] = useState("Select");
  const [editorDropDown, setEditorDropDown] = useState(false);

  const categoryOptions = ["Futbol", "Basketbol"];
  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categoryDropDown, setCategoryDropDown] = useState(false);

  const predictionTypeOptions = [
    "Match Result",
    "Handicap Match Result",
    "First Half / Match Result",
    "Total Goal Over/Under",
    "Both Teams to Score",
    "Home Team Total Goals",
    "Away Team Total Goals",
  ];

  const [selectedPredictionType, setSelectedPredictionType] =
    useState("Select");
  const [predictionTypeDropdown, setPredictionTypeDropdown] = useState(false);

  const predictionOptions = ["Prediction 1", "Prediction 2", "Prediction 3"];
  const [selectedPrediction, setSelectedPrediction] = useState("Select");
  const [predictionDropdown, setPredictionDropdown] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(`${config.apiUrl}/all-users/?userType=commentator`)
        .then((res) => {
          console.log(res.data.data);
          const data = res?.data?.data;
          if (data.length === 0) {
            setEditorOptions(["Editor not found"]);
          } else {
            const names = (res?.data?.data).map((user) => user.name);
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
  };
  const toggleLeagueDropdown = async () => {
    // League API
    const res = await axios.get(
      `https://www.nosyapi.com/apiv2/bets/getMatchesLeague?type=${1}&country=${selectedCountry}`,
      { headers }
    );
    // console.log(res.data);
    const leagueOptions = res.data.data;
    setLeagueOptions(leagueOptions.map((item) => item.league));
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setCountryDropDown(false);
    setLeagueDropdown(!leagueDropdown);
  };

  const handleMatchDetailsSelection = (matchDetails) => {
    setSelectedMatchDetails(matchDetails);
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
  const handlePredictionTypeSelection = (predictionType) => {
    setSelectedPredictionType(predictionType);
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

  const handleCategorySelection = async (category) => {
    setSelectedCategory(category);
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

  // Get all Countries
  useEffect(() => {
    async function getcontries() {
      const res = await axios.get(
        `https://www.nosyapi.com/apiv2/bets/getMatchesCountryList?type=1`,
        { headers }
      );
      // console.log(res.data);
      const countryData = res.data.data;
      setCountryOptions(countryData.map((item) => item.country));
    }
    getcontries();
  }, []);

  useEffect(() => {
    async function getMatch() {
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        const res = await axios.get(
          `https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=${1}&league=${selectedLeague}&t=${formattedDate}`,
          { headers }
        );
        // console.log(res.data);
        const matchOptions = res.data.data;
        setmatchDetailsOptions(matchOptions.map((item) => item.takimlar));
        // setMatchId(MatchList.map((item) => item.MatchID));
      } catch (error) {
        console.log(error);
      }
    }
    getMatch();
  }, [selectedLeague]);

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
          let holder = [];
          const predictionsPromises = matchId.map(async (val) => {
            const predictions = await axios.get(
              `https://www.nosyapi.com/apiv2/service/bettable-matches/detailsCustomv2?matchID=${val}`,
              { headers }
            );
            holder = [...holder, ...predictions.data.data.Bets];
            return predictions.data.data.gameType;
          });
          // setPredictionType(uniquePredictions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedMatchDetails]);

  const handleEditorSelection = async (editor) => {
    setSelectedEditor(editor);
  };

  const toggleEditorDropdown = () => {
    setMatchDetailsDropdown(false);
    setPredictionDropdown(false);
    setPredictionTypeDropdown(false);
    setLeagueDropdown(false);
    setCountryDropDown(false);
    setEditorDropDown(!editorDropDown);
  };

  const validationSchema = Yup.object({
    editor: Yup.string().required("Required*"),
    comment: Yup.string().required("Required*"),
    like: Yup.string().required("Required*"),
    favorite: Yup.string().required("Required*"),
    clap: Yup.string().required("Required*"),
    country: Yup.string().required("Required*"),
    // setDropdownError({})
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    const res = await axios.post(`${config?.apiUrl}/comment-setting/`, {
      editor: values.editor,
      country: selectedCountry,
      league: selectedLeague,
      match_detail: selectedMatchDetails,
      prediction_type: selectedPredictionType,
      prediction: selectedPrediction,
      public_content: isPublicSelected,
      comment: values.comment,
      like: values.like,
      favorite: values.favorite,
      clap: values.clap,
    });
    setIsLoading(false);
    if (res.status === 201) {
      Swal.fire({
        title: "Success",
        text: "Comment Created!",
        icon: "success",
        backdrop: false,
        customClass: "dark-mode-alert",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          comment: "",
          like: "",
          favorite: "",
          clap: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
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
                  </div>
                </div>
                <div className="col cursor">
                  <CustomDropDownForCommentsCreatetion
                    label="Category"
                    options={categoryOptions}
                    selectedOption={selectedCategory}
                    onSelectOption={handleCategorySelection}
                    isOpen={categoryDropDown}
                    toggleDropdown={toggleCategoryDropdown}
                  />
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
              <Field
                name="comment"
                component="textarea"
                style={{ height: "128px" }}
                className="darkMode-input form-control"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="error-message text-danger"
              />
              <div className="my-2 d-flex gap-3">
                <div className="col-2">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Like</span>
                    <Field
                      type="text"
                      className="darkMode-input form-control"
                      name="like"
                    />
                    <ErrorMessage
                      name="like"
                      component="div"
                      className="error-message text-danger"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Favorite</span>
                    <Field
                      type="text"
                      className="darkMode-input form-control"
                      name="favorite"
                    />
                    <ErrorMessage
                      name="favorite"
                      component="div"
                      className="error-message text-danger"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Clap</span>
                    <Field
                      type="text"
                      className="darkMode-input form-control"
                      name="clap"
                    />
                    <ErrorMessage
                      name="clap"
                      component="div"
                      className="error-message text-danger"
                    />
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
                Create
              </button>
            </div>
          </div>
        </Form>
        {/* // )} */}
      </Formik>
    </>
  );
};

export default CommentsSettings;
