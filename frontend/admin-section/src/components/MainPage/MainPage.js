import React, { useEffect, useState } from "react";
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
import UserTimeLine from "../UserTimeLine/UserTimeLine";
import gender_female from "../../assets/gender-female.png";
import gender_male from "../../assets/gender-male.png";
import profile from "../../assets/profile.png";
import user1 from "../../assets/user1.png";
import winner from "../../assets/Group 73.png";
import lose from "../../assets/Lose.png";
import CommentsManagementPage from "../CommentsManagementPage/CommentsManagementPage";
import MostLiked from "../MostLiked/MostLiked";
import LevelCount from "../LevelCount/LevelCount";
import EditorManagemenetPage from "../EditorManagemenetPage/EditorManagemenetPage";
import Top10 from "../Top10/Top10";
import EditorAccountStatus from "../EditorAccountStatus/EditorAccountStatus";
import Requests from "../Requests/Requests";
import bluetick from "../../assets/MDI - check-decagram.svg";
import deactivation from "../../assets/user-off.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MainPage = () => {
  const [showDetails, setshowDetails] = useState("home");
  const [modalShow, setModalShow] = useState(false);

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
      rate_icon: "arrowUp",
    },
  ];
  const newEditorsArray = [
    {
      label: "New Editors",
      icon: editorIcon,
      count: "127",
      per: "%22",
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const newSubscribersArray = [
    {
      label: "New Subscribers",
      icon: subscriberIcon,
      count: "127",
      per: "%22",
      color: "#FF5757",
      rate_icon: "arrowdown",
    },
  ];
  const newCommentsArray = [
    {
      label: "New Comments",
      icon: commentsIcon,
      count: "127",
      per: "%22",
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const dailySalesArray = [
    {
      label: "Daily Sales",
      icon: sales,
      count: "12.645₺",
      per: "%22",
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const WithdrawalRqstArray = [
    {
      label: "New Withdrawal Request",
      icon: withdrawal,
      count: "18",
    },
  ];
  const winnertArray = [
    {
      label: "Winner",
      icon: winner,
      count: "127",
      per: "%22",
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const losetArray = [
    {
      label: "Lose",
      icon: lose,
      count: "127",
      per: "%22",
      color: "#FF5757",
      rate_icon: "arrowDown",
    },
  ];
  const totalArray = [
    {
      label: "Total",
      count: "12.700",
      rateWin: "9.845",
      rateLose: "9.845",
      perWin: "%22",
      perLose: "%22",
      color: "#FF5757",
      rate_icon: "arrowDown",
    },
  ];

  const users = [
    {
      sr: "#0001",
      name: "John Doe",
      username: "johndoe",
      gender: gender_female,
      age: "25 - 34",
      country: "Ankara",
      date: "15-06-.2023 - 16:37",
      role: "Journeyman",
      profile: profile,
    },
    {
      sr: "#0002",
      name: "John Doe",
      username: "johndoe",
      gender: gender_male,
      age: "18 - 24",
      country: "İstanbul",
      date: "15-06-.2023 - 16:37",
      profile: user1,
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      gender: gender_female,
      age: "35 - 44",
      country: "İzmir",
      date: "15-06-.2023 - 16:37",
      role: "Expert",
      profile: profile,
    },
    {
      sr: "#0004",
      name: "John Doe",
      username: "johndoe",
      gender: gender_male,
      age: "25 - 34",
      country: "Bursa",
      date: "15-06-.2023 - 16:37",
      role: "Apprentice",
      profile: profile,
    },
  ];

  const verifcationArray = [
    {
      name: "Verifivation Requests",
      img: bluetick,
      count: "127",
    },
  ];
  const deactivationArray = [
    {
      name: "Verifivation Requests",
      img: deactivation,
      count: "127",
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <NavBar />
        <div className="row g-0 row-height">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar
              setshowDetails={setshowDetails}
              showDetails={showDetails}
            />
          </div>
          {showDetails === "home" && (
            <div
              className="col-11"
              style={{ fontSize: "0.8rem", width: "95%" }}
            >
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
              <div className="row g-0 my-3 h-100">
                <div className="col-8">
                  <Home users={users} />
                </div>
                <div className="col-4">
                  <NewUsers array={dailySalesArray} />
                  <NewUsers array={WithdrawalRqstArray} />
                </div>
              </div>
            </div>
          )}
          {showDetails === "users" && (
            <div
              className="col-11"
              style={{ fontSize: "0.8rem", width: "95%" }}
            >
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
                  <div className="my-2 h-100">
                    <Home showDetails={showDetails} users={users} />
                  </div>
                </div>
                <div className="col-4 h-100">
                  <UserTimeLine />
                </div>
              </div>
            </div>
          )}
          {showDetails === "comments" && (
            <div
              className="col-11"
              style={{ fontSize: "0.8rem", width: "95%" }}
            >
              <div className="row g-0">
                <div className="col-8">
                  <div className="row g-0">
                    <div className="col-4">
                      <NewUsers
                        array={newCommentsArray}
                        commentsPage={"commentsPage"}
                      />
                    </div>
                    <div className="col-4">
                      <NewUsers array={winnertArray} />
                    </div>
                    <div className="col-4">
                      <NewUsers array={losetArray} />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <NewUsers totalArray={totalArray} />
                </div>
              </div>
              <div className="row g-0 my-3 h-100">
                <div className="col-8">
                  <CommentsManagementPage />
                </div>
                <div className="col-4">
                  <MostLiked />
                </div>
              </div>
            </div>
          )}
          {showDetails === "editor" && (
            <div
              className="col-11"
              style={{ fontSize: "0.8rem", width: "95%" }}
            >
              <div className="row g-0">
                <div className="col-8">
                  <div className="row g-0">
                    <div className="col-4">
                      <NewUsers array={newEditorsArray} />
                    </div>
                    <div className="col-8">
                      <LevelCount />
                    </div>
                  </div>
                  <div className="mt-3">
                    <EditorManagemenetPage />
                  </div>
                </div>
                <div className="col-4">
                  <Top10 />
                  <EditorAccountStatus />
                  <div className="row g-0 gap-3 mb-3">
                    <div className="col">
                      <Requests rqstArray={verifcationArray} />
                    </div>
                    <div className="col">
                      <Requests rqstArray={deactivationArray} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
