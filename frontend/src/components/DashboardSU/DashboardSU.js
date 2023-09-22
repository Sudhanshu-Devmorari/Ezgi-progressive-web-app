import React, { useContext, useEffect, useState } from "react";
import ProfileSU from "../ProfileSU/ProfileSU";
import CommentatorIcons from "../CommentatorIcons/CommentatorIcons";
import { SubscribersSelection } from "../SubscribersSelection/SubscribersSelection";
import MySubscribers from "../MySubscribers/MySubscribers";
import WalletSelection from "../WalletSelection/WalletSelection";
import Transactions from "../Transactions/Transactions";
import TransactionArray from "../TransactionArray/TransactionArray";
import CurrentTheme from "../../context/CurrentTheme";
import FavoriteSelection from "../FavoriteSelection/FavoriteSelection";
import FavEditor from "../FavEditor/FavEditor";
import FavComments from "../FavComments/FavComments";
import NotificationsAndSupportSelection from "../NotificationsAndSupportSelection/NotificationsAndSupportSelection";
import Notifications from "../Notifications/Notifications";
import Support from "../Support/Support";
import axios from "axios";
import { userId } from "../GetUser";
import config from "../../config";
import moment from "moment";

const DashboardSU = (props) => {
  const subcurrentpage = localStorage.getItem("subcurrentpage");
  const [content, setContent] = useState(subcurrentpage || "subscribers");
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [favSelection, setFavSelection] = useState("fav editor");

  useEffect(() => {
  console.log("props.activeCommentsshow:::::::::::::", props.activeCommentsshow)

    if (props.selectContent === "notifications") {
      setContent("notifications");
    } else if (props.selectContent === "fav") {
      subcurrentpage == "fav" && setContent("fav");
    } else if (
      subcurrentpage == "home" &&
      props.selectContent == "show-all-comments"
    ) {
      setContent("home");
    }
  }, [props.selectContent, subcurrentpage]);

  // Fav Editor & Comments API
  const [favEditorData, setFavEditorData] = useState([]);
  const [favCommentData, setFavCommentData] = useState([]);
  async function getFavData() {
    try {
      const res = await axios.get(
        `${config?.apiUrl}/fav-editor-comment/${userId}`
      );
      // console.log("=>>>", res.data);
      setFavEditorData(res.data.favEditors);
      setFavCommentData(res.data.favComments.sort((a, b) => moment(b.created).unix() - moment(a.created).unix()));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (content === "fav") {
      getFavData();
    }
  }, [content]);

  return (
    <>
      <ProfileSU
        getProfileData={props?.getProfileData}
        setSelectContent={props.setSelectContent}
        setDashboardSUser={props.setDashboardSUser}
        homeApiData={props.homeApiData}
        selectContent={props?.selectContent}
      />
      <CommentatorIcons
        setContent={setContent}
        content={content}
        user={"standard user"}
      />
      {content === "subscribers" && (
        <>
          <SubscribersSelection user={"standard user"} />
          <MySubscribers user={"standard user"} />
        </>
      )}
      {content === "wallet" && (
        <>
          <WalletSelection user={"standard user"} />
          <div
            className={`${
              currentTheme === "dark" ? "dark-mode" : "light-mode"
            } my-2 p-2`}
          >
            <TransactionArray user={"standard user"} />
          </div>
        </>
      )}
      {content === "fav" && (
        <>
          <FavoriteSelection
            setFavSelection={setFavSelection}
            favSelection={favSelection}
            verifyid={props.verifyid}
          />
          {favSelection === "fav editor" && (
            <FavEditor
              setDashboardSUser={props.setDashboardSUser}
              setFavCommentData={setFavCommentData}
              setFavEditorData={setFavEditorData}
              favEditorData={favEditorData}
              verifyid={props.verifyid}
              homeApiData={props.homeApiData}
              cmtReact={props.cmtReact}
              setActiveCommentsshow={props?.setActiveCommentsshow}
              setSelectContent={props?.setSelectContent}
              setMergedEditorResult={props.setMergedEditorResult}
              mergedEditorResult={props.mergedEditorResult}
            />
          )}

          {favSelection === "fav comments" && (
            <FavComments
              setDashboardSUser={props?.setDashboardSUser}
              setFavCommentData={setFavCommentData}
              setFavEditorData={setFavEditorData}
              favCommentData={favCommentData}
              verifyid={props?.verifyid}
              homeApiData={props?.homeApiData}
              cmtReact={props?.cmtReact}
              setActiveCommentsshow={props?.setActiveCommentsshow}
              setSelectContent={props?.setSelectContent}
              getFavData={getFavData}
              followingList={props?.followingList}
              followingid={props?.followingid}
              favSelection={favSelection}
              publicComments={props?.publicComments}
              setPublicComments={props?.setPublicComments}
              mergeArrays={props?.mergeArrays}
              setMergedEditorResult={props?.setMergedEditorResult}
              mergedEditorResult={props?.mergedEditorResult}
              setData={props?.setData}
              selectContent={props?.selectContent}
              setArrayMerge={props?.setArrayMerge}
              setCmtReact={props?.setCmtReact}
            />
          )}
        </>
      )}
      {(content === "notifications" || content === "support") && (
        <>
          <NotificationsAndSupportSelection content={content} />

          {content === "notifications" && <Notifications />}
          {content === "support" && <Support />}
        </>
      )}
    </>
  );
};

export default DashboardSU;
