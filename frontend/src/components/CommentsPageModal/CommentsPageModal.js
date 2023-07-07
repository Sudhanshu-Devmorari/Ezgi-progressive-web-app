import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./CommentsPageModal.css";
import { RxCross2 } from "react-icons/rx";
// import MultiSelect from "react-native-multiple-select";
import Select from "react-select";
import EditorFilter from "../EditorFilter/EditorFilter";
import { CommentFilter } from "../CommentFilter/CommentFilter";
import { currentTheme } from "../GetCurrentTheme";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

const CommentsPageModal = (props) => {
  const [MatchDropDown, setMatchDropDown] = useState(false);
  const [LevelDropdown, setLevelDropdown] = useState(false);
  const [PredictionType, setPredictionType] = useState(false);

  const [editorFilterModal, setEditorFlterModal] = useState(false);

  const options = [
    { value: "React", label: "React" },
    { value: "React Native", label: "React Native" },
    { value: "Vue", label: "Vue" },
    { value: "Angular", label: "Angular" },
    { value: "RxJS", label: "RxJS" },
    { value: "jQuery", label: "jQuery" },
  ];

  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select");

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };

  const toggleCountryDropdown = () => {
    setCountryDropDown(!countryDropDown);
  };

  const countryOptions = [
    "India",
    "Turkey",
    "Paris",
    "Japan",
    "Germany",
    "USA",
    "UK",
  ];

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
                options={countryOptions}
                selectedOption={selectedCountry}
                onSelectOption={handleCountrySelection}
                isOpen={countryDropDown}
                toggleDropdown={toggleCountryDropdown}
              />
            </div>
            <div className="row my-3">
              <div className="col">
                <CustomDropdown
                  label="Level Details"
                  options={countryOptions}
                  selectedOption={selectedCountry}
                  onSelectOption={handleCountrySelection}
                  isOpen={countryDropDown}
                  toggleDropdown={toggleCountryDropdown}
                />
              </div>
              <div className="col">
                <CustomDropdown
                  label="Prediction Type"
                  options={countryOptions}
                  selectedOption={selectedCountry}
                  onSelectOption={handleCountrySelection}
                  isOpen={countryDropDown}
                  toggleDropdown={toggleCountryDropdown}
                />
              </div>
            </div>
            <div className="my-4">
              <div className="row">
                <div className="col d-flex align-items-center">
                  <div
                    className="me-2"
                    style={{
                      border: "3px solid #007BF6",
                      borderRadius: " 50%",
                      width: "2rem",
                      height: "2rem",
                    }}
                  ></div>
                  <span className="">Only Public</span>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                  <span className="">Only Subscriber</span>
                  <div
                    className="ms-2"
                    style={{
                      border:
                        currentTheme === "dark"
                          ? "3px solid #E6E6E6"
                          : "3px solid #0D2A53",
                      borderRadius: " 50%",
                      width: "2rem",
                      height: "2rem",
                    }}
                  ></div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col d-flex align-items-center">
                  <div
                    className="me-2"
                    style={{
                      border:
                        currentTheme === "dark"
                          ? "3px solid #E6E6E6"
                          : "3px solid #0D2A53",
                      borderRadius: " 50%",
                      width: "2rem",
                      height: "2rem",
                    }}
                  ></div>
                  <span className="">Finished</span>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                  <span className="">Not Started</span>
                  <div
                    className="ms-2"
                    style={{
                      border: "3px solid #FFCC00",
                      borderRadius: " 50%",
                      width: "2rem",
                      height: "2rem",
                    }}
                  ></div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col d-flex align-items-center">
                  <div
                    className="me-2"
                    style={{
                      border:
                        currentTheme === "dark"
                          ? "3px solid #E6E6E6"
                          : "3px solid #0D2A53",
                      borderRadius: " 50%",
                      width: "2rem",
                      height: "2rem",
                    }}
                  ></div>
                  <span className="">Winning</span>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                  <span className="">Lose</span>
                  <div
                    className="ms-2"
                    style={{
                      border:
                        currentTheme === "dark"
                          ? "3px solid #E6E6E6"
                          : "3px solid #0D2A53",
                      borderRadius: " 50%",
                      width: "2rem",
                      height: "2rem",
                    }}
                  ></div>
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
