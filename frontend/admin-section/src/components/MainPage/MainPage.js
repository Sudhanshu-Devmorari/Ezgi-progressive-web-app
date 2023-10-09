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
import { useCookies } from "react-cookie";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();

  const adminHomeApiData = async (user_id) => {
    const id = localStorage.getItem("admin-user-id")
    const res = await axios
      .get(`${config?.apiUrl}/home/?id=${id}`)
      .then((res) => {
        // console.log(res.status, "=====>>>>res.data");
        if (res.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          window.location.reload();
        }
        setData(res?.data);
        setUsers(res?.data?.users_list);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
        setIsLoading(false);
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
      per: isLoading ? 0 : Math.round(data?.new_user_percentage),
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const newEditorsArray = [
    {
      label: "New Editors",
      icon: editorIcon,
      count: `${data?.new_editor}`,
      per: isLoading ? 0 : Math.round(data?.new_editor_percentage),
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const newSubscribersArray = [
    {
      label: "New Subscribers",
      icon: subscriberIcon,
      count: `${data?.new_subscriber}`,
      per: isLoading ? 0 : Math.round(data?.new_subscriptions_percentage),
      color: "#FF5757",
      rate_icon: "arrowdown",
    },
  ];
  const newCommentsArray = [
    {
      label: "New Comments",
      icon: commentsIcon,
      count: `${data?.new_comment}`,
      per: isLoading ? 0 : Math.round(data?.comments_percentage),
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];

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
                    <NewUsers array={newUsersArray} isLoading={isLoading} />
                    {/* <NewUsers total_user={data?.new_user} /> */}
                  </div>
                  <div className="col-4">
                    <NewUsers array={newEditorsArray} isLoading={isLoading} />
                  </div>
                  <div className="col-4">
                    <NewUsers
                      array={newSubscribersArray}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <NewUsers array={newCommentsArray} isLoading={isLoading} />
              </div>
            </div>
            <div className="row g-0">
              <div className="col-8">
                <Home
                  users={users}
                  adminHomeApiData={adminHomeApiData}
                  isLoading={isLoading}
                />
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
