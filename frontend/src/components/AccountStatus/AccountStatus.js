import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RadialSeparators from "../RadialSeparators";
import "./AccountStatus.css";
import buletick from "../../assets/blueTick.png";
import SubscribeRenewModal from "../SubscribeRenewModal/SubscribeRenewModal";

const AccountStatus = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <div
        className={`my-2`}
        style={{
          fontSize: "14px",
          fontFamily: "Roboto",
          color: currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
        }}
      >
        <div className="row g-0">
          <div className="col-4">
            <div
              className="me-2 p-2"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
              }}
            >
              <div className="ms-3" style={{ width: 75, height: 75 }}>
                <CircularProgressbarWithChildren
                  circleRatio={0.75}
                  value={45}
                  text={`%${45}`}
                  strokeWidth={6}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    rotation: 1 / 2 + 1 / 8,
                    textColor: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                    textSize: "23px",
                    pathColor: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                    trailColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                  })}
                >
                  <RadialSeparators
                    count={55}
                    style={{
                      background: currentTheme === "dark" ? "#0D2A53" : "#fff",
                      width: "2px",
                      height: `${10}%`,
                    }}
                  />
                </CircularProgressbarWithChildren>
              </div>
              <div
                className="d-flex flex-column text-center mt-2 cicular-content-section"
                style={{ fontSize: "13px" }}
              >
                <span>Hesap Durumu</span>
                <span style={{ color: "#37FF80" }}>Aktif</span>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div
              className="p-2"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
              }}
            >
              <div className="my-2" style={{ fontSize: "13px" }}>
                <span
                  style={{
                    color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                  }}
                >
                  Journeyman
                </span>
                <span className="ps-1">Estimated Earnings</span>
              </div>
              <div className="row g-0">
                <div className="col text-center">
                  <div className="mb-1 d-flex flex-column">
                    <span className="font-res">1 Month Subscription</span>
                    <span className="number-font">49.90₺</span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="font-res">3 Month Subscription</span>
                    <span className="number-font">129.90₺</span>
                  </div>
                </div>
                <div className="col text-center">
                  <div className="mb-1 d-flex flex-column">
                    <span className="font-res">6 Month Subscription</span>
                    <span className="number-font">229.90₺</span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="font-res">12 Month Subscription</span>
                    <span className="number-font">409.90₺</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="font-res">
                    Commmision Rate{" "}
                    <span className="fw-bold" style={{ color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6", }}>
                      %25
                    </span>
                  </span>
                  <span className="font-res">
                    Next Level{" "}
                    <span className="fw-bold" style={{ color: "#FFA200" }}>
                      USTA
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row g-0 my-2"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
            }}
          >
            <div
              className="col-4 p-2 d-flex flex-column align-items-center justify-content-center"
              style={{ fontSize: "13px" }}
            >
              <span className="fw-bold" style={{ color: "#FFA200" }}>
                EXPERT
              </span>
              <span>Subscription</span>
              <span>Earnings</span>
            </div>
            <div className="col-8 p-2">
              <div className="row g-0">
                <div className="col text-center">
                  <div className="mb-1 d-flex flex-column">
                    <span className="font-res">1 Month Subscription</span>
                    <span className="number-font" style={{ color: "FFA200" }}>
                      99.09₺
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="font-res">1 Month Subscription</span>
                    <span className="number-font" style={{ color: "FFA200" }}>
                      129.90₺
                    </span>
                  </div>
                </div>
                <div className="col text-center">
                  <div className="mb-1 d-flex flex-column">
                    <span className="font-res">1 Month Subscription</span>
                    <span className="number-font" style={{ color: "FFA200" }}>
                      229.90₺
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="font-res">1 Month Subscription</span>
                    <span className="number-font" style={{ color: "FFA200" }}>
                      409.90₺
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="p-2"
            style={{
              backgroundColor: currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
              fontSize: "11px",
            }}
          >
            <div className="d-flex gap-2 my-2">
              <div className="">Estimated Maonthly Earnings</div>
              <div
                className=""
                style={{
                  color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                }}
              >
                JOURNEYMAN
              </div>
              <div className="">EXPERT</div>
              <div className="">GRANDMASTER</div>
            </div>
            <input
              className="w-100"
              type="range"
              name=""
              id=""
              style={{
                height: "2px",
                background: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
              }}
            />
            <div className="d-flex gap-3 my-2" style={{ fontSize: "12px" }}>
              <div className="">
                <span className="pe-1">Suabscriber Count</span>{" "}
                <span
                  style={{
                    color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                  }}
                >
                  {" "}
                  1.356
                </span>
              </div>
              <div className="">
                <span className="pe-1">Earning</span>{" "}
                <span
                  style={{
                    color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                  }}
                >
                  {" "}
                  21.610₺
                </span>
              </div>
            </div>
          </div>
          <div className="my-2 row g-0">
            <div className="col-5 font-respo">
              <div
                className="d-flex me-2 p-2 gap-2 flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor:
                    currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                }}
              >
                <img src={buletick} alt="" height={50} width={50} />
                <span>Unverified Account</span>
                <span>
                  <button
                    className="px-2 py-1 font-respo"
                    style={{
                      color: currentTheme === "dark" ? "#37FF80" : "#00DE51",
                      border:
                        currentTheme === "dark"
                          ? "1px solid  #37FF80"
                          : "1px solid #00DE51",
                      borderRadius: "3px",
                      backgroundColor: "transparent",
                    }}
                  >
                    Verified Now
                  </button>
                </span>
              </div>
            </div>
            <div className="col-7 fonts">
              <div
                className="p-2"
                style={{
                  backgroundColor:
                    currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                }}
              >
                Membership Date 15-04-2023
                <div className="my-2 ms-2 d-flex flex-column">
                  <span>
                    {" "}
                    Active Plan{" "}
                    <span style={{ color: "#007BF6" }}>Journeyman</span>
                  </span>
                  <span>Membership Price 249.90₺</span>
                </div>
                <div className="d-flex justify-content-end m-2">
                  <button
                    onClick={() => setModalShow(true)}
                    className="px-3"
                    style={{
                      color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                      border:
                        currentTheme === "dark"
                          ? "1px solid  #D2DB08"
                          : "1px solid #00659D",
                      borderRadius: "3px",
                      backgroundColor: "transparent",
                    }}
                  >
                    Renew
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubscribeRenewModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AccountStatus;
