import React, { useState } from "react";
import { CommentFilter } from "../CommentFilter/CommentFilter";
import Modal from "react-bootstrap/Modal";
import { RxCross2 } from "react-icons/rx";
import "./AddCommentModal.css";
import Form from "react-bootstrap/Form";
import { currentTheme } from "../GetCurrentTheme";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import CheckBoxLight from "../../assets/CheckBoxBlankLight.svg";
import CheckBoxSelectLight from "../../assets/CheckSelectLight.svg";

const AddCommentModal = (props) => {
  const [selectCheckBox, setSelectCheckBox] = useState(false);
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
    setMatchDetailsDropdown(!matchDetailsDropdown);
  };
  const handlePredictionTypeSelection = (predictionType) => {
    setSelectedPredictionType(predictionType);
  };
  const togglePredictionTypeDropdown = () => {
    setPredictionTypeDropdown(!predictionTypeDropdown);
  };

  const handlePredictionSelection = (prediction) => {
    setSelectedPrediction(prediction);
  };
  const togglePredictionDropdown = () => {
    setPredictionDropdown(!predictionDropdown);
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
          className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}
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
                isOpen={matchDetailsDropdown}
                toggleDropdown={toggleMatchDetailsDropdown}
              />
            </div>
            <div className="row my-3">
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
              {/* <Form.Check
                type="switch"
                id="custom-switch"
                label="Public Content"
              /> */}
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  Public Content
                </label>
              </div>
            </div>
            <div className="">
                <div style={{fontWeight:"600"}}>
                    Comment 
                <small style={{color:"#FF5757"}}> ( If illegal content is detected, the membership will be terminated. )</small>
                </div>
              <Form.Control
                as="textarea"
                maxLength={250}
                className={`${currentTheme === "dark" ? "textArea-dark-mode" : "textArea-light-mode"}`}
              />
              <small>Max. 250 character</small>
            </div>
            <div className="text-center">
              <div className="my-3">
                <img
                  src={!selectCheckBox ? CheckBoxLight : CheckBoxSelectLight}
                  style={{ width: "25px", cursor: "pointer" }}
                  className="me-2"
                  onClick={() => setSelectCheckBox(!selectCheckBox)}
                  alt=""
                />
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
                  className={`${
                    currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                  } px-3 py-1`}
                >
                  Publish
                </button>
              </div>
              <div className="my-3">
                "The published predictions can be edited withis 5 minutes."
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCommentModal;
