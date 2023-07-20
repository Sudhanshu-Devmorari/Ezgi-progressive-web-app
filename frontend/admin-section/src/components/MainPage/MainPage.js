import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import "./MainPage.css";
import NewUsers from "../NewUsers/NewUsers";
import newUser from "../../assets/user-plus.svg";
import editorIcon from "../../assets/Group 95.svg";
import subscriberIcon from "../../assets/Group 72.svg";
import commentsIcon from "../../assets/target-arrow-1.svg";
import arrowUp from "../../assets/arrow-move-up.svg";
import arrowdown from "../../assets/arrow-move-down.svg";
import sales from "../../assets/basket-1.svg";
import withdrawal from "../../assets/cash-banknote.svg";
import Home from "../Home/Home";

const MainPage = () => {
  useEffect(() => {
    document.body.classList.add("body-dark-mode");
  }, []);

  const newUsersArray = [
    {
      label: "New Users",
      icon: newUser,
      count: "127",
      per: "%22",
      color: "#58DEAA",
      rate_icon: arrowUp,
    },
  ];
  const newEditorsArray = [
    {
      label: "New Editors",
      icon: editorIcon,
      count: "127",
      per: "%22",
      color: "#58DEAA",
      rate_icon: arrowUp,
    },
  ];
  const newSubscribersArray = [
    {
      label: "New Subscribers",
      icon: subscriberIcon,
      count: "127",
      per: "%22",
      color: "#FF5757",
      rate_icon: arrowdown,
    },
  ];
  const newCommentsArray = [
    {
      label: "New Comments",
      icon: commentsIcon,
      count: "127",
      per: "%22",
      color: "#58DEAA",
      rate_icon: arrowUp,
    },
  ];
  const dailySalesArray = [
    {
      label: "Daily Sales",
      icon: sales,
      count: "12.645₺",
      per: "%22",
      color: "#58DEAA",
      rate_icon: arrowUp,
    },
  ];
  const WithdrawalRqstArray = [
    {
      label: "New Withdrawal Request",
      icon: withdrawal,
      count: "18",
      // per: "%22",
      // color: "#58DEAA",
      // rate_icon: arrowUp,
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <NavBar />
        <div className="row g-0 row-height">
          <div className="col-1">
            <SideBar />
          </div>
          <div className="col-11" style={{ fontSize: "0.8rem" }}>
            <div className="row g-0">
              <div className="col-8">
                <div className="row g-0">
                  <div className="col-4">
                    <NewUsers array={newUsersArray} />
                  </div>
                  <div className="col-4">
                    <NewUsers array={newEditorsArray} />
                  </div>
                  <div className="col-4">
                    <NewUsers array={newSubscribersArray} />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <NewUsers array={newCommentsArray} />
              </div>
            </div>
            <div className="row g-0 my-2">
              <div className="col-8">
                <Home/>
              </div>
              <div className="col-4">
                <NewUsers array={dailySalesArray} />
                <NewUsers array={WithdrawalRqstArray} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
