import React, { useState, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import config from "../../config";
import { userId } from "../GetUser";

const EditorFilter = (props) => {
  const clearFilterData = () => {
    setSelectedCountry(null)
    setSelectedLevel(null)
    setSelectedScorePoint(null)
    setSelectedSuccessRate(null)
  }
  const handleShowButtonClick = async () => {
    try {
      const response = await axios.post(
        `${config?.apiUrl}/filter-editors/?user_id=${userId}`,
        {
          category: [selectedCountry],
          lavel: selectedLevel,
          score_point: selectedScorePoint,
          success_rate: selectedSuccessRate,
        }
      );
      // const editorData = response.data.map((item) => ({
      //   type: "editor",
      //   value: item,
      // }));
      const transformedData = response.data.map((item) => ({
        type: "editor",
        value: {
          user: item.editor_data,
          subscriber_count: item.subscriber_count,
          is_highlight: item.is_highlight,
          is_fav_editor: item.is_fav_editor,
        },
      }));

      props.setFilterData(transformedData)
      clearFilterData()
      // Handle the response here if needed
      // console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const countryOptions = [
    "Futbol",
    "Basketbol",
  ];
  const levelOptions = ["Apprentice", "Journeyman", "Master","Grandmaster"];
  const scorePointOptions = ["0 - 400", "400 - 600", "600 - 800", "800+"];
  const successRateOptions = ["0 - 40", "40 - 60", , "60 - 80", "80 - 100"];

  const [countryDropDown, setCountryDropDown] = useState(false);
  const [levelDropDown, setLevelDropDown] = useState(false);
  const [scorePointDropDown, setScorePointDropDown] = useState(false);
  const [successRateDropDown, setSuccessRateDropDown] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedScorePoint, setSelectedScorePoint] = useState(null);
  const [selectedSuccessRate, setSelectedSuccessRate] = useState(null);

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
                      clearFilterData()
                      props.onHide();
                      setCountryDropDown(false);
                      setLevelDropDown(false);
                      setScorePointDropDown(false);
                      setSuccessRateDropDown(false);
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
                    selectedOption={selectedCountry?selectedCountry:"Select"}
                    onSelectOption={handleCountrySelection}
                    isOpen={countryDropDown}
                    toggleDropdown={toggleCountryDropdown}
                  />
                </div>
                <div className="col">
                  <CustomDropdown
                    label="Level"
                    options={levelOptions}
                    selectedOption={selectedLevel?selectedLevel:"Select"}
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
                    selectedOption={selectedScorePoint?selectedScorePoint:"Select"}
                    onSelectOption={handleScorePointSelection}
                    isOpen={scorePointDropDown}
                    toggleDropdown={toggleScorePointDropdown}
                  />
                </div>
                <div className="col">
                  <CustomDropdown
                    label="Success Rate"
                    options={successRateOptions}
                    selectedOption={selectedSuccessRate?selectedSuccessRate:"Select"}
                    onSelectOption={handleSuccessRateSelection}
                    isOpen={successRateDropDown}
                    toggleDropdown={toggleSuccessRateDropdown}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center my-4">
                <button
                  onClick={() => {
                    handleShowButtonClick();
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
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditorFilter;
