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

const CommentsPageModal = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [isPublicSelected, setIsPublicSelected] = useState(false);
  const [isFinishedSelected, setIsFinishedSelected] = useState(false);
  const [isWinningSelected, setIsWinningSelected] = useState(false);

  const [isSubscriberSelected, setIsSubscriberSelected] = useState(false);
  const [isNotStartedSelected, setIsNotStartedSelected] = useState(false);
  const [isLosingSelected, setIsLosingSelected] = useState(false);

  const [matchDetailsDropDown, setMatchDetailsDropDown] = useState(false);
  const [selectedMatchDetails, setSelectedMatchDetails] = useState("Select");

  const handleMatchDetailsSelection = (matchDetails) => {
    setSelectedMatchDetails(matchDetails);
  };

  const toggleMatchDetailsDropdown = () => {
    setMatchDetailsDropDown(!matchDetailsDropDown);
    setLevelDropDown(false)
    setPredictionTypeDropDown(false)
  };

  const matchDetailsOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    // Add more options as needed
  ];

  // Similar state and functions for "Level" and "Prediction Type" dropdowns
  const [levelDropDown, setLevelDropDown] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("Select");

  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
  };

  const toggleLevelDropdown = () => {
    setLevelDropDown(!levelDropDown);
    setMatchDetailsDropDown(false)
    setPredictionTypeDropDown(false)
  };

  const levelOptions = [
    "Option A",
    "Option B",
    "Option C",
    // Add more options as needed
  ];

  const [predictionTypeDropDown, setPredictionTypeDropDown] = useState(false);
  const [selectedPredictionType, setSelectedPredictionType] =
    useState("Select");

  const handlePredictionTypeSelection = (predictionType) => {
    setSelectedPredictionType(predictionType);
  };

  const togglePredictionTypeDropdown = () => {
    setPredictionTypeDropDown(!predictionTypeDropDown);
    setMatchDetailsDropDown(false)
    setLevelDropDown(false)
  };

  const predictionTypeOptions = [
    "Type X",
    "Type Y",
    "Type Z",
    // Add more options as needed
  ];

  const [editorFilterModal, setEditorFlterModal] = useState(false);

  const handleRadioBlue = (e) => {
    if (e === "public") {
      setIsPublicSelected(!isPublicSelected);
      setIsFinishedSelected(false);
      setIsWinningSelected(false);
    } else if (e === "finished") {
      setIsPublicSelected(false);
      setIsWinningSelected(false);
      setIsFinishedSelected(!isFinishedSelected);
    }
    if (e === "winning") {
      setIsPublicSelected(false);
      setIsFinishedSelected(false);
      setIsWinningSelected(!isWinningSelected);
    }
  };
  const handleYellowRadio = (e) => {
    if (e === "subscribe") {
      setIsSubscriberSelected(!isSubscriberSelected);
      setIsNotStartedSelected(false);
      setIsLosingSelected(false);
    }
    if (e === "not started") {
      setIsNotStartedSelected(!isNotStartedSelected);
      setIsSubscriberSelected(false);
      setIsLosingSelected(false);
    }
    if (e === "lose") {
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
                    props.onHide();
                  }}
                  fontSize={"1.8rem"}
                  className={`${
                    currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                  }`}
                />
              </span>
            </div>
            <CommentFilter />
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
                  <span className="ps-1">Only Public</span>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                  <span className="pe-1">Only Subscriber</span>
                  <img
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
                className={`${
                  currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                } px-3 py-1`}
                onClick={() => setEditorFlterModal(true)}
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
