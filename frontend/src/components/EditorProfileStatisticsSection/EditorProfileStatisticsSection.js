import React, { useContext, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "./EditorProfileStatisticsSection.css";
import londonFlag from "../../assets/London_flag.png";

const EditorProfileStatisticsSection = () => {
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
              <span style={{ fontSize: "16px", color: "#37FF80" }}> %62</span>
            </span>
            <div className="d-flex">
              <div className="green-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="green-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="green-block"></div>

              <div className="green-block"></div>
              <div className="green-block"></div>
              <div className="green-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="red-block"></div>
              <div className="green-block"></div>
              <div className="green-block"></div>
            </div>
          </div>
        </div>
        <div className="mb-2 mt-3">
          <div className="my-2 pb-1">Countries - Leagues</div>
          <div className="d-flex justify-content-between">
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
                className="flag-responsive"
                src={londonFlag}
                alt=""
                height={25}
                width={25}
              />
              <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
            </div>
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
                className="flag-responsive"
                src={londonFlag}
                alt=""
                height={25}
                width={25}
              />
              <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
            </div>
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
                className="flag-responsive"
                src={londonFlag}
                alt=""
                height={25}
                width={25}
              />
              <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
            </div>
          </div>
          <div className="d-flex justify-content-center gap-2 my-3">
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
                className="flag-responsive"
                src={londonFlag}
                alt=""
                height={25}
                width={25}
              />
              <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
            </div>
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
                className="flag-responsive"
                src={londonFlag}
                alt=""
                height={25}
                width={25}
              />
              <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
            </div>
          </div>
          <div className="d-flex justify-content-between">
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
                className="flag-responsive"
                src={londonFlag}
                alt=""
                height={25}
                width={25}
              />
              <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
            </div>
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
                className="flag-responsive"
                src={londonFlag}
                alt=""
                height={25}
                width={25}
              />
              <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
            </div>
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
                className="flag-responsive"
                src={londonFlag}
                alt=""
                height={25}
                width={25}
              />
              <span className="p-2 ps-1 Flag-content-font">Premier Lig 28</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorProfileStatisticsSection;
