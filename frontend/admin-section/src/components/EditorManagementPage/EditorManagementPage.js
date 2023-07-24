import React from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import NewUsers from "../NewUsers/NewUsers";
import EditorManagemenet from "../EditorManagemenet/EditorManagemenet";
import bluetick from "../../assets/MDI - check-decagram.svg";
import deactivation from "../../assets/user-off.svg";
import editorIcon from "../../assets/Group 67.svg";
import Requests from "../Requests/Requests";
import Top10 from "../Top10/Top10";
import EditorAccountStatus from "../EditorAccountStatus/EditorAccountStatus";
import LevelCount from "../LevelCount/LevelCount";

const EditorManagementPage = () => {
  const newEditorsArray = [
    {
      label: "New Editors",
      icon: editorIcon,
      count: "127",
      per: "%22",
      color: "#58DEAA",
      rate_icon: "arrowUp",
      from: "editor"
    },
  ];
  const verifcationArray = [
    {
      name: "Verification Requests",
      img: bluetick,
      count: "127",
    },
  ];
  const deactivationArray = [
    {
      name: "Deactivation Requests",
      img: deactivation,
      count: "127",
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
                    <NewUsers array={newEditorsArray} />
                  </div>
                  <div className="col-8">
                    <LevelCount />
                  </div>
                </div>
                <div className="mt-3">
                  <EditorManagemenet />
                </div>
              </div>
              <div className="col-4">
                <Top10 />
                <EditorAccountStatus />
                <div className="row g-0 gap-2">
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
        </div>
      </div>
    </>
  );
};

export default EditorManagementPage;
