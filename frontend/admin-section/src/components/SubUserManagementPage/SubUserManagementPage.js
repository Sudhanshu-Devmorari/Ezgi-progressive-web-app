import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import bell from "../../assets/bell (2).svg";
import transactionIcon from "../../assets/webhook.svg";
import SubUsers from "../../assets/users30.png";
import { HiArrowSmUp } from "react-icons/hi";
import { MainDiv } from "../CommonBgRow";
import SubUserManagementFilter from "../SubUserManagementFilter/SubUserManagementFilter";
import user1 from "../../assets/user3.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user1.png";
import user4 from "../../assets/user6.png";
import edit from "../../assets/user-edit.svg";
import trash from "../../assets/trash.svg";
import SubUsesTimeLine from "../SubUsesTimeLine/SubUsesTimeLine";
import axios from "axios";

const SubUserManagementPage = () => {
  const users = [
    { profile: user1, btn: "Support Supervisor" },
    { profile: user2, btn: "Financial Supervisor" },
    { profile: user3, btn: "IT Supervisor" },
    { profile: user4, btn: "Ads Manager" },
    { profile: user1, btn: "Director Manager" },
  ];

  // Get sub-users
  const [notificationCount, setNotificationCount] = useState(0);
  const [subuserCount, setSubuserCount] = useState(0);
  const [subuserList, setSubuserList] = useState([]);
  const [userTimeline, setUserTimeline] = useState([]);
  
  useEffect(() => {
    async function getSubUsers() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/subuser-management/"
        );
        console.log(res.data, "==========>>>res sub users");
        const data = res.data;
        setNotificationCount(data.notification_count);
        setSubuserCount(data.subuser_count);
        setSubuserList(data.subuser_list);
        setUserTimeline(data.user_timeline);
      } catch (error) {
        console.log(error);
      }
    }
    getSubUsers();
  }, []);

  const [editProfileModal, seteditProfileModal] = useState(1);
  const [editUserId, setEditUserId] = useState('');

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
                  <div
                    className="col p-0 mx-2 dark-mode d-flex flex-column align-items-center justify-content-center"
                    style={{ height: "25vh" }}
                  >
                    <img src={SubUsers} alt="" height={45} width={45} />
                    <span style={{ fontSize: "1.2rem" }}>Sub Users</span>
                    <span style={{ fontSize: "1.6rem" }}>{subuserCount}</span>
                  </div>
                  <div className="col p-0">
                    <div
                      className="dark-mode p-2 mx-2"
                      style={{ height: "25vh" }}
                    >
                      <div className="mt-2 d-flex flex-column p-2 align-items-center justify-content-center">
                        <img
                          src={transactionIcon}
                          alt=""
                          height={45}
                          width={45}
                        />
                        <span
                          className="name-fonts"
                          style={{ fontSize: "1.2rem" }}
                        >
                          Transactions
                        </span>
                        <span style={{ fontSize: "1.6rem" }}>127</span>
                      </div>
                      <div className="d-flex align-items-end mt-3 p-2">
                        <span className="" style={{ fontSize: "1rem" }}>
                          <span
                            className=""
                            style={{ color: "#58DEAA", fontSize: "1.2rem" }}
                          >
                            %22
                            <HiArrowSmUp
                              fontSize={"1.4rem"}
                              style={{ marginBottom: "0.1rem" }}
                            />
                          </span>
                          last day
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col p-0 mx-2 dark-mode d-flex flex-column align-items-center justify-content-center"
                    style={{ height: "25vh" }}
                  >
                    <img src={bell} alt="" height={45} width={45} />
                    <span style={{ fontSize: "1.2rem" }}>Notifications</span>
                    <span style={{ fontSize: "1.6rem" }}>
                      {notificationCount}
                    </span>
                  </div>
                </div>
                <div className="dark-mode p-2 m-2 mb-0 home-height">
                  <SubUserManagementFilter editProfileModal={editProfileModal} editUserId={editUserId}/>
                  {subuserList.map((res, index) => (
                    <MainDiv key={index}>
                      <>
                        <div className="col d-flex align-items-center">
                          <span>#0001</span>
                          <span className="px-2">
                            <img
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                              src={`http://127.0.0.1:8000${res.profile_pic}`}
                              alt=""
                              height={50}
                              width={50}
                            />
                          </span>
                          <span>{res.name}</span>
                        </div>
                        <div className="col d-flex align-items-center justify-content-start">
                          <button
                            className="px-2"
                            style={{
                              backgroundColor: "transparent",
                              borderRadius: "4px",
                              border:
                                (res.department === "Support Supervisor" &&
                                  "1px solid #FF9100") ||
                                (res.department === "Financial Supervisor" &&
                                  "1px solid #58DEAA") ||
                                (res.department === "IT Supervisor" &&
                                  "1px solid #4DD5FF") ||
                                (res.department === "Ads Manager" &&
                                  "1px solid #FFEE7D") ||
                                (res.department === "Director Manager" &&
                                  "1px solid #FF33E4"),
                              color:
                                (res.department === "Support Supervisor" &&
                                  "#FF9100") ||
                                (res.department === "Financial Supervisor" &&
                                  "#58DEAA") ||
                                (res.department === "IT Supervisor" &&
                                  "#4DD5FF") ||
                                (res.department === "Ads Manager" &&
                                  "#FFEE7D") ||
                                (res.department === "Director Manager" &&
                                  "#FF33E4"),
                            }}
                          >
                            {res.department}
                          </button>
                        </div>
                        <div className="col d-flex align-items-center justify-content-end">
                          <div className="">15-06-2023 - 16:37</div>
                        </div>
                        <div className="col-1 d-flex align-items-center justify-content-end gap-1">
                          <img
                            onClick={()=>{seteditProfileModal(2);setEditUserId(res.id)}}
                            className="cursor"
                            data-bs-toggle="modal"
                            data-bs-target="#create-sub-user"
                            src={edit}
                            alt=""
                            height={25}
                            width={25}
                          />
                          <img src={trash} alt="" height={25} width={25} />
                        </div>
                      </>
                    </MainDiv>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <SubUsesTimeLine />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubUserManagementPage;
