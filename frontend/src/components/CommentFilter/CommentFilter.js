import React, { useContext, useState } from "react";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import CurrentTheme from "../../context/CurrentTheme";

export const CommentFilter = () => {
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select");

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };

  const toggleCountryDropdown = () => {
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    if (leagueDropdown) {
      setLeagueDropdown(false);
    }
    if (dateDropdown) {
      setDateDropdown(false);
    }
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

  const categoryOptions = ["Category 1", "Category 2", "Category 3"];
  const dateOptions = ["Date 1", "Date 2", "Date 3"];
  const leagueOptions = ["League 1", "League 2", "League 3"];

  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select");
  const [dateDropdown, setDateDropdown] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("Select");
  const [leagueDropdown, setLeagueDropdown] = useState(false);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };
  const toggleCategoryDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (leagueDropdown) {
      setLeagueDropdown(false);
    }
    if (dateDropdown) {
      setDateDropdown(false);
    }
    setCategoryDropdown(!categoryDropdown);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };
  const toggleDateDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (leagueDropdown) {
      setLeagueDropdown(false);
    }
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    setDateDropdown(!dateDropdown);
  };

  const handleLeagueSelection = (league) => {
    setSelectedLeague(league);
  };
  const toggleLeagueDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (dateDropdown) {
      setDateDropdown(false);
    }
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    setLeagueDropdown(!leagueDropdown);
  };
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  return (
    <>
      <div
        className="row g-0 my-3 gap-3 position-relative"
        style={{ fontSize: "15px" }}
      >
        <div className="col">
          {/* <CustomDropdown
            label="Category"
            options={categoryOptions}
            selectedOption={selectedCategory}
            onSelectOption={handleCategorySelection}
            isOpen={categoryDropdown}
            toggleDropdown={toggleCategoryDropdown}
          /> */}
          <div className="my-2">
            <span>Category</span>
            <div
              className={`${
                currentTheme === "dark"
                  ? "customDropdown-dark-mode"
                  : "customDropdown-light-mode"
              } p-1 text-center`}
              onClick={toggleCategoryDropdown}
            >
              <span>{selectedCategory}</span>
            </div>
            <div
              className={`${
                currentTheme === "dark"
                  ? "customDropdown-content-dark-mode"
                  : "customDropdown-content-light-mode"
              } pt-2 flex-column d-flex text-center ${
                categoryDropdown ? "d-block" : "d-none"
              }`}
              style={{
                width: "48%",
              }}
            >
              {categoryOptions.map((option, index) => (
                <span
                  className={`${
                    currentTheme === "dark"
                      ? "dpcontent-dark-mode"
                      : "dpcontent-light-mode"
                  } my-1 p-2`}
                  key={index}
                  onClick={() => {
                    handleCategorySelection(option);
                    toggleCategoryDropdown();
                  }}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="my-2">
            <span>Country</span>
            <div
              className={`${
                currentTheme === "dark"
                  ? "customDropdown-dark-mode"
                  : "customDropdown-light-mode"
              } p-1 text-center`}
              onClick={toggleCountryDropdown}
            >
              <span>{selectedCountry}</span>
            </div>
            <div
              className={`${
                currentTheme === "dark"
                  ? "customDropdown-content-dark-mode"
                  : "customDropdown-content-light-mode"
              } pt-2 flex-column d-flex text-center ${
                countryDropDown ? "d-block" : "d-none"
              }`}
              style={{
                width: "46%",
              }}
            >
              {countryOptions.map((option, index) => (
                <span
                  className={`${
                    currentTheme === "dark"
                      ? "dpcontent-dark-mode"
                      : "dpcontent-light-mode"
                  } my-1 p-2`}
                  key={index}
                  onClick={() => {
                    handleCountrySelection(option);
                    toggleCountryDropdown();
                  }}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="row g-0 my-3 gap-3 position-relative"
        style={{ fontSize: "15px" }}
      >
        {/* <div className="row my-3" style={{ fontSize: "15px" }}> */}
        <div className="col">
          <CustomDropdown
            label="League"
            options={leagueOptions}
            selectedOption={selectedLeague}
            onSelectOption={handleLeagueSelection}
            isOpen={leagueDropdown}
            toggleDropdown={toggleLeagueDropdown}
          />
        </div>
        <div className="col">
          <CustomDropdown
            label="Date"
            options={dateOptions}
            selectedOption={selectedDate}
            onSelectOption={handleDateSelection}
            isOpen={dateDropdown}
            toggleDropdown={toggleDateDropdown}
          />
        </div>
      </div>
    </>
  );
};
