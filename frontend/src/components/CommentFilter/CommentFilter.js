import React, { useState } from "react";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

export const CommentFilter = () => {
  // const [categoryDropDown, setCategoryDropDown] = useState(false);
  // const [CountryDropdown, setCountryDropdown] = useState(false);
  // const [leagueDropDown, setLeagueDropDown] = useState(false);
  // const [DateDropDown, setDateDropDown] = useState(false);

  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select");

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };

  const [CategoryDropDown, setCategoryDropDown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select");

  const togglCategoryDropdown = () => {
    setCategoryDropDown(!CategoryDropDown);
  };
  const toggleCountryDropdown = () => {
    setCountryDropDown(!countryDropDown);
  };
  const handleCategorySelection = (country) => {
    setCategoryDropDown(country);
  };
  const CategoryOptions = [
    "India",
    "Turkey",
    "Paris",
    "Japan",
    "Germany",
    "USA",
    "UK",
  ];
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
      <div className="row my-3">
        <div className="col">
          {/* <Select closeMenuOnSelect={false} isMulti options={options} /> */}

          {/* Category DROPDOWN */}
          <CustomDropdown
            label="Category"
            options={CategoryOptions}
            selectedOption={selectedCategory}
            onSelectOption={handleCategorySelection}
            isOpen={CategoryDropDown}
            toggleDropdown={togglCategoryDropdown}
          />
          {/* End Category DROPDOWN */}
        </div>
        <div className="col">
          {/* Country DROPDOWN */}
          <div className="">
            <CustomDropdown
              label="Country"
              options={countryOptions}
              selectedOption={selectedCountry}
              onSelectOption={handleCountrySelection}
              isOpen={countryDropDown}
              toggleDropdown={toggleCountryDropdown}
            />
          </div>
          {/* End Country DROPDOWN */}
        </div>
        {/* League DROPDOWN */}
      </div>
      <div className="row my-3">
        <div className="col">
          <CustomDropdown
            label="League"
            options={countryOptions}
            selectedOption={selectedCountry}
            onSelectOption={handleCountrySelection}
            isOpen={countryDropDown}
            toggleDropdown={toggleCountryDropdown}
          />
        </div>
        {/* End League DROPDOWN */}
        <div className="col">
          {/* Date DropDown */}
          <div className="">
            <CustomDropdown
              label="Date"
              options={countryOptions}
              selectedOption={selectedCountry}
              onSelectOption={handleCountrySelection}
              isOpen={countryDropDown}
              toggleDropdown={toggleCountryDropdown}
            />
          </div>
          {/* End date Dropdown*/}
        </div>
      </div>
    </>
  );
};
