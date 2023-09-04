import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "./EditorProfileStatisticsSection.css";
import londonFlag from "../../assets/London_flag.png";
import axios from "axios";
import config from "../../config";
import { userId } from "../GetUser";
import { country_code } from "./_data";
import Spinner from "react-bootstrap/esm/Spinner";

const EditorProfileStatisticsSection = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [SelectSport, setSelectSport] = useState("football");
  const progressBarFootball = [
    { score: "62%", text: "Money time", pathColor: "#37FF80" },
    { score: "62%", text: "Over - Under", pathColor: "#4DD5FF" },
    { score: "62%", text: "Half - Time", pathColor: "#951AFF" },
    { score: "62%", text: "Other", pathColor: "#FFCC00" },
  ];
  const progressBarBasketball = [
    { score: "62%", text: "Money Line", pathColor: "#37FF80" },
    { score: "62%", text: "Over - Under", pathColor: "#4DD5FF" },
    { score: "62%", text: "Quarter - Half", pathColor: "#951AFF" },
    { score: "62%", text: "Other", pathColor: "#FFCC00" },
  ];

  // API
  const [footballStats, setFootballStats] = useState([]);
  const [basketballStats, setBasketballStats] = useState([]);
  const [leagueFootballData, setLeagueFootballData] = useState([]);
  const [leagueBasketballData, setLeagueBasketballData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  let user;
  useEffect(() => {
    if (props?.from === "editor" && props?.activeCommentsshow) {
      user = props.activeCommentsshow;
    } else if (props?.from === "dashboard" && userId) {
      user = userId;
    } else {
      // Handle the case where neither condition is met
      user = localStorage.getItem('user-role'); // Set a default value if needed
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/sports-statistics/${user}/`)
      .then((res) => {
        if (res.status === 200) {
          setBasketballStats(res.data[0]);
          setFootballStats(res.data[1]);
          // setLeagueBasketballData(res.data[1].football_Leagues);
          const football = res.data[1].football_Leagues;
          const updatedFootball = football.map((item) => {
            const countryCode = country_code.find(
              (code) => code.name === item.country
            );
            if (countryCode) {
              const flagUrl = getFlagUrl(countryCode.code);
              return {
                ...item,
                flagUrl: flagUrl,
              };
            } else {
              return item;
            }
          });
          setLeagueFootballData(updatedFootball);
          const basketball = res.data[1].basketball_Leagues;
          const updatedBasktetball = basketball?.map((item) => {
            const countryCode = country_code?.find(
              (code) => code?.name === item?.country
            );
            if (countryCode) {
              const flagUrl = getFlagUrl(countryCode.code);
              return {
                ...item,
                flagUrl: flagUrl,
              };
            } else {
              return item;
            }
          });
          setLeagueBasketballData(updatedBasktetball);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function getFlagUrl(countryCode) {
    const country = country_code.find((code) => code.code === countryCode);
    var lowercaseCode = country.code.toLowerCase();
    if (country) {
      return `https://flagcdn.com/48x36/${lowercaseCode}.png`;
    }
    return null;
  }

  const displayLeague =
    SelectSport === "football"
      ? leagueFootballData
      : SelectSport === "basketball"
      ? leagueBasketballData
      : [];

  return (
    <>
      <div
        className={` ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } p-2 pb-5`}
      >
        <div className="text-end">
          <span
            style={{ color: SelectSport === "football" && "#D2DB08" }}
            onClick={() => setSelectSport("football")}
          >
            Football
          </span>
          <span
            className="ps-2"
            style={{ color: SelectSport === "basketball" && "#D2DB08" }}
            onClick={() => setSelectSport("basketball")}
          >
            Basketball
          </span>
        </div>
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <Spinner
              as="span"
              animation="border"
              size="md"
              role="status"
              aria-hidden="true"
            />
          </div>
        ) : (
          <>
            <div className="my-2">
              <div className="my-2">Comments Type</div>
              <div className="row g-0 my-2 gap-3">
                {SelectSport === "football"
                  ? progressBarFootball.map((res, index) => (
                      <div className="col">
                        <CircularProgressbarWithChildren
                          value={62}
                          strokeWidth={5}
                          styles={buildStyles({
                            textColor:
                              currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                            pathColor: res.pathColor,
                            trailColor:
                              currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                          })}
                        >
                          <span
                            style={{
                              color:
                                currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                            }}
                          >
                            {res.score}
                          </span>
                          <div style={{ fontSize: 9, marginTop: -5 }}>
                            {res.text}
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    ))
                  : SelectSport === "basketball"
                  ? progressBarBasketball.map((res, index) => (
                      <div className="col">
                        <CircularProgressbarWithChildren
                          value={62}
                          strokeWidth={5}
                          styles={buildStyles({
                            textColor:
                              currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                            pathColor: res.pathColor,
                            trailColor:
                              currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                          })}
                        >
                          <span
                            style={{
                              color:
                                currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                            }}
                          >
                            {res.score}
                          </span>
                          <div style={{ fontSize: 10, marginTop: -5 }}>
                            {res.text}
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="my-4">
              <span className="my-2">Comments Journey</span>
              <div className="my-2 text-end">
                <span style={{ fontSize: "12px" }}>
                  Son 30 Tahmine Göre{" "}
                  <span style={{ fontSize: "16px", color: "#37FF80" }}>
                    {" "}
                    {SelectSport === "football" &&
                      ` %${footballStats?.football_calculation}`}
                    {SelectSport === "basketball" &&
                      ` %${basketballStats?.basketball_calculation}`}
                  </span>
                </span>
                <div className="d-flex">
                  {SelectSport === "football" &&
                    footballStats?.Comments_Journey_football?.map(
                      (isGreen, index) => (
                        <div
                          className={isGreen ? "green-block" : "red-block"}
                          key={index}
                        ></div>
                      )
                    )}
                  {SelectSport === "basketball" &&
                    basketballStats?.Comments_Journey_basketball?.map(
                      (isGreen, index) => (
                        <div
                          className={isGreen ? "green-block" : "red-block"}
                          key={index}
                        ></div>
                      )
                    )}
                </div>
              </div>
            </div>
            <div className="mb-2 mt-3">
              <div className="my-2 pb-1">Countries - Leagues</div>
              <div className="d-flex justify-content-between">
                {displayLeague?.slice(0, 3)?.map((res, index) => (
                  <div
                    className=""
                    style={{
                      fontSize: "14px",
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                      borderRadius: "13px",
                    }}
                  >
                    <img
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      className="flag-responsive"
                      src={res?.flagUrl}
                      alt=""
                      height={25}
                      width={25}
                    />
                    <span className="p-2 ps-1 Flag-content-font">
                      {res?.league}
                    </span>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center gap-2 my-3">
                {displayLeague?.slice(3, 5)?.map((res, index) => (
                  <div
                    className=""
                    style={{
                      fontSize: "14px",
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                      borderRadius: "13px",
                    }}
                  >
                    <img
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      className="flag-responsive"
                      src={res?.flagURL}
                      alt=""
                      height={25}
                      width={25}
                    />
                    <span className="p-2 ps-1 Flag-content-font">
                      {res?.leagueName}
                    </span>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between">
                {displayLeague?.slice(5, 8)?.map((res, index) => (
                  <div
                    className=""
                    style={{
                      fontSize: "14px",
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                      borderRadius: "13px",
                    }}
                  >
                    <img
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      className="flag-responsive"
                      src={res?.flagURL}
                      alt=""
                      height={25}
                      width={25}
                    />
                    <span className="p-2 ps-1 Flag-content-font">
                      {res?.leagueName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditorProfileStatisticsSection;
