import React, { useContext, useState } from "react";
import { CommentFilter } from "../CommentFilter/CommentFilter";
import Modal from "react-bootstrap/Modal";
import { RxCross2 } from "react-icons/rx";
import "./AddCommentModal.css";
import Form from "react-bootstrap/Form";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";
import CurrentTheme from "../../context/CurrentTheme";
import CheckBoxDark from "../../assets/CheckBoxDark.svg";
import CheckBoxSelectDark from "../../assets/CheckBoxSelectDark.svg";
import SelecttoggleinputDark from "../../assets/Group 711.png";
import toggleinputDark from "../../assets/Group 711.svg";
import toggleinputLight from "../../assets/Group 720.png";
import toggleinputLightSelected from "../../assets/Group 720_selected.png";

const AddCommentModal = (props) => {
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
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



  const [toggleInput, setToggleInput] = useState(false);

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
          className={`${currentTheme === "dark" ? "dark-mode" : "ligh-mode"}`}
        >
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
          <div className="my-3 position-relative" style={{ fontSize: "14px" }}>
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
                label="Prediction Type"
                options={predictionTypeOptions}
                selectedOption={selectedPredictionType}
                onSelectOption={handlePredictionTypeSelection}
                isOpen={predictionTypeDropdown}
                toggleDropdown={togglePredictionTypeDropdown}
              />
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
                src={!toggleInput ? toggleinputLightSelected : toggleinputLight}
                alt=""
                height={23}
                width={55}
              />
            )}
            <span className="ps-2">Public Content</span>
          </div>
          <div className="">
            <span style={{ fontSize: "14px" }}>
              Comment
              <span style={{ color: "#FF5757", fontSize: "10px" }}>
                {" "}
                ( If illegal content is detected, the membership will be
                terminated. )
              </span>
            </span>
            <Form.Control
              as="textarea"
              maxLength={250}
              className={`${
                currentTheme === "dark"
                  ? "textArea-dark-mode"
                  : "textArea-light-mode"
              }`}
            />
            <span style={{ fontSize: "10px" }}>Max. 250 character</span>
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
                style={{
                  color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                }}
              >
                Terms of use
              </span>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button
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
      </Modal>
    </>
  );
};

export default AddCommentModal;
