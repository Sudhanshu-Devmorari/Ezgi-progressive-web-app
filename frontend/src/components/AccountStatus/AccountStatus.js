import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RadialSeparators from "../RadialSeparators";
import "./AccountStatus.css"

const AccountStatus = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } my-2 p-2`}
        style={{ fontSize: "14px" }}
      >
        <div className="row g-0">
          <div className="col-4">
            <div
              className="me-2 p-2"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
            <div className="" style={{ width: 75, height: 75 }}>
              <CircularProgressbarWithChildren
                circleRatio={0.75}
                value={45}
                text={`${45}%`}
                strokeWidth={6}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  rotation: 1 / 2 + 1 / 8,
                  textColor: "#007BF6",
                  textSize: "23px",
                  pathColor: "#007BF6",
                })}
              >
                <RadialSeparators
                  count={55}
                  style={{
                    background: "#fff",
                    width: "2px",
                    height: `${10}%`,
                  }}
                />
              </CircularProgressbarWithChildren>
            </div>
            <span>Hesap Durumu</span>
            <span style={{color: "#37FF80"}}>Aktif</span>
            </div>
          </div>
          <div className="col-8">
            <div
              className="p-2"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              <div className="my-2" style={{fontSize:"14px"}}>
                <span style={{color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6"}}>Journeyman</span>
                <span className="ps-1">Estimated Earnings</span>
              </div>
              <div className="row g-0">
                <div className="col d-flex flex-column text-center">
                    <span className="font-res">1 Month Subscription</span>
                    <span>49.90₺</span>
                </div>
                <div className="col d-flex flex-column text-center">
                    <span className="font-res">3 Month Subscription</span>
                    <span>129.90₺</span>
                </div>
              </div>
              <div className="row g-0 my-2">
                <div className="col d-flex flex-column text-center">
                    <span className="font-res">6 Month Subscription</span>
                    <span>229.90₺</span>
                </div>
                <div className="col d-flex flex-column text-center">
                    <span className="font-res">12 Month Subscription</span>
                    <span>409.90₺</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <span>Commmision Rate <span className="fw-bold" style={{color: "#007BF6"}}>%25</span></span>
                <span>Next Level <span className="fw-bold" style={{color: "#FFA200"}}>USTA</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountStatus;
