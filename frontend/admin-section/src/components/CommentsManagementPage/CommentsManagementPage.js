import React from "react";
import { GoSearch } from "react-icons/go";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import user4 from "../../assets/user4.png";
import user5 from "../../assets/user5.png";
import UKflag from "../../assets/Flag_of_the_United_Kingdom.png";
import flag from "../../assets/Roundel_flag_of_Turkey.svg.png";
import circle_check from "../../assets/circle-check-1.png";
import circle_x from "../../assets/circle-x.png";
import clock_exclamation from "../../assets/clock-exclamation.png";
import eye from "../../assets/eye.png";
import crown from "../../assets/MDI - crown-circle-outline.png";
import './CommentsManagementPage.css'

const CommentsManagementPage = () => {
  const users = [
    {
      sr: "#0001",
      name: "John Doe",
      username: "johndoe",
      flag: flag,
      league: "Süper Lig",
      date: "15-06-.2023 - 16:37",
      role: "Antalyaspor - Başakşehir",
      profile: user1,
      status :circle_check
    },
    {
      sr: "#0002",
      name: "John Doe",
      username: "johndoe",
      flag: UKflag,
      league: "Championship",
      date: "15-06-.2023 - 16:37",
      role: "Sheffield United - West Bromwich",
      profile: user2,
      status :clock_exclamation
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      flag: flag,
      league: "Süper Lig",
      date: "15-06-.2023 - 16:37",
      role: "Antalyaspor - Başakşehir",
      profile: user3,
      status :circle_x
    },
    {
      sr: "#0004",
      name: "John Doe",
      username: "johndoe",
      flag: UKflag,
      league: "Championship",
      date: "15-06-.2023 - 16:37",
      role: "Sheffield United - West Bromwich",
      profile: user4,
      status :circle_check
    },
  ];
  return (
    <>
      <div className="dark-mode p-2 me-3 h-100">
        <div className="d-flex p-2" style={{ fontSize: "1.2rem" }}>
          <div className="p-2 flex-grow-1">
            <div class="input-group w-50">
              <span class="input-group-text search-icon-dark" id="basic-addon1">
                <GoSearch style={{ color: "#FFFFFF" }} />
              </span>
              <input type="text" className="input-field-dark" />
            </div>
          </div>
          <div className="p-2">
            <button
              className="px-5"
              style={{
                backgroundColor: "transparent",
                borderRadius: "3px",
                border: "1px solid #E6E6E6",
                color: "#E6E6E6",
              }}
            >
              All
            </button>
          </div>
          <div className="p-2">
            <button
              className="px-3"
              style={{
                backgroundColor: "transparent",
                borderRadius: "3px",
                border: "1px solid #E6E6E6",
                color: "#E6E6E6",
              }}
            >
              Filter
            </button>
          </div>
        </div>
        {users.map((res, index) => (
          <div
            className="row g-0 px-2 py-1 mb-2 font-comments"
            style={{ backgroundColor: "#0B2447", fontSize: "1rem" }}
          >
            <div className="col">
              <div className="position-relative">
                <span className="pe-1">{res.sr}</span>
                <img className="profile-icon" src={res.profile} alt="" height={42} width={42} />
                <span className="ps-1">{res.name}</span>
              </div>
              {/* <div className="position-absolute"> */}
                {/* <img src={crown} alt="" height={18} width={18} style={{position: "absolute", left:"4rem", top:"5rem"}}/> */}
              {/* </div> */}
            </div>
            <div className="d-flex gap-2 align-items-center col">
              <img className="flag-icon" src={res.flag} alt="" height={33} width={33}/>
              <span>{res.league}</span>
            </div>
            <div className="d-flex align-items-center col">{res.role}</div>
            <div className="d-flex align-items-center gap-2 col justify-content-end eye-icon-gap">
              <span>{res.date}</span>
              <img className="success-icon" src={res.status} alt="" height={34} width={34} />
              <img className="eye-icon" src={eye} alt="" height={36} width={36} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentsManagementPage;
