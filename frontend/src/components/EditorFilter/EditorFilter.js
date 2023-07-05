import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import WithdrawalModal from "../WithdrawalModal/WithdrawalModal";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import { currentTheme } from "../GetCurrentTheme";

const EditorFilter = (props) => {
  const [categoryDropDown, setCategoryDropDown] = useState(false);
  const [levelDropdown, setLevelDropdown] = useState(false);
  const [WithdrawalModalShow, setWithdrawalModalShow] = useState(false);

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
                  {/* Category DROPDOWN */}
                  <CustomDropdown
                    label="Category"
                    options={countryOptions}
                    selectedOption={selectedCountry}
                    onSelectOption={handleCountrySelection}
                    isOpen={countryDropDown}
                    toggleDropdown={toggleCountryDropdown}
                  />
                  {/* End Category DROPDOWN */}
                </div>
                <div className="col">
                  {/* Level DROPDOWN */}
                  <CustomDropdown
                    label="Level"
                    options={countryOptions}
                    selectedOption={selectedCountry}
                    onSelectOption={handleCountrySelection}
                    isOpen={countryDropDown}
                    toggleDropdown={toggleCountryDropdown}
                  />
                  {/* End Level DROPDOWN */}
                </div>
              </div>
              <div className="row my-3">
                <div className="col">
                  {/* Category DROPDOWN */}
                  <CustomDropdown
                    label="Score Point"
                    options={countryOptions}
                    selectedOption={selectedCountry}
                    onSelectOption={handleCountrySelection}
                    isOpen={countryDropDown}
                    toggleDropdown={toggleCountryDropdown}
                  />
                  {/* End Category DROPDOWN */}
                </div>
                <div className="col">
                  {/* Level DROPDOWN */}
                  <CustomDropdown
                    label="Success Rate"
                    options={countryOptions}
                    selectedOption={selectedCountry}
                    onSelectOption={handleCountrySelection}
                    isOpen={countryDropDown}
                    toggleDropdown={toggleCountryDropdown}
                  />
                  {/* End Level DROPDOWN */}
                </div>
              </div>
              <div className="d-flex justify-content-center my-4">
                <button
                  className={`${
                    currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                  } px-3 py-1`}
                  onClick={() => setWithdrawalModalShow(true)}
                >
                  Show
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <WithdrawalModal
        show={WithdrawalModalShow}
        onHide={() => setWithdrawalModalShow(false)}
      />
    </>
  );
};

export default EditorFilter;
