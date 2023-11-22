import React, { useContext, useState } from "react";
import selectedHomeIcon from "../../assets/Main Page Selected.svg";
import HomeIcon from "../../assets/Main Page.svg";
import EditorIcon from "../../assets/Editors Page (1).svg";
import SelectedEditorIcon from "../../assets/Menu Icon.svg";
import BowIcon from "../../assets/Comments Page.svg";
import SelectedBow from "../../assets/Menu Icon (1).svg";
import startFooter from "../../assets/Favorite Page (1).svg";
import selectedFav from "../../assets/Sub Header Favorite Selected.svg";
import logout from "../../assets/logout icon (1).svg";
import { UserId } from "../GetUser";
import axios from "axios";
import SignUpModal from "../SignUpModal/SignUpModal";
import CurrentTheme from "../../context/CurrentTheme";
import config from "../../config";
import AxiosInstance from "../AxiosInstance";
import { Cookies, useCookies } from "react-cookie";

export const Footer = (props) => {
  const [setCookie, removeCookie] = useCookies();
  const userId = UserId()
  const { homeApiData } = props;
  const [showSignup, setShowSignup] = useState(false);
  const { setShowModal } = useContext(CurrentTheme);
  const handleLogout = async (id) => {
    try{
      const response = await AxiosInstance.get(`${config.apiUrl}/clear-token/${id}/`);
      if (response.status == 200){
        const cookies = new Cookies();
        cookies.remove('access-token');
        cookies.remove('user-id');
        cookies.remove('username');
        cookies.remove('user-role');
        cookies.remove('user-active');

        localStorage.clear();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <nav
        className="navbar fixed-bottom py-0"
        style={{ backgroundColor: "#00659D" }}
      >
        <div className="container-fluid py-2">
          <div className="col text-center">
            <img
              onContextMenu={(e) => e.preventDefault()}
              onClick={() => {
                // console.log("click event fire", userId);

                localStorage.setItem("dashboardShow", false);
                localStorage.setItem("currentpage", "home");
                localStorage.removeItem("activeCommentId");
                props.setSelectContent("home");
                props.setDashboardSUser(false);
                userId && props.selectContent !== "home" && homeApiData(userId);
              }}
              src={props.selectContent === "home" ? selectedHomeIcon : HomeIcon}
              alt=""
              height={38}
              width={38}
            />
          </div>
          <div className="col text-center">
            <img
              onContextMenu={(e) => e.preventDefault()}
              onClick={() => {
                localStorage.setItem("dashboardShow", false);
                localStorage.setItem("priviouspage", props.selectContent);
                localStorage.setItem("currentpage", "editor");
                localStorage.removeItem("activeCommentId");
                props.setSelectContent("editor");
                props.setDashboardSUser(false);
              }}
              src={
                props.selectContent === "editor"
                  ? SelectedEditorIcon
                  : EditorIcon
              }
              alt=""
              height={38}
              width={38}
            />
          </div>
          <div className="col text-center">
            <img
              onContextMenu={(e) => e.preventDefault()}
              onClick={() => {
                localStorage.setItem("dashboardShow", false);
                localStorage.setItem("priviouspage", props.selectContent);
                localStorage.setItem("currentpage", "comments");
                localStorage.removeItem("activeCommentId");
                props.setSelectContent("comments");
                props.setDashboardSUser(false);
                userId &&
                  props.selectContent !== "comments" &&
                  homeApiData(userId);
              }}
              src={props.selectContent === "comments" ? SelectedBow : BowIcon}
              alt=""
              height={38}
              width={38}
            />
          </div>
          <div className="col text-center">
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={props.selectContent === "fav" ? selectedFav : startFooter}
              alt=""
              height={38}
              width={38}
              onClick={() => {
                if (!userId) {
                  setShowSignup(true);
                } else {
                  localStorage.setItem("dashboardShow", true);
                  localStorage.setItem("priviouspage", props.selectContent);
                  localStorage.setItem("currentpage", "fav");
                  localStorage.setItem("subcurrentpage", "fav");
                  localStorage.removeItem("activeCommentId");
                  props.setSelectContent("fav");
                  props.setDashboardSUser(true);
                  // window.location.reload()
                }
                setShowModal(4);
              }}
            />
          </div>
          {userId && (
            <div className="col text-center">
              <img
                onContextMenu={(e) => e.preventDefault()}
                src={logout}
                alt=""
                height={38}
                width={38}
                onClick={() => {
                  handleLogout(userId)
                  // removeCookie("access-token")
                  // removeCookie("user-id")
                  // localStorage.clear();
                  // window.location.reload();
                }}
              />
            </div>
          )}
        </div>
      </nav>
      <SignUpModal
        show={showSignup}
        onHide={() => setShowSignup(false)}
        // ShowModal={ShowModal}
      />
    </>
  );
};
