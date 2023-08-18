import React, { useEffect, useState } from "react";
import selectedRadio from "../../assets/Group 312.svg";
import Radio from "../../assets/Group 323.svg";
import { CustomDropDownForCommentsCreatetion } from "../CustomDropDownForCommentsCreatetion";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CommentsSettings.css";
import Swal from "sweetalert2";

const CommentsSettings = () => {
  const headers = {
    Authorization: `Bearer ${"lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np"}`,
  };

  const [isPublicSelected, setIsPublicSelected] = useState(false);
  const [isSubscriberSelected, setIsSubscriberSelected] = useState(false);

  // const countryOptions = ["Country 1", "Country 2", "Country 3"];
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Select");
  const [countryDropDown, setCountryDropDown] = useState(false);

  // const leagueOptions = ["League 1", "League 2", "League 3"];
  const [leagueOptions, setLeagueOptions] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("Select");
  const [leagueDropdown, setLeagueDropdown] = useState(false);

  // const matchDetailsOptions = ["Details 1", "Details 2", "Details 3"];
  const [matchDetailsOptions, setmatchDetailsOptions] = useState([]);
  const [selectedMatchDetails, setSelectedMatchDetails] = useState("Select");
  const [matchDetailsDropdown, setMatchDetailsDropdown] = useState(false);

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

  const handleLeagueSelection = async (league) => {
    setSelectedLeague(league);
  };
  const toggleLeagueDropdown = async () => {
    // League API
    const res = await axios.get(
      `https://www.nosyapi.com/apiv2/bets/getMatchesLeague?type=${1}&country=${selectedCountry}`,
      { headers }
    );
    console.log(res.data);
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
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate, "=formattedDate");
    // Match Details API
    const res = await axios.get(
      `https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=${1}&league=${selectedLeague}&t=${formattedDate}`,
      { headers }
    );
    console.log(res.data);
    const matchOptions = res.data.data;
    setmatchDetailsOptions(matchOptions.map((item) => item.takimlar));
    setPredictionTypeDropdown(false);
    setPredictionDropdown(false);
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setMatchDetailsDropdown(!matchDetailsDropdown);
  };
  const handlePredictionTypeSelection = (predictionType) => {
    setSelectedPredictionType(predictionType);
  };
  const togglePredictionTypeDropdown = () => {
    setCountryDropDown(false);
    setLeagueDropdown(false);
    setPredictionDropdown(false);
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
    setCountryDropDown(!countryDropDown);
  };
  // Get all Countries
  useEffect(() => {
    async function getcontries() {
      const res = await axios.get(
        `https://www.nosyapi.com/apiv2/bets/getMatchesCountryList?type=1`,
        { headers }
      );
      console.log(res.data);
      const countryData = res.data.data;
      setCountryOptions(countryData.map((item) => item.country));
    }
    getcontries();
  }, []);

  const validationSchema = Yup.object({
    editor: Yup.string().required("Required*"),
    comment: Yup.string().required("Required*"),
    like: Yup.string().required("Required*"),
    favorite: Yup.string().required("Required*"),
    clap: Yup.string().required("Required*"),
    country: Yup.string().required("Required*"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    const res = await axios.post(`http://127.0.0.1:8000/comment-setting/`, {
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
    console.log("res", res);
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
          editor: "",
          comment: "",
          like: "",
          favorite: "",
          clap: "",
          country: "Select",
          // addBudget: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {/* {({ setCountryValue }) => ( */}
        <Form>
          <div className="row g-0 my-2 mt-3">
            <div className="col">
              <div className="row my-2 g-0 gap-3">
                <div className="col">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Editor</span>
                    <Field
                      // onChange={(e) => seteditor(e.target.value)}
                      name="editor"
                      type="text"
                      className="darkMode-input form-control text-center"
                    />
                    <ErrorMessage
                      name="editor"
                      component="div"
                      className="error-message text-danger"
                    />
                  </div>
                </div>
                <div className="col cursor">
                  {/* <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Country</span>
                <input type="text" className="darkMode-input form-control" />
              </div> */}
                  <Field
                    name="country" // Match the name to the field in validationSchema
                    component={CustomDropDownForCommentsCreatetion}
                    label="Country"
                    options={countryOptions}
                    selectedOption={selectedCountry}
                    onSelectOption={handleCountrySelection}
                    isOpen={countryDropDown}
                    toggleDropdown={toggleCountryDropdown}
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="error-message text-danger"
                  />
                </div>
                <div className="col me-3 cursor">
                  {/* <div className="col d-flex flex-column">
                <span className="p-1 ps-0">League</span>
                <input type="text" className="darkMode-input form-control" />
              </div> */}
                  <CustomDropDownForCommentsCreatetion
                    label="League"
                    options={leagueOptions}
                    selectedOption={selectedLeague}
                    onSelectOption={handleLeagueSelection}
                    isOpen={leagueDropdown}
                    toggleDropdown={toggleLeagueDropdown}
                  />
                </div>
              </div>
              <div className="row my-2 g-0 gap-3">
                <div className="col cursor">
                  {/* <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Match Details</span>
                <input type="text" className="darkMode-input form-control" />
              </div> */}
                  <CustomDropDownForCommentsCreatetion
                    label="Match Details"
                    options={matchDetailsOptions}
                    selectedOption={selectedMatchDetails}
                    onSelectOption={handleMatchDetailsSelection}
                    isOpen={matchDetailsDropdown}
                    toggleDropdown={toggleMatchDetailsDropdown}
                  />
                </div>
                <div className="col cursor">
                  {/* <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Prediction Type</span>
                <input type="text" className="darkMode-input form-control" />
              </div> */}
                  <CustomDropDownForCommentsCreatetion
                    label="Prediction Type"
                    options={predictionTypeOptions}
                    selectedOption={selectedPredictionType}
                    onSelectOption={handlePredictionTypeSelection}
                    isOpen={predictionTypeDropdown}
                    toggleDropdown={togglePredictionTypeDropdown}
                  />
                </div>
                <div className="col me-3 cursor">
                  {/* <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Prediction</span>
                <input type="text" className="darkMode-input form-control" />
              </div> */}
                  <CustomDropDownForCommentsCreatetion
                    label="Prediction"
                    options={predictionOptions}
                    selectedOption={selectedPrediction}
                    onSelectOption={handlePredictionSelection}
                    isOpen={predictionDropdown}
                    toggleDropdown={togglePredictionDropdown}
                  />
                </div>
              </div>
              <div className="my-2 d-flex gap-2">
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
            <div className="col-4">
              <span>Comment</span>
              <Field
                name="comment" // Match the name to the field in validationSchema
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
                      // onChange={(e) => setLike(e.target.value)}
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
                      // onChange={(e) => setFavorite(e.target.value)}
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
                      // onChange={(e) => setClap(e.target.value)}
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
            <div className="fixed-bottom  d-flex justify-content-center create-btn">
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
