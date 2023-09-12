import React, { useEffect, useState } from "react";
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
import axios from "axios";
import config from "../../config";

const EditorManagementPage = () => {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [verifyUser, setverifyUsererifyUser] = useState([]);
  const [deactivateUser, setDeactivateUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function editorManagementApiData() {
    // console.log(data)
    axios
      // .get(`${config.apiUrl}/editor-management/`)
      .get(`${config?.apiUrl}/editor-management/`)
      .then((res) => {
        // console.log("%%%%%%%%%", res.data.top_ten);
        setData(res.data);
        setDeactivateUser(res.data.deactivat_user);
        setIsLoading(false);
        // setUsers(res?.data?.users_list)
        // setUserTimeLine(res?.data?.user_timeline)
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    editorManagementApiData();
  }, []);

  function approveOrRejectrqst(id, value) {
    axios
      .post(`${config.url}/verify-user/${id}`, { status: value })
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const newEditorsArray = [
    {
      label: "New Editors",
      icon: editorIcon,
      count: `${data?.editor_count}`,
      per: isLoading ? 0 : Math.round(data?.new_editor_percentage),
      color: "#58DEAA",
      rate_icon: "arrowUp",
      from: "editor",
    },
  ];
  const verifcationArray = [
    {
      name: "Verification Requests",
      img: bluetick,
      count: isLoading ? 0 : Math.round(data?.verify_request_count),
    },
  ];
  const deactivationArray = [
    {
      name: "Deactivation Requests",
      img: deactivation,
      count: `${data?.deactivation_request}`,
    },
  ];
  const [updateProfile, setupdateProfile] = useState(1);
  const [verifyRqst, setverifyRqst] = useState(false);
  const [deactiveRqst, setDeactiveRqst] = useState(false);
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
                    <NewUsers array={newEditorsArray} isLoading={isLoading} />
                  </div>
                  <div className="col-8">
                    <LevelCount data={data} isLoading={isLoading} />
                  </div>
                </div>
                <div className="">
                  <EditorManagemenet
                    approveOrRejectrqst={approveOrRejectrqst}
                    editorManagementApiData={editorManagementApiData}
                    users={data.editor_list}
                    deactivateUser={deactivateUser}
                    updateProfile={updateProfile}
                    setupdateProfile={setupdateProfile}
                    verifyRqst={verifyRqst}
                    deactiveRqst={deactiveRqst}
                    isLoading={isLoading}
                  />
                </div>
              </div>
              <div className="col-4">
                <Top10
                  setupdateProfile={setupdateProfile}
                  userData={data?.top_ten}
                  isLoading={isLoading}
                />
                <EditorAccountStatus
                  active_editor={data.active_editor}
                  pending_editor={data.pending_editor}
                  deactivate_editor={data.deactivate_editor}
                  isLoading={isLoading}
                />
                <div className="row g-0 gap-2">
                  <div className="col">
                    <Requests
                      rqstArray={verifcationArray}
                      setverifyRqst={setverifyRqst}
                      verifyRqst={verifyRqst}
                      deactiveRqst={deactiveRqst}
                      setDeactiveRqst={setDeactiveRqst}
                      isLoading={isLoading}
                    />
                  </div>
                  <div className="col">
                    <Requests
                      editorManagementApiData={editorManagementApiData}
                      rqstArray={deactivationArray}
                      setverifyRqst={setverifyRqst}
                      verifyRqst={verifyRqst}
                      deactiveRqst={deactiveRqst}
                      setDeactiveRqst={setDeactiveRqst}
                      isLoading={isLoading}
                    />
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
