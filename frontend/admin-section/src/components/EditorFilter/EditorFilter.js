import React, { useState } from "react";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import cross from "../../assets/Group 81.svg";

const EditorFilter = () => {
  const GenderFilterOptions = ["option 1", "option 2"];
  const LevelOptions = ["option 1", "option 2"];
  const CityFilterOptions = ["option 1", "option 2"];
  const ageFilterOptions = ["option 1", "option 2"];
  const SuccessRateFilterOptions = ["option 3", "option 4"];
  const ScorePointFilterOptions = ["option 5", "option 6"];

  const [selectedSuccessRateFilter, setSelectedSuccessRateFilter] =
    useState("Select");
  const [successRateFilterDropDown, setSuccessRateFilterDropDown] =
    useState(false);

  const [selectedScorePointFilter, setSelectedScorePointFilter] =
    useState("Select");
  const [scorePointFilterDropDown, setScorePointFilterDropDown] =
    useState(false);

  const [selectedGenderFilter, setSelectedGenderFilter] = useState("Select");
  const [genderFilterDropDown, setGenderFilterDropDown] = useState(false);

  const [selectedLevelFilter, setSelectedLevelFilter] = useState("Select");
  const [levelFilterDropDown, setLevelFilterDropDown] = useState(false);

  const [selectedCityFilter, setSelectedCityFilter] = useState("Select");
  const [cityFilterDropDown, setCityFilterDropDown] = useState(false);

  const [selectedAgeFilter, setSelectedAgeFilter] = useState("Select");
  const [ageFilterDropDown, setAgeFilterDropDown] = useState(false);

  const handleCityFilterSelection = (gender) => {
    setSelectedCityFilter(gender);
  };
  const toggleCityFilterDropdown = () => {
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setCityFilterDropDown(!cityFilterDropDown);
  };
  const handleGenderFilterSelection = (gender) => {
    setSelectedGenderFilter(gender);
  };
  const toggleGenderFilterDropdown = () => {
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setGenderFilterDropDown(!genderFilterDropDown);
  };
  const handleAgeFilterSelection = (gender) => {
    setSelectedAgeFilter(gender);
  };
  const toggleAgeFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setAgeFilterDropDown(!ageFilterDropDown);
  };
  const toggleLevelFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setLevelFilterDropDown(!levelFilterDropDown);
  };
  const handleLevelFilterSelection = (gender) => {
    setSelectedLevelFilter(gender);
  };
  const handleSuccessRateFilterSelection = (rate) => {
    setSelectedSuccessRateFilter(rate);
  };

  const handleScorePointFilterSelection = (point) => {
    setSelectedScorePointFilter(point);
  };

  const toggleSuccessRateFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    setSuccessRateFilterDropDown(!successRateFilterDropDown);
  };

  const toggleScorePointFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setScorePointFilterDropDown(!scorePointFilterDropDown);
  };

  return (
    <>
      <div
        className="modal fade"
        id="filterModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body dark-mode position-relative">
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Level"
                    options={LevelOptions}
                    selectedOption={selectedLevelFilter}
                    onSelectOption={handleLevelFilterSelection}
                    isOpen={levelFilterDropDown}
                    toggleDropdown={toggleLevelFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Success Rate"
                    options={SuccessRateFilterOptions}
                    selectedOption={selectedSuccessRateFilter}
                    onSelectOption={handleSuccessRateFilterSelection}
                    isOpen={successRateFilterDropDown}
                    toggleDropdown={toggleSuccessRateFilterDropdown}
                  />
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Score Point"
                    options={ScorePointFilterOptions}
                    selectedOption={selectedScorePointFilter}
                    onSelectOption={handleScorePointFilterSelection}
                    isOpen={scorePointFilterDropDown}
                    toggleDropdown={toggleScorePointFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  <div className="my-2">
                    <span>City</span>
                    <div
                      className={`${"customDropdown-dark-mode"} p-1 text-center`}
                      onClick={toggleCityFilterDropdown}
                    >
                      <span>{selectedCityFilter}</span>
                    </div>
                    <div
                      className={`customDropdown-content-dark-mode p-2 flex-column d-flex text-center ${
                        cityFilterDropDown ? "d-block" : "d-none"
                      }`}
                      style={{
                        width: "45%",
                      }}
                    >
                      {CityFilterOptions.map((option, index) => (
                        <span
                          className="dpcontent-dark-mode my-1 p-2"
                          key={index}
                          onClick={() => {
                            handleCityFilterSelection(option);
                            toggleCityFilterDropdown();
                          }}
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Gender"
                    options={GenderFilterOptions}
                    selectedOption={selectedGenderFilter}
                    onSelectOption={handleGenderFilterSelection}
                    isOpen={genderFilterDropDown}
                    toggleDropdown={toggleGenderFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Age"
                    options={ageFilterOptions}
                    selectedOption={selectedAgeFilter}
                    ap-2
                    onSelectOption={handleAgeFilterSelection}
                    isOpen={ageFilterDropDown}
                    toggleDropdown={toggleAgeFilterDropdown}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center my-2">
                <button
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

export default EditorFilter;
