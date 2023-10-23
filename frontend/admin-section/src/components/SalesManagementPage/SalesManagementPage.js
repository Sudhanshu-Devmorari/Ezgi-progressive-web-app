import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import subscriptionIcon from "../../assets/Group 67.svg";
import PlanIcon from "../../assets/Group 72.svg";
import highlightIcon from "../../assets/rocket.svg";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
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
import config from "../../config";
import moment from "moment";
import { useCookies } from "react-cookie";

const SalesManagementPage = (props) => {
  const [salesData, setSalesData] = useState({});
  const [records, setRecords] = useState([]);
  const [recordsDisplay, setRecordsDisplay] = useState(records);
  const [cookies, setCookie, removeCookie] = useCookies();
  // console.log("salesData", salesData)
  const salesArray = [
    {
      icon: PlanIcon,
      name: "Plan Sales",
      count: salesData?.plan_sale_count,
      per: Math.round(salesData?.new_sales_percentage),
    },
    {
      icon: subscriptionIcon,
      name: "Subscription Sales",
      count: salesData?.subscription_count,
      per: Math.round(salesData?.new_subscriptions_percentage),
    },
    {
      icon: highlightIcon,
      name: "Highlight Sales",
      count: salesData?.highlight_count,
      // per: 22,
      per: Math.round(salesData?.new_highlights_percentage),
    },
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
    { icon: adsIcon, name: "Ads Revenues", value: "0" },
    {
      icon: perIcon,
      name: "Commission Revenues",
      value: salesData?.commission_earnings?.toFixed(2),
    },
  ];

  const filteredData = (e) => {
    const val = e.target.value;
    // console.log("val", val);
    // console.log("records", records);
    const filteredArray = records.filter(
      (obj) =>
        obj?.user?.name?.toLowerCase().match(val?.toLowerCase()) ||
        obj?.commentator_user?.name?.toLowerCase().match(val?.toLowerCase()) ||
        obj?.standard_user?.name?.toLowerCase().match(val?.toLowerCase())
    );
    // console.log(filteredArray,"filteredArray")
    setRecordsDisplay(filteredArray);
  };
  const updateRecordsDisplay = (allData) => {
    const planSaleJSX = allData?.plan_sale.map((data) => {
      return {
        ...data,
        Comp: (props) => (
          <MainDiv>
            <>
              <div className="col-3 d-flex align-items-center">
                <span>{`# ${props.i.toString().padStart(4, "0")}`}</span>
                <span className="px-2">
                  <img
                    className="user-profile"
                    src={config.apiUrl + data?.user?.profile_pic}
                    alt=""
                    height={45}
                    width={45}
                  />
                </span>
                <span>{data?.user?.name}</span>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="">
                  <button
                    className="px-2"
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: "4px",
                      border:
                        // (res.planD === "Subscription" && "1px solid #58DEAA") ||
                        // (res.planD === "Expert" && "1px solid #FF9100") ||
                        (data?.user?.commentator_level === "apprentice" ? "1px solid #4DD5FF" : "1px solid #FF9100"), 
                        // (res.planD === "Highlight" && "1px solid #D2DB08"),
                      color:
                        // (res.planD === "Subscription" && "#58DEAA") ||
                        // (res.planD === "Expert" && "#FF9100") ||
                        (data?.user?.commentator_level === "apprentice" ? "#4DD5FF" : "#FF9100") 
                        // (res.planD === "Highlight" && "#D2DB08"),
                    }}
                  >
                    {data?.user?.commentator_level}
                  </button>
                </div>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                {/* {res.plan === "johndoe" ? (
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
                ) : ( */}
                  <>
                    {/* {res.plan && ( */}
                      <button
                        className="px-2 text-center"
                        style={{
                          // backgroundColor:"#4DD5FF",
                          backgroundColor : (data?.membership_status === "renew" && "#FF9100") ||
                            (data?.membership_status === "new" && "#4DD5FF"),
                          borderRadius: "4px",
                          // border:"#4DD5FF",
                          border: (data?.membership_status === "renew" && "1px solid #FF9100") ||
                            (data?.membership_status === "new" && "#4DD5FF"),
                          color: "#0D2A53",
                          width: "4.5rem",
                        }}
                      >
                        {/* {res.plan} */}
                        {data?.membership_status?.charAt(0).toUpperCase() + data?.membership_status?.slice(1)}
                      </button>
                    {/* )} */}
                  </>
                {/* )} */}
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                {/* <div className="">{res.month}</div> */}
              </div>
              <div className="col-1 d-flex align-items-center justify-content-center">
                <div className="">{data?.money}</div>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-end">
                <div className="">{moment(data?.created).format("DD-MM.YYYY - HH:mm")}</div>
              </div>
            </>
          </MainDiv>
        ),
      };
    });

    const subscriptionJSX = allData?.subscription.map((data) => {
      return {
        ...data,
        Comp: (props) => (
          <MainDiv>
            <>
              <div className="col-3 d-flex align-items-center">
                <span>{`# ${props.i.toString().padStart(4, "0")}`}</span>
                <span className="px-2">
                  <img
                    className="user-profile"
                    src={config.apiUrl + data.standard_user.profile_pic}
                    alt=""
                    height={45}
                    width={45}
                  />
                </span>
                <span>{data.standard_user.name}</span>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="">
                  <button
                    className="px-2"
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: "4px",
                      border: "1px solid #58DEAA",
                      // (res.planD === "Expert" &&
                      //   "1px solid #FF9100") ||
                      // (res.planD === "Apprentice" &&
                      //   "1px solid #4DD5FF") ||
                      // (res.planD === "Highlight" &&
                      //   "1px solid #D2DB08"),
                      color: "#58DEAA",
                      // (res.planD === "Expert" && "#FF9100") ||
                      // (res.planD === "Apprentice" && "#4DD5FF") ||
                      // (res.planD === "Highlight" && "#D2DB08"),
                    }}
                  >
                    Subscription
                  </button>
                </div>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                {data.commentator_user ? (
                  <>
                    <img
                      className="user-profile"
                      src={config.apiUrl + data.commentator_user.profile_pic}
                      alt=""
                      srcset=""
                      height={32}
                      width={32}
                    />
                    <span className="ps-2">{data.commentator_user.name}</span>
                  </>
                ) : (
                  <>
                    {data.commentator_user && (
                      <button
                        className="px-2 text-center"
                        style={{
                          // backgroundColor:
                          //   (res.plan === "Renew" && "#FF9100") ||
                          //   (res.plan === "New" && "#4DD5FF"),
                          // borderRadius: "4px",
                          // border:
                          //   (res.plan === "Renew" &&
                          //     "1px solid #FF9100") ||
                          //   (res.plan === "New" && "#4DD5FF"),
                          color: "#0D2A53",
                          width: "4.5rem",
                        }}
                      >
                        ABC
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="">{data.duration}</div>
              </div>
              <div className="col-1 d-flex align-items-center justify-content-center">
                <div className="">{data.money}</div>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-end">
                <div className="">
                  {moment(data.created).format("DD-MM.YYYY - HH:mm")}
                </div>
              </div>
            </>
          </MainDiv>
        ),
      };
    });

    const highlightJSX = allData?.highlight.map((data) => {
      return {
        ...data,
        Comp: (props) => (
          <MainDiv>
            <>
              <div className="col-3 d-flex align-items-center">
                <span>{`# ${props.i.toString().padStart(4, "0")}`}</span>
                <span className="px-2">
                  <img
                    className="user-profile"
                    src={config.apiUrl + data.user.profile_pic}
                    alt=""
                    height={45}
                    width={45}
                  />
                </span>
                <span>{data.user.name}</span>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="">
                  <button
                    className="px-2"
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: "4px",
                      border: "1px solid #D2DB08",
                      // (res.planD === "Expert" &&
                      //   "1px solid #FF9100") ||
                      // (res.planD === "Apprentice" &&
                      //   "1px solid #4DD5FF") ||
                      // (res.planD === "Highlight" &&
                      //   "1px solid #D2DB08"),
                      color: "#D2DB08",
                      // (res.planD === "Expert" && "#FF9100") ||
                      // (res.planD === "Apprentice" && "#4DD5FF") ||
                      // (res.planD === "Highlight" && "#D2DB08"),
                    }}
                  >
                    Highlight
                  </button>
                </div>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                {/* {data.user ? (
            <>
              <img
                className="user-profile"
                src={config.apiUrl + data.commentator_user.profile_pic}
                alt=""
                srcset=""
                height={32}
                width={32}
              />
              <span className="ps-2">{data.commentator_user.name}</span>
            </>
          ) : (
            <>
              {data.commentator_user && (
                <button
                  className="px-2 text-center"
                  style={{
                    // backgroundColor:
                    //   (res.plan === "Renew" && "#FF9100") ||
                    //   (res.plan === "New" && "#4DD5FF"),
                    // borderRadius: "4px",
                    // border:
                    //   (res.plan === "Renew" &&
                    //     "1px solid #FF9100") ||
                    //   (res.plan === "New" && "#4DD5FF"),
                    color: "#0D2A53",
                    width: "4.5rem",
                  }}
                >
                  ABC
                </button>
              )}
            </>
          )} */}
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="">{data.duration}</div>
              </div>
              <div className="col-1 d-flex align-items-center justify-content-center">
                <div className="">{data.money}</div>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-end">
                <div className="">
                  {moment(data.created).format("DD-MM.YYYY - HH:mm")}
                </div>
              </div>
            </>
          </MainDiv>
        ),
      };
    });
    const data = [...subscriptionJSX, ...highlightJSX, ...planSaleJSX];
    data.sort((a, b) => moment(b.created).unix() - moment(a.created).unix());
    setRecords(data);
    setRecordsDisplay(data);
  };
  const displayTickets = recordsDisplay;
  // Sales management API
  async function getSalesData() {
    try {
      const adminId = localStorage.getItem("admin-user-id");
      const res = await axios.get(
        `${config?.apiUrl}/sales-management?admin=${adminId}`
      );
      if (res.status == 204) {
        localStorage.clear();
        removeCookie("admin-user-id");
        window.location.reload();
      }
      updateRecordsDisplay(res?.data);
      setSalesData(res?.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSalesData();
  }, []);

  return (
    <>
      <div className="conatainer-fluid m-2">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar setWithdrawableData={props.setWithdrawableData} setCommentData={props.setCommentData} refreshComments={getSalesData} />
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
                          {res?.count} <small>₺</small>
                        </span>
                        <div className="w-100">
                          <span className="rate-font">
                            {res.per >= 0 ? (
                              <span
                                className="rate-font"
                                style={{ color: "#58DEAA" }}
                              >
                                %{res.per}
                                <HiArrowSmUp
                                  className="arrow"
                                  style={{ marginBottom: "0.1rem" }}
                                />
                              </span>
                            ) : (
                              <span
                                className="rate-font"
                                style={{ color: "#FF5757" }}
                              >
                                %{res.per}
                                <HiArrowSmDown
                                  className="arrow"
                                  style={{ marginBottom: "0.1rem" }}
                                />
                              </span>
                            )}
                            last day
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dark-mode p-2 m-2 mb-0 home-height">
                  <SalesManagementFilter
                    setRecordsDisplay={setRecordsDisplay}
                    filteredData={filteredData}
                    updateRecordsDisplay={updateRecordsDisplay}
                  />

                  {recordsDisplay.map((x, index) => (
                    <x.Comp i={recordsDisplay.length - index} />
                  ))}
                  
                  {/* {records.map((res, index) => (
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
                  ))} */}
                </div>
              </div>
              <div className="col-4">
                <div className="row g-0 gap-2" style={{ height: "25vh" }}>
                  <div className="col dark-mode d-flex align-items-center justify-content-center flex-column pt-3 p-2">
                    <span className="heading" style={{ color: "#58DEAA" }}>
                      Daily Total
                    </span>
                    <span className="number">
                      {salesData.daily_total} <small>₺</small>
                    </span>
                    <div className="w-100 pt-3">
                      <span className="rate-font">
                        <span
                          className="rate-font"
                          style={{ color: "#58DEAA" }}
                        >
                          %{salesData?.daily_total_persentage}
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
                      {salesData.all_time_total} <small>₺</small>
                    </span>
                  </div>
                </div>
                <div className="row g-0 gap-2 my-2" style={{ height: "30vh" }}>
                  {adsArray.map((res, index) => (
                    <div className="col dark-mode d-flex align-items-center justify-content-center flex-column">
                      <img src={res.icon} alt="" className="icon" />
                      <span className="heading">{res.name}</span>
                      <span className="number">
                        {res.value} <small>₺</small>
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
                    {salesData.net_revenue?.toFixed(2)} <small>₺</small>
                  </span>
                  <div className="w-100 pt-5">
                    <span className="rate-font">
                      <span className="rate-font" style={{ color: "#58DEAA" }}>
                        %{salesData?.net_revenue_persentage}
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
      {/* {console.log("*******",displayTickets )} */}
      <Export exportList={displayTickets} exportData={"Sales"} />
    </>
  );
};

export default SalesManagementPage;
