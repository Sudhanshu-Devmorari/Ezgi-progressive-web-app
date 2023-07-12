import React, { useState } from "react";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

export const CommentFilter = () => {
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
    setCategoryDropdown(!categoryDropdown);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };
  const toggleDateDropdown = () => {
    setDateDropdown(!dateDropdown);
  };

  const handleLeagueSelection = (league) => {
    setSelectedLeague(league);
  };
  const toggleLeagueDropdown = () => {
    setLeagueDropdown(!leagueDropdown);
  };

  return (
    <>
      <div className="row g-0 my-3 gap-3 position-relative" style={{fontSize:"15px"}}>
        <div className="col">
          <CustomDropdown
            label="Category"
            options={categoryOptions}
            selectedOption={selectedCategory}
            onSelectOption={handleCategorySelection}
            isOpen={categoryDropdown}
            toggleDropdown={toggleCategoryDropdown}
          />
        </div>
        <div className="col">
          <CustomDropdown
            label="Country"
            options={countryOptions}
            selectedOption={selectedCountry}
            onSelectOption={handleCountrySelection}
            isOpen={countryDropDown}
            toggleDropdown={toggleCountryDropdown}
          />
        </div>
      </div>
      <div className="row my-3">
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
