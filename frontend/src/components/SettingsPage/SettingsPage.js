import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import editorIcon from "../../assets/Group 67.svg";
import salesIcon from "../../assets/basket-1.svg";
import SubIcon from "../../assets/wallet (1).svg";
import commentsIcon from "../../assets/target-arrow-1.svg";

const SettingsPage = () => {
  const [selecteSetting, setSelecteSetting] = useState("Editor Statistics");
  const array = [
    { img: editorIcon, name: "Editor Statistics" },
    { img: salesIcon, name: "Sales Statistics" },
    { img: SubIcon, name: "Subscribers Statistics" },
    { img: commentsIcon, name: "Comments Statistics" },
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
            <div className="row g-0 gap-2" style={{ height: "12vh" }}>
              {array.map((res, index) => (
                <div
                  className={`col dark-mode d-flex justify-content-center align-items-center ${
                    res.name === "Editor Statistics" && "ms-2"
                  }`}
                >
                  <img src={res.img} alt="" height={45} width={45} />
                  <span
                    style={{
                      color: selecteSetting === res.name && "#D2DB08",
                    }}
                    className="cursor"
                    onClick={() => setSelecteSetting(res.name)}
                  >
                    {res.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="row g-0 my-2 gap-2" style={{ height: "38vh" }}>
              <div className="col p-2 dark-mode ms-2">
                <div className="">Chart 1</div>
              </div>
              <div className="col p-2 dark-mode">
                <div className="m-2">Chart 3</div>
              </div>
            </div>
            <div className="row g-0 mt-2 gap-2" style={{ height: "38vh" }}>
              <div className="col p-2 dark-mode ms-2">
                <div className="">Chart 2</div>
              </div>
              <div className="col p-2 dark-mode">
                <div className="m-2">Chart 4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
