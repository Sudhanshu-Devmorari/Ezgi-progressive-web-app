import React, { useState, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import CurrentTheme from "../../context/CurrentTheme";

const EditorFilter = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const countryOptions = [
    "India",
    "Turkey",
    "Paris",
    "Japan",
    "Germany",
    "USA",
    "UK",
  ];
  const levelOptions = ["Beginner", "Intermediate", "Advanced"];
  const scorePointOptions = [0, 10];
  const successRateOptions = [0, 25, 50, 75, 100];

  const [countryDropDown, setCountryDropDown] = useState(false);
  const [levelDropDown, setLevelDropDown] = useState(false);
  const [scorePointDropDown, setScorePointDropDown] = useState(false);
  const [successRateDropDown, setSuccessRateDropDown] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("Select");
  const [selectedLevel, setSelectedLevel] = useState("Select");
  const [selectedScorePoint, setSelectedScorePoint] = useState("Select");
  const [selectedSuccessRate, setSelectedSuccessRate] = useState("Select");

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };

  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
  };

  const handleScorePointSelection = (scorePoint) => {
    setSelectedScorePoint(scorePoint);
  };

  const handleSuccessRateSelection = (successRate) => {
    setSelectedSuccessRate(successRate);
  };

  const toggleCountryDropdown = () => {
    setCountryDropDown(!countryDropDown);
    setLevelDropDown(false);
    setScorePointDropDown(false);
    setSuccessRateDropDown(false);
  };

  const toggleLevelDropdown = () => {
    setLevelDropDown(!levelDropDown);
    setCountryDropDown(false);
    setScorePointDropDown(false);
    setSuccessRateDropDown(false);
  };

  const toggleScorePointDropdown = () => {
    setScorePointDropDown(!scorePointDropDown);
    setCountryDropDown(false);
    setLevelDropDown(false);
    setSuccessRateDropDown(false);
  };

  const toggleSuccessRateDropdown = () => {
    setSuccessRateDropDown(!successRateDropDown);
    setCountryDropDown(false);
    setLevelDropDown(false);
    setScorePointDropDown(false);
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
        <Modal.Body
          className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}
        >
          <div>
            <div className="m-3 mt-4">
              <div className="d-flex justify-content-center">
                <span>
                  <RxCross2
                    onClick={() => {
                      props.onHide();
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
              <div className="row">
                <div className="col">
                  <CustomDropdown
                    label="Category"
                    options={countryOptions}
                    selectedOption={selectedCountry}
                    onSelectOption={handleCountrySelection}
                    isOpen={countryDropDown}
                    toggleDropdown={toggleCountryDropdown}
                  />
                </div>
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
              </div>
              <div className="row my-3">
                <div className="col">
                  <CustomDropdown
                    label="Score Point"
                    options={scorePointOptions}
                    selectedOption={selectedScorePoint}
                    onSelectOption={handleScorePointSelection}
                    isOpen={scorePointDropDown}
                    toggleDropdown={toggleScorePointDropdown}
                  />
                </div>
                <div className="col">
                  <CustomDropdown
                    label="Success Rate"
                    options={successRateOptions}
                    selectedOption={selectedSuccessRate}
                    onSelectOption={handleSuccessRateSelection}
                    isOpen={successRateDropDown}
                    toggleDropdown={toggleSuccessRateDropdown}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center my-4">
                <button
                  className={`${
                    currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                  } px-3 py-1`}
                >
                  Show
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditorFilter;
