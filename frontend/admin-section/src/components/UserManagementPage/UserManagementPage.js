import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import NewUsers from "../NewUsers/NewUsers";
import Home from "../Home/Home";
import UserTimeLine from "../UserTimeLine/UserTimeLine";
import newUser from "../../assets/user-plus.svg";
import editorIcon from "../../assets/Group 67.svg";
import subscriberIcon from "../../assets/Group 72.svg";
import gender_female from "../../assets/gender-female.png";
import gender_male from "../../assets/gender-male.png";
import profile from "../../assets/profile.png";
import user1 from "../../assets/user1.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import config from "../../config";

const UserManagementPage = (props) => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [userTimeLine, setUserTimeLine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();
  const admin_id = localStorage.getItem("admin-user-id")

  async function userManagementApiData() {
    // console.log("test");
    const res = await axios
      .get(`${config?.apiUrl}/user-management/?admin=${admin_id}`)
      .then((res) => {
        if (res.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          window.location.reload();
        }
        // console.log(res.data);
        setData(res?.data);
        setUsers(res?.data?.users_list);
        setUserTimeLine(res?.data?.user_timeline);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
        setIsLoading(false);
      }, []);
  }

  useEffect(() => {
    userManagementApiData();
  }, []);

  const newUsersArray = [
    {
      label: "Total Users",
      icon: newUser,
      count: `${data?.new_user}`,
      per: isLoading ? 0 : Math.round(data?.new_user_percentage),
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const newEditorsArray = [
    {
      label: "Total Editors",
      icon: editorIcon,
      count: `${data?.new_editor}`,
      per: isLoading ? 0 : Math.round(data?.new_editor_percentage),
      color: "#58DEAA",
      rate_icon: "arrowUp",
    },
  ];
  const newSubscribersArray = [
    {
      label: "Total Subscribers",
      icon: subscriberIcon,
      count: `${data?.new_subscriber}`,
      per: isLoading ? 0 : Math.round(data?.new_subscriptions_percentage),
      color: "#FF5757",
      rate_icon: "arrowdown",
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
  //     date: "15-06-2023 - 16:37",
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
  //     date: "15-06-2023 - 16:37",
  //     profile: user1,
  //   },
  //   {
  //     sr: "#0003",
  //     name: "John Doe",
  //     username: "johndoe",
  //     gender: gender_female,
  //     age: "35 - 44",
  //     country: "İzmir",
  //     date: "15-06-2023 - 16:37",
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
  //     date: "15-06-2023 - 16:37",
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
            <SideBar setWithdrawableData={props.setWithdrawableData} setCommentData={props.setCommentData} refreshComments={userManagementApiData}/>
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0">
              <div className="col-8">
                <div className="row g-0">
                  <div className="col-4">
                    <NewUsers array={newUsersArray} isLoading={isLoading} />
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
                <div className="">
                  <Home
                    users={users}
                    setUsers={setUsers}
                    adminHomeApiData={userManagementApiData}
                    isLoading={isLoading}
                  />
                </div>
              </div>
              <div className="col-4 h-100">
                <UserTimeLine
                  transactionHistory={"timeline"}
                  notification={userTimeLine}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagementPage;
