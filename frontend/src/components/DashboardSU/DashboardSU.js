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

const DashboardSU = (props) => {
  const [content, setContent] = useState("subscribers");
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [favSelection, setFavSelection] = useState("fav editor");

  useEffect(() => {
    if (props.selectContent === "notifications") {
      setContent("notifications");
    } else if (props.selectContent === "fav") {
      setContent("fav");
    }
  }, [props.selectContent]);

  // Fav Editor & Comments API
  const [favEditorData, setFavEditorData] = useState([]);
  const [favCommentData, setFavCommentData] = useState([]);
  useEffect(() => {
    async function getFavData() {
      try {
        const res = await axios.get(
          `${config?.apiUrl}/fav-editor-comment/${userId}`
        );
        // console.log("=>>>", res.data);
        setFavEditorData(res.data.favEditors);
        setFavCommentData(res.data.favComments);
      } catch (error) {
        console.log(error);
      }
    }
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
          {favSelection === "fav editor" && <FavEditor favEditorData={favEditorData} verifyid={props.verifyid}/>}
          {favSelection === "fav comments" && <FavComments favCommentData={favCommentData} verifyid={props.verifyid}/>}
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
