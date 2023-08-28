import React, { useEffect, useContext, useState } from "react";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";


export const CommentFilter = (props) => {
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select");
  const [categoryType, setCategoryType] = useState(null);

  const [LeagueValue, setLeagueValue] = useState([]);
  const [DateValue, setDateValue] = useState([]);


  const handleCountrySelection = (country) => {
    props.setCountryData(country)
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
  // const countryOptions = [
  //   "India",
  //   "Turkey",
  //   "Paris",
  //   "Japan",
  //   "Germany",
  //   "USA",
  //   "UK",
  // ];
  const [countryOptions, setCountryOptions] = useState([]);


  // const categoryOptions = ["Football", "Basketball"];
  const categoryOptions = ["Futbol", "Basketbol"];

  // const dateOptions = ["Date 1", "Date 2", "Date 3"];
  const dateOptions = DateValue;
  // const leagueOptions = ["League 1", "League 2", "League 3"];DateValue
  const leagueOptions = LeagueValue;

  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select");
  const [dateDropdown, setDateDropdown] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("Select");
  const [leagueDropdown, setLeagueDropdown] = useState(false);

  useEffect(() => {
    async function getCountryOptions() {
      if (selectedCategory !== "Select") {
        try {
          const headers = {
            // Authorization: `Bearer ${process.env.REACT_APP_NOISYAPIKEY}`,
            Authorization: `Bearer lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np`
          };
          let type;
          if (selectedCategory === "Futbol") {
            type = 1;
          } else if (selectedCategory === "Basketbol") {
            type = 2;
          }
          setCategoryType(type);
          const res = await axios.get(
            `https://www.nosyapi.com/apiv2/bets/getMatchesCountryList?type=${type}`,
            { headers }
          );
          const countryData = res.data.data;
          setCountryOptions(countryData.map((item) => item.country));

        } catch (error) {
          console.log(error);
        }
      }
    }
    getCountryOptions();
  }, [selectedCategory]);

  useEffect(() => {
    async function getLeague() {
      if (selectedCountry !== "Select") {
        try {
          const headers = {
            // Authorization: `Bearer ${process.env.REACT_APP_NOISYAPIKEY}`,
            Authorization: `Bearer lnIttTJHmoftk74gnHNLgRpTjrPzOAkh5nK5yu23SgxU9P3wARDQB2hqv3np`
          };
          // contriesAPi(categoryType, selectedCountry);
          const res = await axios.get(
            `https://www.nosyapi.com/apiv2/bets/getMatchesLeague?type=${categoryType}&country=${selectedCountry}`,
            { headers }
          );
          const leagueValue = res.data.data.map((item) => item.league);
          setLeagueValue(leagueValue);
          if (selectedLeague !== "Select") {
            const res = await axios.get(
              `https://www.nosyapi.com/apiv2/bets/getMatchesDateList?type=${categoryType}&league=${selectedLeague}`,
              { headers }
            );
            setDateValue(res?.data?.data.map((item) => item.date));

            if (selectedDate !== "Select") {
              const res1 = await axios.get(
                `https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=${categoryType}&league=${selectedLeague}&t=${selectedDate}`,
                { headers }
              );

              props.setMatchdetailsValue(res1?.data?.data?.map((item) => item.takimlar));
              // props.setSelectedMatchDetails(res1?.data?.data?.map((item) => item.takimlar));
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    getLeague();
  }, [selectedCountry, selectedLeague, selectedDate]);

  const handleCategorySelection = (category) => {
    props.setCategoryData(category)
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
    props.setDateData(date)
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
    props.setLeagueData(league)
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
