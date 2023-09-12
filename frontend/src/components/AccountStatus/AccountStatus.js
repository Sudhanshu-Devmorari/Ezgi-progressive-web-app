import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { userId } from "../GetUser";
import Swal from "sweetalert2";
import VerificationModal from "../VerificationModal/VerificationModal";
import config from "../../config";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import { Range, getTrackBackground } from "react-range";

const AccountStatus = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [modalShow, setModalShow] = React.useState(false);
  const [verifyShow, setVerifyShow] = React.useState(false);
  const [subLoading, setSubLoading] = React.useState(false);
  const [commentatorSubscriptionData, setCommentatorSubscriptionData] =
    React.useState({});

  const handleVerification = () => {
    axios
      .get(`${config?.apiUrl}/verify/${userId}`)
      .then((res) => {
        // console.log(res, "===>>>>res");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        if (err.response.status === 404) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          });
        } else if (err.response.status === 200) {
          setVerifyShow(true);
        }
      });
  };

  // Editor earning API
  const [earnings, setEarnings] = useState(0);
  const [selectSub, setSelectSub] = useState("journeyman");
  const [selectSubRangeData, setSelectSubRangeData] = useState("journeyman");
  const [values, setValues] = useState([0]);

  const STEP = 1;
  const MIN = 0;
  const MAX = 1000;
  function getEarnings() {
    const type =
      selectSub === "journeyman" ||
      selectSub === "expert" ||
      selectSub === "grandmaster";
    if (type) {
      axios
        .get(
          `${config.apiUrl}/become-editor-earn-details/${values}/?type=${type}`
        )
        .then((res) => {
          if (res.status === 200) {
            setEarnings(res.data.total_earning);
          }
        })
        .catch((error) => {
          console.log(error);
          // if (error.response.status === 404 || error.response.status === 500) {
          //   Swal.fire({
          //     title: "Error",
          //     text: error.response.data.error,
          //     icon: "error",
          //     backdrop: false,
          //     customClass:
          //       currentTheme === "dark"
          //         ? "dark-mode-alert"
          //         : "light-mode-alert",
          //   });
          // }
        });
    }
  }

  const fetchSubscriptionData = async () => {
    setSubLoading(true);
    try {
      const res = await axios.get(
        `${
          config?.apiUrl
        }/subscription-setting/?commentator_level=${selectSub?.toLowerCase()}`
      );
      const commisionData = await axios.get(
        `${
          config?.apiUrl
        }/membership-setting/?commentator_level=${selectSub?.toLowerCase()}`
      );
      setTimeout(() => {
        setCommentatorSubscriptionData({
          ...res?.data[0],
          commission_rate: commisionData?.data[0]?.commission_rate,
        });
        setSubLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error, "fetchy error:::::::::");
      setSubLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, [selectSub]);

  useEffect(() => {
    getEarnings();
  }, [selectSubRangeData]);

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
                height: "100%",
              }}
            >
              <div className="d-flex justify-content-center  gap-2 fw-medium my-2">
                <span
                  className="cursor text-center"
                  onClick={() => setSelectSub("journeyman")}
                  style={{
                    color:
                      currentTheme !== "dark"
                        ? selectSub === "journeyman"
                          ? "#007bf6"
                          : "#000"
                        : selectSub === "journeyman"
                        ? "#4dd5ff"
                        : "#fff",
                  }}
                >
                  Journeyman
                </span>
                <span
                  className="cursor text-center"
                  onClick={() => setSelectSub("expert")}
                  style={{
                    color:
                      currentTheme !== "dark"
                        ? selectSub === "expert"
                          ? "#007bf6"
                          : "#000"
                        : selectSub === "expert"
                        ? "#4dd5ff"
                        : "#fff",
                  }}
                >
                  Expert
                </span>
                <span
                  className="cursor text-center"
                  onClick={() => setSelectSub("grandmaster")}
                  style={{
                    color:
                      currentTheme !== "dark"
                        ? selectSub === "grandmaster"
                          ? "#007bf6"
                          : "#000"
                        : selectSub === "grandmaster"
                        ? "#4dd5ff"
                        : "#fff",
                  }}
                >
                  Grandmaster
                </span>
              </div>
              <div
                className={`row g-0 justify-content-center ${
                  subLoading ? "pt-4" : "pt-0"
                }`}
              >
                {subLoading ? (
                  "Loading...."
                ) : (
                  <>
                    <div className="col text-center">
                      <div className="mb-1 d-flex flex-column">
                        <span className="font-res">1 Month Subscription</span>
                        <span className="number-font">
                          {commentatorSubscriptionData?.month_1}₺
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="font-res">3 Month Subscription</span>
                        <span className="number-font">
                          {commentatorSubscriptionData?.month_3}₺
                        </span>
                      </div>
                    </div>
                    <div className="col text-center">
                      <div className="mb-1 d-flex flex-column">
                        <span className="font-res">6 Month Subscription</span>
                        <span className="number-font">
                          {commentatorSubscriptionData?.month_6}₺
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="font-res">12 Month Subscription</span>
                        <span className="number-font">
                          {commentatorSubscriptionData?.year_1}₺
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="font-res">
                        Commmision Rate{" "}
                        <span
                          className="fw-bold"
                          style={{
                            color:
                              currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
                          }}
                        >
                          {commentatorSubscriptionData?.commission_rate}
                        </span>
                      </span>
                      <span className="font-res">
                        Next Level{" "}
                        <span className="fw-bold" style={{ color: "#FFA200" }}>
                          USTA
                        </span>
                      </span>
                    </div>
                  </>
                )}
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
              <div className="">Estimated Monthly Earnings</div>
              <span
                className="cursor text-center"
                onClick={() => setSelectSubRangeData("journeyman")}
                style={{
                  color:
                    currentTheme !== "dark"
                      ? selectSubRangeData === "journeyman"
                        ? "#007bf6"
                        : "#000"
                      : selectSubRangeData === "journeyman"
                      ? "#4dd5ff"
                      : "#fff",
                }}
              >
                JOURNEYMAN
              </span>
              <span
                className="cursor text-center"
                onClick={() => setSelectSubRangeData("expert")}
                style={{
                  color:
                    currentTheme !== "dark"
                      ? selectSubRangeData === "expert"
                        ? "#007bf6"
                        : "#000"
                      : selectSubRangeData === "expert"
                      ? "#4dd5ff"
                      : "#fff",
                }}
              >
                EXPERT
              </span>
              <span
                className="cursor text-center"
                onClick={() => setSelectSubRangeData("grandmaster")}
                style={{
                  color:
                    currentTheme !== "dark"
                      ? selectSubRangeData === "grandmaster"
                        ? "#007bf6"
                        : "#000"
                      : selectSubRangeData === "grandmaster"
                      ? "#4dd5ff"
                      : "#fff",
                }}
              >
                GRANDMASTER
              </span>
            </div>

            <Range
              values={values}
              step={STEP}
              min={MIN}
              max={MAX}
              // onChange={(newValues) => getEarnings()}
              onChange={(newValues) => {
                setValues(newValues);
                getEarnings();
              }}
              renderTrack={({ props, children }) => {
                return (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "4px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values: values,
                          colors: [
                            currentTheme === "dark" ? "#4DD5FF" : "#007bf6",
                            currentTheme === "dark" ? "#fff" : "#313131",
                          ],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                );
              }}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    backgroundColor:
                      currentTheme === "dark" ? "#4DD5FF" : "#007bf6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              )}
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
                  {values}
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
                  {earnings}₺
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
                    onClick={handleVerification}
                    // onClick={() => setVerifyShow(true)}
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
      <SubscribeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        text="renew"
      />
      <VerificationModal
        show={verifyShow}
        onHide={() => setVerifyShow(false)}
      />
    </>
  );
};

export default AccountStatus;
