import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "./CommentsPageModal.css";
import { RxCross2 } from "react-icons/rx";
// import MultiSelect from "react-native-multiple-select";
import Select from "react-select";
import EditorFilter from "../EditorFilter/EditorFilter";
import { CommentFilter } from "../CommentFilter/CommentFilter";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import radioBlue from "../../assets/Public Content Radio Button Unselected (1).svg";
import radioBlueSelected from "../../assets/Public Content Radio Button Selected (1).svg";
import darkRadioBlue from "../../assets/Public Content Radio Button Unselected.svg";
import darkRadioBlueSelected from "../../assets/Public Content Radio Button Selected.svg";
import radioYellowSelected from "../../assets/Group 505.svg";
import DarkradioYellowSelected from "../../assets/Group 505 (1).svg";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import config from "../../config";
import AxiosInstance from "../AxiosInstance";
import { Cookies, useCookies } from "react-cookie";
import { Provider, useDispatch, useSelector} from "react-redux";
import { selectUser } from "../../Redux/selector";

const CommentsPageModal = (props) => {
  const handleClearData = () => {
    setCategoryData("");
    setCountryData("");
    setLeagueData("");
    setDateData("");
    setSelectedMatchDetails("Select");
    setSelectedLevel("Select");
    setSelectedPredictionType("Select");
    setBlueSelect("");
    setYellowSelect("");
  };

  const cookies = new Cookies();
  const userData = useSelector(selectUser);
  const handleShowButtonClick = async () => {
    // const user_id = cookies.get("user-id");
    const user_id = userData?.user?.id;
    try {
      const response = await AxiosInstance.post(
        `${config?.apiUrl}/filter-comments/${user_id}/`,
        {
          category: categoryData,
          country: countryData,
          league: leagueData,
          match_detail: selectedMatchDetails,
          prediction_type: selectedPredictionType,
          // prediction: ,
          // status: ,
          date: dateData,
          filter_type: blueSelect,
          filter_type0: yellowSelect,
          level: selectedLevel,
          mobile: "True",
        }
      );
      const editorData = response.data.map((item) => ({
        type: "comment",
        value: item,
      }));
      props.setFilterCommentData(editorData);
      handleClearData();
      // Handle the response here if needed
      // console.log('API Response:', response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const [categoryData, setCategoryData] = useState("");
  const [countryData, setCountryData] = useState("");
  const [dateData, setDateData] = useState("");
  const [leagueData, setLeagueData] = useState("");

  const [blueSelect, setBlueSelect] = useState("");
  const [yellowSelect, setYellowSelect] = useState("");

  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [isPublicSelected, setIsPublicSelected] = useState(false);
  const [isFinishedSelected, setIsFinishedSelected] = useState(false);
  const [isWinningSelected, setIsWinningSelected] = useState(false);

  const [isSubscriberSelected, setIsSubscriberSelected] = useState(false);
  const [isNotStartedSelected, setIsNotStartedSelected] = useState(false);
  const [isLosingSelected, setIsLosingSelected] = useState(false);

  const [matchDetailsDropDown, setMatchDetailsDropDown] = useState(false);
  const [selectedMatchDetails, setSelectedMatchDetails] = useState("Select");
  const [MatchdetailsValue, setMatchdetailsValue] = useState([]);
  const [predictionType, setPredictionType] = useState([]);

  const handleMatchDetailsSelection = (matchDetails) => {
    setSelectedMatchDetails(matchDetails);
  };

  const toggleMatchDetailsDropdown = () => {
    setMatchDetailsDropDown(!matchDetailsDropDown);
    setLevelDropDown(false);
    setPredictionTypeDropDown(false);
  };

  // const matchDetailsOptions = [
  //   "Option 1",
  //   "Option 2",
  //   "Option 3",
  //   // Add more options as needed
  // ];
  const matchDetailsOptions = MatchdetailsValue;

  // Similar state and functions for "Level" and "Prediction Type" dropdowns
  const [levelDropDown, setLevelDropDown] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("Select");

  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
  };

  const toggleLevelDropdown = () => {
    setLevelDropDown(!levelDropDown);
    setMatchDetailsDropDown(false);
    setPredictionTypeDropDown(false);
  };

  const levelOptions = ["Apprentice", "Journeyman", "Master", "Grandmaster"];

  const [predictionTypeDropDown, setPredictionTypeDropDown] = useState(false);
  const [selectedPredictionType, setSelectedPredictionType] =
    useState("Select");

  const handlePredictionTypeSelection = (predictionType) => {
    setSelectedPredictionType(predictionType);
  };

  const togglePredictionTypeDropdown = () => {
    setPredictionTypeDropDown(!predictionTypeDropDown);
    setMatchDetailsDropDown(false);
    setLevelDropDown(false);
  };

  const predictionTypeOptions = predictionType;

  const [editorFilterModal, setEditorFlterModal] = useState(false);

  const handleRadioBlue = (e) => {
    if (e === "public") {
      setBlueSelect("public_content");
      setIsPublicSelected(!isPublicSelected);
      setIsFinishedSelected(false);
      setIsWinningSelected(false);
    } else if (e === "finished") {
      setBlueSelect("finished");
      setIsPublicSelected(false);
      setIsWinningSelected(false);
      setIsFinishedSelected(!isFinishedSelected);
    }
    if (e === "winning") {
      setBlueSelect("winning");
      setIsPublicSelected(false);
      setIsFinishedSelected(false);
      setIsWinningSelected(!isWinningSelected);
    }
  };
  const handleYellowRadio = (e) => {
    if (e === "subscribe") {
      setYellowSelect("only_subscriber");
      setIsSubscriberSelected(!isSubscriberSelected);
      setIsNotStartedSelected(false);
      setIsLosingSelected(false);
    }
    if (e === "not started") {
      setYellowSelect("not_stated");
      setIsNotStartedSelected(!isNotStartedSelected);
      setIsSubscriberSelected(false);
      setIsLosingSelected(false);
    }
    if (e === "lose") {
      setYellowSelect("lose");
      setIsLosingSelected(!isLosingSelected);
      setIsSubscriberSelected(false);
      setIsNotStartedSelected(false);
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
      >
        <Modal.Body
          className={`${currentTheme === "dark" ? "dark-mode" : "light-mode"}`}
        >
          <div>
            <div className="">
              <span className="mb-2">
                <RxCross2
                  onClick={() => {
                    handleClearData();
                    props.onHide();
                    setMatchDetailsDropDown(false);
                    setLevelDropDown(false);
                    setPredictionTypeDropDown(false);
                    setIsNotStartedSelected(false);
                    setIsSubscriberSelected(false);
                    setIsLosingSelected(false);
                    setIsPublicSelected(false);
                    setIsFinishedSelected(false);
                    setIsWinningSelected(false);
                  }}
                  fontSize={"1.8rem"}
                  className={`${
                    currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                  }`}
                />
              </span>
            </div>
            <CommentFilter
              setMatchdetailsValue={setMatchdetailsValue}
              setSelectedMatchDetails={setSelectedMatchDetails}
              setCategoryData={setCategoryData}
              setCountryData={setCountryData}
              setDateData={setDateData}
              setLeagueData={setLeagueData}
              selectedMatchDetails={selectedMatchDetails}
              setPredictionType={setPredictionType}
            />
            <div className="my-3">
              <CustomDropdown
                label="Match Details"
                options={matchDetailsOptions}
                selectedOption={selectedMatchDetails}
                onSelectOption={handleMatchDetailsSelection}
                isOpen={matchDetailsDropDown}
                toggleDropdown={toggleMatchDetailsDropdown}
              />
            </div>
            <div className="row my-3">
              <div className="col">
                <CustomDropdown
                  label="Level"
                  options={levelOptions}
                  selectedOption={selectedLevel}
                  onSelectOption={handleLevelSelection}
                  isOpen={levelDropDown}
                  toggleDropdown={toggleLevelDropdown}
                />
              </div>
              <div className="col">
                <CustomDropdown
                  label="Prediction Type"
                  options={predictionTypeOptions}
                  selectedOption={selectedPredictionType}
                  onSelectOption={handlePredictionTypeSelection}
                  isOpen={predictionTypeDropDown}
                  toggleDropdown={togglePredictionTypeDropdown}
                />
              </div>
            </div>
            <div className="my-4">
              <div className="row">
                <div className="col d-flex align-items-center">
                  <img
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => {
                      handleRadioBlue("public");
                    }}
                    src={
                      currentTheme === "dark"
                        ? isPublicSelected
                          ? darkRadioBlueSelected
                          : darkRadioBlue
                        : isPublicSelected
                        ? radioBlueSelected
                        : radioBlue
                    }
                    alt=""
                    height={31}
                    width={31}
                  />
                  <span className="ps-1" style={{ width: "max-content" }}>
                    Only Public
                  </span>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                  <span className="pe-1">Only Subscriber</span>
                  <img
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => {
                      handleYellowRadio("subscribe");
                    }}
                    src={
                      currentTheme === "dark"
                        ? isSubscriberSelected
                          ? DarkradioYellowSelected
                          : darkRadioBlue
                        : isSubscriberSelected
                        ? radioYellowSelected
                        : radioBlue
                    }
                    alt=""
                    height={31}
                    width={31}
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col d-flex align-items-center">
                  <img
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => {
                      handleRadioBlue("finished");
                    }}
                    src={
                      currentTheme === "dark"
                        ? isFinishedSelected
                          ? darkRadioBlueSelected
                          : darkRadioBlue
                        : isFinishedSelected
                        ? radioBlueSelected
                        : radioBlue
                    }
                    alt=""
                    height={31}
                    width={31}
                  />
                  <span className="ps-1">Finished</span>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                  <span className="pe-1">Not Started</span>
                  <img
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => {
                      handleYellowRadio("not started");
                    }}
                    src={
                      currentTheme === "dark"
                        ? isNotStartedSelected
                          ? DarkradioYellowSelected
                          : darkRadioBlue
                        : isNotStartedSelected
                        ? radioYellowSelected
                        : radioBlue
                    }
                    alt=""
                    height={31}
                    width={31}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col d-flex align-items-center">
                  <img
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => {
                      handleRadioBlue("winning");
                    }}
                    src={
                      currentTheme === "dark"
                        ? isWinningSelected
                          ? darkRadioBlueSelected
                          : darkRadioBlue
                        : isWinningSelected
                        ? radioBlueSelected
                        : radioBlue
                    }
                    alt=""
                    height={31}
                    width={31}
                  />
                  <span className="ps-1">Winning</span>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                  <span className="">Lose</span>
                  <img
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => {
                      handleYellowRadio("lose");
                    }}
                    src={
                      currentTheme === "dark"
                        ? isLosingSelected
                          ? DarkradioYellowSelected
                          : darkRadioBlue
                        : isLosingSelected
                        ? radioYellowSelected
                        : radioBlue
                    }
                    alt=""
                    height={31}
                    width={31}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center my-4">
              <button
                onClick={() => {
                  handleShowButtonClick();
                  // setEditorFlterModal(true);
                  props.onHide();
                }}
                className={`${
                  currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                } px-3 py-1`}
              >
                Show
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <EditorFilter
        show={editorFilterModal}
        onHide={() => setEditorFlterModal(false)}
      />
    </>
  );
};

export default CommentsPageModal;
