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
import { UserId } from "../GetUser";
import { country_code } from "./_data";
import Spinner from "react-bootstrap/esm/Spinner";
import AxiosInstance from "../AxiosInstance";
import { Cookies, useCookies } from "react-cookie";
import { Provider, useDispatch, useSelector} from "react-redux";
import { selectUser } from "../../Redux/selector";

const EditorProfileStatisticsSection = (props) => {
  const userId = UserId()
  const cookies = new Cookies();
  const { profileData } = props;
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [SelectSport, setSelectSport] = useState("Futbol");
  const [userUid, setUserUid] = useState("");
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
  const [footballCommentType, setFootballCommentType] = useState([]);
  const [basketballStats, setBasketballStats] = useState([]);
  const [basketballCommentType, setBasketballCommentType] = useState([]);
  const [leagueFootballData, setLeagueFootballData] = useState([]);
  const [leagueBasketballData, setLeagueBasketballData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    profileData &&
      profileData?.category.map((res) => {
        // console.log("res::::::::::", res);
        setSelectSport(
          res == "Futbol" || res == "Football" ? "Futbol" : "Basketbol"
        );
      });
  }, [profileData]);
  const userData = useSelector(selectUser);
  useEffect(() => {
    // console.log(
    //   "props?.activeCommentsshow::::::::::::::",
    //   props?.activeCommentsshow
    // );
    // console.log("props?.from::::::::::::::", props?.from);
    if (props?.from === "editor" && props?.activeCommentsshow) {
      setUserUid(props.activeCommentsshow);
    } else if (props?.from === "dashboard" && userId) {
      setUserUid(userId);
    } else {
      // setUserUid(cookies.get("user-id"));
      setUserUid(userData.user.id);
      // Handle the case where neither condition is met
    }
  }, [props?.from, props?.activeCommentsshow, userId]);

  const sportsAPI = (user, categoty) => {
    // console.log("SelectSport:::::::::::::", categoty);
    if (user && categoty) {
      setIsLoading(true);
      try {
        AxiosInstance
          .get(
            `${config.apiUrl}/sports-statistics/${user}/?category=${categoty}`
          )
          .then((res) => {
            // console.log("=====>>ressssssssssssssss", res.data);
            if (res.status === 200) {
              // if (SelectSport == "football") {
              setFootballStats(res.data[0]);
              const FTData = res.data[0].comment_types.map((item, index) => {
                let pathColor = "#37FF80"; // Default color
                // Set different colors based on index
                if (index === 1) {
                  pathColor = "#4DD5FF";
                } else if (index === 2) {
                  pathColor = "#951AFF";
                } else if (index === 3) {
                  pathColor = "#FFCC00";
                }
                return { ...item, pathColor };
              });
              setFootballCommentType(FTData);
              // setLeagueBasketballData(res.data[1].football_Leagues);
              const football = res.data[0].leagues;
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
              // } else {
              //   setBasketballStats(res.data[0]);
              //   const BTData = res.data[0].basketball_comment_types.map(
              //     (item, index) => {
              //       let pathColor = "#37FF80"; // Default color
              //       // Set different colors based on index
              //       if (index === 1) {
              //         pathColor = "#4DD5FF";
              //       } else if (index === 2) {
              //         pathColor = "#951AFF";
              //       } else if (index === 3) {
              //         pathColor = "#FFCC00";
              //       }
              //       return { ...item, pathColor };
              //     }
              //   );
              //   setBasketballCommentType(BTData);
              //   const basketball = res.data[0].basketball_Leagues;

              //   const updatedBasktetball = basketball?.map((item) => {
              //     const countryCode = country_code?.find(
              //       (code) => code?.name === item?.country
              //     );
              //     if (countryCode) {
              //       const flagUrl = getFlagUrl(countryCode.code);
              //       return {
              //         ...item,
              //         flagUrl: flagUrl,
              //       };
              //     } else {
              //       return item;
              //     }
              //   });
              //   setLeagueBasketballData(updatedBasktetball);
              // }

              setIsLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // axios
    //   .get(`${config.apiUrl}/sports-statistics/${user}/`)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setBasketballStats(res.data[0]);
    //       setFootballStats(res.data[1]);

    //       const FTData = res.data[1].football_comment_types.map(
    //         (item, index) => {
    //           let pathColor = "#37FF80"; // Default color
    //           // Set different colors based on index
    //           if (index === 1) {
    //             pathColor = "#4DD5FF";
    //           } else if (index === 2) {
    //             pathColor = "#951AFF";
    //           } else if (index === 3) {
    //             pathColor = "#FFCC00";
    //           }
    //           return { ...item, pathColor };
    //         }
    //       );
    //       setFootballCommentType(FTData);

    //       const BTData = res.data[0].basketball_comment_types.map(
    //         (item, index) => {
    //           let pathColor = "#37FF80"; // Default color
    //           // Set different colors based on index
    //           if (index === 1) {
    //             pathColor = "#4DD5FF";
    //           } else if (index === 2) {
    //             pathColor = "#951AFF";
    //           } else if (index === 3) {
    //             pathColor = "#FFCC00";
    //           }
    //           return { ...item, pathColor };
    //         }
    //       );
    //       setBasketballCommentType(BTData);

    //       // setLeagueBasketballData(res.data[1].football_Leagues);
    //       const football = res.data[1].football_Leagues;
    //       const updatedFootball = football.map((item) => {
    //         const countryCode = country_code.find(
    //           (code) => code.name === item.country
    //         );
    //         if (countryCode) {
    //           const flagUrl = getFlagUrl(countryCode.code);
    //           return {
    //             ...item,
    //             flagUrl: flagUrl,
    //           };
    //         } else {
    //           return item;
    //         }
    //       });
    //       setLeagueFootballData(updatedFootball);
    //       const basketball = res.data[0].basketball_Leagues;

    //       const updatedBasktetball = basketball?.map((item) => {
    //         const countryCode = country_code?.find(
    //           (code) => code?.name === item?.country
    //         );
    //         if (countryCode) {
    //           const flagUrl = getFlagUrl(countryCode.code);
    //           return {
    //             ...item,
    //             flagUrl: flagUrl,
    //           };
    //         } else {
    //           return item;
    //         }
    //       });

    //       setLeagueBasketballData(updatedBasktetball);
    //       setIsLoading(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // console.log("user:::::::::::::::::", userUid);
    SelectSport && userUid && sportsAPI(userUid, SelectSport);
  }, [userUid, SelectSport]);

  function getFlagUrl(countryCode) {
    const country = country_code.find((code) => code.code === countryCode);
    var lowercaseCode = country.code.toLowerCase();
    if (country) {
      return `https://flagcdn.com/48x36/${lowercaseCode}.png`;
    }
    return null;
  }

  // const displayLeague =
  //   SelectSport === "Futbol"
  //     ? leagueFootballData
  //     : SelectSport === "basketball"
  //     ? leagueBasketballData
  //     : [];

  return (
    <>
      <div
        className={` ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } p-2 pb-5`}
      >
        <div className="text-end d-flex justify-content-end gap-3">
          {profileData &&
            profileData?.category.map((res) => {
              {/* console.log("res::::::::::", res); */}
              return (
                <span
                  style={{
                    color:
                      SelectSport ===
                        (res == "Futbol" || res == "Football"
                          ? "Futbol"
                          : "Basketbol") && "#D2DB08",
                  }}
                  onClick={() => {
                    // sportsAPI(
                    //   user,
                    //   res == "Futbol" || res == "Football"
                    //     ? "Futbol"
                    //     : "Basketbol"
                    // );
                    setSelectSport(
                      res == "Futbol" || res == "Football"
                        ? "Futbol"
                        : "Basketbol"
                    );
                  }}
                >
                  {res == "Futbol" || res == "Football"
                    ? "Futbol"
                    : "Basketbol"}
                </span>
              );
            })}
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
            {footballCommentType.length !== 0 ? (
              <>
                <div className="my-2">
                  <div className="my-2">Comments Type</div>
                  <div className="row g-0 my-2 justify-content-evenly">
                    {
                      // SelectSport === "football"
                      //   ?
                      footballCommentType.map((res, index) => (
                        <div className="col-3">
                          <CircularProgressbarWithChildren
                            value={res.calculation}
                            strokeWidth={5}
                            styles={buildStyles({
                              height: "100px",
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
                                  currentTheme === "dark"
                                    ? "#E6E6E6"
                                    : "#0D2A53",
                              }}
                            >
                              {res.calculation}
                            </span>
                            <div style={{ fontSize: 9, marginTop: -5 }}>
                              {res.prediction_type}
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      ))
                      // : SelectSport === "basketball"
                      // ? basketballCommentType.map((res, index) => (
                      //     <div className="col-3">
                      //       <CircularProgressbarWithChildren
                      //         value={res.calculation}
                      //         strokeWidth={5}
                      //         styles={buildStyles({
                      //           height: "100px",
                      //           textColor:
                      //             currentTheme === "dark"
                      //               ? "#E6E6E6"
                      //               : "#0D2A53",
                      //           pathColor: res.pathColor,
                      //           trailColor:
                      //             currentTheme === "dark"
                      //               ? "#0B2447"
                      //               : "#F6F6F6",
                      //         })}
                      //       >
                      //         <span
                      //           style={{
                      //             color:
                      //               currentTheme === "dark"
                      //                 ? "#E6E6E6"
                      //                 : "#0D2A53",
                      //           }}
                      //         >
                      //           {res.calculation}
                      //         </span>
                      //         <div style={{ fontSize: 10, marginTop: -5 }}>
                      //           {res.prediction_type}
                      //         </div>
                      //       </CircularProgressbarWithChildren>
                      //     </div>
                      //   ))
                      // : null
                    }
                  </div>
                </div>
                <div className="my-4">
                  <span className="my-2">Comments Journey</span>
                  <div className="my-2 text-end">
                    <span style={{ fontSize: "12px" }}>
                      Son 20 Tahmine Göre{" "}
                      <span style={{ fontSize: "16px", color: "#37FF80" }}>
                        {" "}
                        {` %${footballStats?.calculation}`}
                        {/* {SelectSport === "basketball" &&
                          ` %${basketballStats?.basketball_calculation}`} */}
                      </span>
                    </span>
                    <div className="d-flex">
                      {/* {SelectSport === "football" && ( */}
                      <>
                        {footballStats?.comments_Journey?.length == [] ? (
                          <small>No Record Found!</small>
                        ) : (
                          <>
                            {footballStats?.comments_Journey?.map(
                              (isGreen, index) => (
                                <div
                                  className={
                                    isGreen ? "green-block" : "red-block"
                                  }
                                  key={index}
                                ></div>
                              )
                            )}
                          </>
                        )}
                      </>
                      {/* )} */}
                      {/* {SelectSport === "basketball" && (
                        <>
                          {basketballStats?.Comments_Journey_basketball
                            ?.length == [] ? (
                            <small>No Record Found!</small>
                          ) : (
                            <>
                              {basketballStats?.Comments_Journey_basketball?.map(
                                (isGreen, index) => (
                                  <div
                                    className={
                                      isGreen ? "green-block" : "red-block"
                                    }
                                    key={index}
                                  ></div>
                                )
                              )}
                            </>
                          )}
                        </>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="mb-2 mt-3">
                  <div className="my-2 pb-1">Countries - Leagues</div>
                  <div className="d-flex flex-wrap gap-2">
                    <>
                      {leagueFootballData?.length == 0 ? (
                        <small>No Record Found!</small>
                      ) : (
                        <>
                          {leagueFootballData?.map((res, index) => (
                            <div
                              key={index}
                              className="p-3"
                              style={{
                                fontSize: "14px",
                                backgroundColor:
                                  currentTheme === "dark"
                                    ? "#0B2447"
                                    : "#F6F6F6",
                                borderRadius: "13px",
                              }}
                            >
                              <img
                                onContextMenu={(e) => e.preventDefault()}
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                className="flag-responsive"
                                src={res?.flagUrl}
                                alt=""
                                height={25}
                                width={25}
                              />
                              <span className="p-2 ps-2 Flag-content-font">
                                {res?.league}
                              </span>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="d-flex gap-1 my-2 pb-2 align-items-center justify-content-center"
                style={{ height: "200px" }}
              >
                No Record Found!
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default EditorProfileStatisticsSection;
