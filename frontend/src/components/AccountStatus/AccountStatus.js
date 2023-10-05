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

const AccountStatus = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [modalShow, setModalShow] = React.useState(false);
  const [verifyShow, setVerifyShow] = React.useState(false);
  const [subLoading, setSubLoading] = React.useState(false);
  const [commentatorSubscriptionData, setCommentatorSubscriptionData] =
    React.useState({});
  const errorSwal = () => {
    // console.log(localStorage.getItem("user-active"))

    Swal.fire({
      title: "Error",
      text: `Your account has been deactivated. Contact support for assistance.`,
      icon: "error",
      backdrop: false,
      customClass:
        currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
    });
  };
  const handleVerification = () => {
    if (JSON.parse(localStorage.getItem("user-active")) == false) {
      errorSwal();
      return;
    }
    axios
      .get(`${config?.apiUrl}/verify/${userId}`)
      .then((res) => {
        // console.log(res, "===>>>>res");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        if (
          err.response.status === 400 ||
          err.response.status === 404 ||
          err.response.status === 500
        ) {
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
      selectSub === "master" ||
      selectSub === "grandmaster";
    if (type) {
      axios
        .get(
          `${config.apiUrl}/become-editor-earn-details/${values}/?type=${selectSub}`
        )
        .then((res) => {
          if (res.status === 200) {
            setEarnings(res.data.total_earning);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const [expertLoading, setExpertLoading] = useState(false);
  const [expertData, setExpertData] = useState([]);
  useEffect(() => {
    async function getExpertData() {
      try {
        setExpertLoading(true);
        const res = await axios.get(
          `${config?.apiUrl}/subscription-setting/?commentator_level=master`
        );
        console.log(res);
        setExpertData(res?.data[0]);
        setExpertLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getExpertData();
  }, []);

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
    selectSub && fetchSubscriptionData();
  }, [selectSub]);

  useEffect(() => {
    getEarnings();
  }, [selectSubRangeData]);

  const [renewLoading, setRenewLoading] = useState(false);
  const [commentatorUser, setCommentatorUser] = useState([]);
  const getUserdata = async () => {
    try {
      setRenewLoading(true);
      const res = await axios.get(`${config.apiUrl}/user-data/${userId}`);
      // console.log(res,"=>>>>renew res")
      setCommentatorUser(res?.data?.data);
      if (res.status === 200) {
        setRenewLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserdata();
  }, []);

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
                  onClick={() => setSelectSub("master")}
                  style={{
                    color:
                      currentTheme !== "dark"
                        ? selectSub === "master"
                          ? "#007bf6"
                          : "#000"
                        : selectSub === "master"
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
            <div className={`col-8 p-2 ${expertLoading ? "pt-4" : "pt-0"}`}>
              {expertLoading ? (
                "Loading..."
              ) : (
                <div className="row g-0">
                  <div className="col text-center">
                    <div className="mb-1 d-flex flex-column">
                      <span className="font-res">1 Month Subscription</span>
                      <span className="number-font" style={{ color: "FFA200" }}>
                        {expertData?.month_1}₺
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="font-res">3 Month Subscription</span>
                      <span className="number-font" style={{ color: "FFA200" }}>
                        {expertData?.month_3}₺
                      </span>
                    </div>
                  </div>
                  <div className="col text-center">
                    <div className="mb-1 d-flex flex-column">
                      <span className="font-res">6 Month Subscription</span>
                      <span className="number-font" style={{ color: "FFA200" }}>
                        {expertData?.month_6}₺
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="font-res">12 Month Subscription</span>
                      <span className="number-font" style={{ color: "FFA200" }}>
                        {expertData?.year_1}₺
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
                onClick={() => setSelectSubRangeData("master")}
                style={{
                  color:
                    currentTheme !== "dark"
                      ? selectSubRangeData === "master"
                        ? "#007bf6"
                        : "#000"
                      : selectSubRangeData === "master"
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
                <img
                  src={buletick}
                  alt=""
                  height={50}
                  width={50}
                  onContextMenu={(e) => e.preventDefault()}
                />
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
                className="p-2 h-100"
                style={{
                  backgroundColor:
                    currentTheme === "dark" ? "#0D2A53" : "#FFFFFF",
                }}
              >
                {/* {commentatorUser?.commentator_level !== "apprentice" ? ( */}
                  <>
                    <div className="my-2 ms-2 d-flex flex-column">
                      Membership Date {props?.membershipDate}
                      <span>
                        {" "}
                        Active Plan{" "}
                        <span className="text-capitalize" style={{ color: "#007BF6" }}>{props?.commentator_level}</span>
                      </span>
                      <span>Membership Price 249.90₺</span>
                    </div>
                    <div className="d-flex justify-content-end m-2">
                      <button
                        onClick={() => {
                          if (
                            JSON.parse(localStorage.getItem("user-active")) ==
                            false
                          ) {
                            errorSwal();
                            return;
                          }
                          setModalShow(true);
                        }}
                        className="px-3"
                        style={{
                          color:
                            currentTheme === "dark" ? "#D2DB08" : "#00659D",
                          border:
                            currentTheme === "dark"
                              ? "1px solid  #D2DB08"
                              : "1px solid #00659D",
                          borderRadius: "3px",
                          backgroundColor: "transparent",
                        }}
                      >
                        {renewLoading ? "Loading" : "Renew"}
                      </button>
                    </div>
                  </>
                {/* ) : (
                  <span className="d-flex align-items-center justify-content-center h-100">
                    No Membership found!
                  </span>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubscribeModal
        commentatorUser={commentatorUser}
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
