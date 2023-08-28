import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import "./MainPage.css";
import NewUsers from "../NewUsers/NewUsers";
import newUser from "../../assets/user-plus.svg";
import editorIcon from "../../assets/Group 67.svg";
import subscriberIcon from "../../assets/Group 72.svg";
import commentsIcon from "../../assets/target-arrow-1.svg";
import gender_female from "../../assets/gender-female.png";
import gender_male from "../../assets/gender-male.png";
import profile from "../../assets/profile.png";
import user1 from "../../assets/user1.png";
import Home from "../Home/Home";
import DailySalesArray from "../DailySalesArray/DailySalesArray";
import NewWithdrawalRqst from "../NewWithdrawalRqst/NewWithdrawalRqst";
import axios from "axios";
import config from "../../config";


const MainPage = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const adminHomeApiData = async (user_id) => {
    const res = await axios
      .get(`${config?.apiUrl}/home/`)
      .then((res) => {
        setData(res?.data);
        setUsers(res?.data?.users_list)
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      }, []);
  };

  useEffect(() => {
    adminHomeApiData();
  }, []);

  const newUsersArray = [
    {
      label: "New Users",
      icon: newUser,
      count: `${data?.new_user}`,
      per: "%22",
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const newEditorsArray = [
    {
      label: "New Editors",
      icon: editorIcon,
      count: `${data?.new_editor}`,
      per: "%22",
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const newSubscribersArray = [
    {
      label: "New Subscribers",
      icon: subscriberIcon,
      count: `${data?.new_subscriber}`,
      per: "%22",
      color: "#FF5757",
      rate_icon: "arrowdown",
    },
  ];
  const newCommentsArray = [
    {
      label: "New Comments",
      icon: commentsIcon,
      count: `${data?.new_comment}`,
      per: "%22",
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];

  // const users = [
  //   {
  //     sr: "#0001",
  //     name: "John Doe",
  //     username: "johndoe",
  //     gender: gender_female,
  //     age: "25 - 34",
  //     country: "Ankara",
  //     date: "15-06-.2023 - 16:37",
  //     role: "Journeyman",
  //     profile: profile,
  //   },
  //   {
  //     sr: "#0002",
  //     name: "John Doe",
  //     username: "johndoe",
  //     gender: gender_male,
  //     age: "18 - 24",
  //     country: "İstanbul",
  //     date: "15-06-.2023 - 16:37",
  //     profile: user1,
  //   },
  //   {
  //     sr: "#0003",
  //     name: "John Doe",
  //     username: "johndoe",
  //     gender: gender_female,
  //     age: "35 - 44",
  //     country: "İzmir",
  //     date: "15-06-.2023 - 16:37",
  //     role: "Expert",
  //     profile: profile,
  //   },
  //   {
  //     sr: "#0004",
  //     name: "John Doe",
  //     username: "johndoe",
  //     gender: gender_male,
  //     age: "25 - 34",
  //     country: "Bursa",
  //     date: "15-06-.2023 - 16:37",
  //     role: "Apprentice",
  //     profile: profile,
  //   },
  // ];

  return (
    <>
      <div className="conatainer-fluid m-2">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar />
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0">
              <div className="col-8">
                <div className="row g-0">
                  <div className="col-4">
                    <NewUsers array={newUsersArray}/>
                    {/* <NewUsers total_user={data?.new_user} /> */}
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
            <div className="row g-0">
              <div className="col-8">
                <Home users={users} />
              </div>
              <div className="col-4">
                <DailySalesArray />
                <NewWithdrawalRqst />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
