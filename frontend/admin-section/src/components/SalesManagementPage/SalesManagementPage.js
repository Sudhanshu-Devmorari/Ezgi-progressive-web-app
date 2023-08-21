import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import subscriptionIcon from "../../assets/Group 67.svg";
import PlanIcon from "../../assets/Group 72.svg";
import highlightIcon from "../../assets/rocket.svg";
import { HiArrowSmUp } from "react-icons/hi";
import SalesManagementFilter from "../SalesManagementFilter/SalesManagementFilter";
import { MainDiv } from "../CommonBgRow";
import user1 from "../../assets/user3.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user1.png";
import user4 from "../../assets/user6.png";
import adsIcon from "../../assets/badge-ad.svg";
import perIcon from "../../assets/per.svg";
import "./SalesManagementPage.css";
import axios from "axios";
import Export from "../Export/Export";

const SalesManagementPage = () => {
  const salesArray = [
    { icon: PlanIcon, name: "Plan Sales" },
    { icon: subscriptionIcon, name: "Subscription Sales" },
    { icon: highlightIcon, name: "Highlight Sales" },
  ];
  const users = [
    {
      profile: user1,
      planD: "Subscription",
      plan: "johndoe",
      month: "3 Months",
    },
    {
      profile: user2,
      planD: "Expert",
      plan: "Renew",
      month: "",
    },
    {
      profile: user3,
      planD: "Apprentice",
      plan: "New",
      month: "",
    },
    {
      profile: user4,
      planD: "Highlight",
      plan: "",
      month: "2 Weeks",
    },
  ];
  const adsArray = [
    { icon: adsIcon, name: "Ads Revenues" },
    { icon: perIcon, name: "Ads Revenues" },
  ];

  // Sales management API
  useEffect(() => {
    async function getSalesData() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/sales-management");
        // console.log("res====>>>>", res?.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSalesData();
  }, []);

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
                  {salesArray.map((res, index) => (
                    <div className="col p-0">
                      <div
                        className={`dark-mode p-2 ${
                          res.name === "Plan Sales" ? "mx-2" : "me-2"
                        } d-flex flex-column align-items-center justify-content-center`}
                        style={{ height: "25vh" }}
                      >
                        <img className="icon" src={res.icon} alt="" />
                        <span className="heading">{res.name}</span>
                        <span className="number">
                          12.860 <small>₺</small>
                        </span>
                        <div className="w-100">
                          <span className="rate-font">
                            <span
                              className="rate-font"
                              style={{ color: "#58DEAA" }}
                            >
                              %22
                              <HiArrowSmUp
                                className="arrow"
                                style={{ marginBottom: "0.1rem" }}
                              />
                            </span>
                            last day
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dark-mode p-2 m-2 mb-0 home-height">
                  <SalesManagementFilter />
                  {users.map((res, index) => (
                    <MainDiv>
                      <>
                        <div className="col-3 d-flex align-items-center">
                          <span>#0001</span>
                          <span className="px-2">
                            <img
                              className="user-profile"
                              src={res.profile}
                              alt=""
                              height={45}
                              width={45}
                            />
                          </span>
                          <span>johndoe</span>
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-center">
                          <div className="">
                            <button
                              className="px-2"
                              style={{
                                backgroundColor: "transparent",
                                borderRadius: "4px",
                                border:
                                  (res.planD === "Subscription" &&
                                    "1px solid #58DEAA") ||
                                  (res.planD === "Expert" &&
                                    "1px solid #FF9100") ||
                                  (res.planD === "Apprentice" &&
                                    "1px solid #4DD5FF") ||
                                  (res.planD === "Highlight" &&
                                    "1px solid #D2DB08"),
                                color:
                                  (res.planD === "Subscription" && "#58DEAA") ||
                                  (res.planD === "Expert" && "#FF9100") ||
                                  (res.planD === "Apprentice" && "#4DD5FF") ||
                                  (res.planD === "Highlight" && "#D2DB08"),
                              }}
                            >
                              {res.planD}
                            </button>
                          </div>
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-center">
                          {res.plan === "johndoe" ? (
                            <>
                              <img
                                className="user-profile"
                                src={res.profile}
                                alt=""
                                srcset=""
                                height={32}
                                width={32}
                              />
                              <span className="ps-2">{res.plan}</span>
                            </>
                          ) : (
                            <>
                              {res.plan && (
                                <button
                                  className="px-2 text-center"
                                  style={{
                                    backgroundColor:
                                      (res.plan === "Renew" && "#FF9100") ||
                                      (res.plan === "New" && "#4DD5FF"),
                                    borderRadius: "4px",
                                    border:
                                      (res.plan === "Renew" &&
                                        "1px solid #FF9100") ||
                                      (res.plan === "New" && "#4DD5FF"),
                                    color: "#0D2A53",
                                    width: "4.5rem",
                                  }}
                                >
                                  {res.plan}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-center">
                          <div className="">{res.month}</div>
                        </div>
                        <div className="col-1 d-flex align-items-center justify-content-center">
                          <div className="">229.90</div>
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-end">
                          <div className="">15-06-2023 - 16:37</div>
                        </div>
                      </>
                    </MainDiv>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <div className="row g-0 gap-2" style={{ height: "25vh" }}>
                  <div className="col dark-mode d-flex align-items-center justify-content-center flex-column pt-3 p-2">
                    <span className="heading" style={{ color: "#58DEAA" }}>
                      Daily Total
                    </span>
                    <span className="number">
                      12.700 <small>₺</small>
                    </span>
                    <div className="w-100 pt-3">
                      <span className="rate-font">
                        <span
                          className="rate-font"
                          style={{ color: "#58DEAA" }}
                        >
                          %22
                          <HiArrowSmUp
                            className="arrow"
                            style={{ marginBottom: "0.1rem" }}
                          />
                        </span>
                        last day
                      </span>
                    </div>
                  </div>
                  <div className="col d-flex align-items-center justify-content-center dark-mode flex-column ">
                    <span className="heading" style={{ color: "#D2DB08" }}>
                      All Time Total
                    </span>
                    <span className="number">
                      12.860 <small>₺</small>
                    </span>
                  </div>
                </div>
                <div className="row g-0 gap-2 my-2" style={{ height: "30vh" }}>
                  {adsArray.map((res, index) => (
                    <div className="col dark-mode d-flex align-items-center justify-content-center flex-column">
                      <img src={res.icon} alt="" className="icon" />
                      <span className="heading">{res.name}</span>
                      <span className="number">
                        12.645 <small>₺</small>
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="dark-mode d-flex align-items-center justify-content-center flex-column block-height p-2"
                  style={{ height: "33vh" }}
                >
                  <span className="heading">Net Revenue</span>
                  <span className="number">
                    12.645 <small>₺</small>
                  </span>
                  <div className="w-100 pt-5">
                    <span className="rate-font">
                      <span className="rate-font" style={{ color: "#58DEAA" }}>
                        %22
                        <HiArrowSmUp
                          className="arrow"
                          style={{ marginBottom: "0.1rem" }}
                        />
                      </span>
                      last day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Export />
    </>
  );
};

export default SalesManagementPage;
