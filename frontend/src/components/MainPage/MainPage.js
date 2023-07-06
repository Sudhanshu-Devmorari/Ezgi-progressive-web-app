import React, { useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar";
import "./MainPage.css";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import Banner from "../Banner/Banner";
import { CiBasketball } from "react-icons/ci";
import { RiFootballLine } from "react-icons/ri";
import publicIcon from "../../assets/publicIcon.svg";
import CurrentTheme from "../../context/CurrentTheme";
import ContentSection from "../ContentSection/ContentSection";
import { BsStar } from "react-icons/bs";
import SharedProfile from "../SharedProfile/SharedProfile";

const MainPage = () => {
  // CHANGE THEME
  const [subscribeModalShow, setSubscribeModalShow] = useState(false);
  const [AddCommentModalShow, setAddCommentModalShow] = useState(false);

  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  // useEffect(() => {
  //   if (currentTheme === "light") {
  //     document.body.style.backgroundColor = "#F6F6F6";
  //   } else {
  //     document.body.style.backgroundColor = "#0B2447";
  //   }
  // }, [currentTheme]);

  return (
    <>
      <div className={`container-fluid mt-3`} style={{ fontFamily: "none" }}>
        <NavBar />
        <Banner />
        <div className={`row bannerText`}>
          <div
            className={`col-3 ms-2 ${
              currentTheme === "dark" ? "dark-mode" : "light-mode"
            }`}
          >
            <div className="d-flex flex-column my-2 mt-3">
              <div className=" d-flex justify-content-center">FootBall</div>
              <div className="p-2 d-flex justify-content-center">
                <RiFootballLine
                  style={{ color: "#00C936" }}
                  fontSize={"1.8rem"}
                />
              </div>
              <div className="d-flex justify-content-center">
                <span>
                  <span style={{ color: "#00C936" }}>2.655 </span>Yorum
                </span>
              </div>
            </div>
          </div>
          <div
            className={`col-3 mx-2 ${
              currentTheme === "dark" ? "dark-mode" : "light-mode"
            }`}
          >
            <div className="d-flex g-0 flex-column my-2 mt-3">
              <div className="d-flex justify-content-center">Basketball</div>
              <div className="p-2 d-flex justify-content-center">
                <CiBasketball
                  style={{ color: "#FF9100" }}
                  fontSize={"1.8rem"}
                />
              </div>
              <div className="d-flex justify-content-center">
                <span>
                  <span style={{ color: "#FF9100" }}>2.655 </span>Yorum
                </span>
              </div>
            </div>
          </div>
          <div
            className={`col-5 d-flex align-items-center justify-content-center ${
              currentTheme === "dark" ? "dark-mode" : "light-mode"
            }`}
            style={{ color: "#D2DB08" }}
          >
            Become a Editor Banner
          </div>
        </div>

        <div
          className={`${
            currentTheme === "dark" ? "dark-mode" : "light-mode"
          } d-flex g-0 my-2 align-items-center p-1`}
        >
          <div className="p-2" style={{ color: "#D2DB08" }}>
            For You
          </div>
          <div className="p-2">My Subscriptions</div>
          <div className="ms-auto p-2">
            <div className="d-flex align-items-center">
              <img
                src={publicIcon}
                alt=""
                style={{ color: "#007BF6" }}
                height={35}
                width={35}
              />
              <span className="px-2">Only Public</span>
              <div
                className={`${
                  currentTheme === "dark"
                    ? "BlankCircle-dark-mode"
                    : "BlankCircle-light-mode"
                }`}
              ></div>
            </div>
          </div>
        </div>
        <ContentSection />

        <div
          className="p-3 d-flex justify-content-center  align-items-center"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            color: currentTheme === "dark" ? "#D2DB08" : "#00659D"
          }}
        >
          <span>
            <BsStar fontSize={"1.3rem"} />
          </span>
          <span className="p-1">
            <BsStar fontSize={"1.7rem"} />
          </span>
          <span>
            <BsStar fontSize={"2.1rem"} />
          </span>
          <span className="p-1 fs-5">Highlights </span>
          <span>
            <BsStar fontSize={"2.1rem"} />
          </span>
          <span className="p-1">
            <BsStar fontSize={"1.7rem"} />
          </span>
          <span>
            <BsStar fontSize={"1.3rem"} />
          </span>
        </div>

        <SharedProfile/>

        {/* < */}

        {/* <button onClick={() => setSubscribeModalShow(true)}>Subscribe</button>
          <button onClick={() => setAddCommentModalShow(true)}>Add Comment</button> */}
        {/* <SubscribeModal show={subscribeModalShow} onHide={() => setSubscribeModalShow(false)}/>
          <AddCommentModal show={AddCommentModalShow} onHide={() => setAddCommentModalShow(false)}/> */}
      </div>
    </>
  );
};

export default MainPage;
