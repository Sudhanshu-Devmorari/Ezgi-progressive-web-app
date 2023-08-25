import React, { useEffect, useState } from "react";
import ActiveComments from "../ActiveComments/ActiveComments";
import CommentatorIcons from "../CommentatorIcons/CommentatorIcons";
import SelectComments from "../SelectComments/SelectComments";
import CommentsContentSection from "../CommentsContentSection/CommentsContentSection";
import EditorProfileStatisticsSection from "../EditorProfileStatisticsSection/EditorProfileStatisticsSection";
import { SubscribersSelection } from "../SubscribersSelection/SubscribersSelection";
import MySubscribers from "../MySubscribers/MySubscribers";
import WalletSelection from "../WalletSelection/WalletSelection";
import Transactions from "../Transactions/Transactions";
import PendingBalance from "../PendingBalance/PendingBalance";
import AccountStatus from "../AccountStatus/AccountStatus";
import FavoriteSelection from "../FavoriteSelection/FavoriteSelection";
import FavEditor from "../FavEditor/FavEditor";
import FavComments from "../FavComments/FavComments";
import NotificationsAndSupportSelection from "../NotificationsAndSupportSelection/NotificationsAndSupportSelection";
import Notifications from "../Notifications/Notifications";
import Support from "../Support/Support";
import axios from "axios";
import { userId } from "../GetUser";
import config from "../../config";

const CommentatorsCommentsPage = (props) => {
  const [SelectComment, setSelectComment] = useState("activeComments");
  const [content, setContent] = useState("home");
  const [subscribersOrSubscriptions, setSubscribersOrSubscriptions] =
    useState("My subscribers");
  const [walletSelection, setWalletSelection] = useState("My transactions");
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

  // PROFILE API
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    async function getProfileData() {
      const res = await axios.get(`${config?.apiUrl}/profile/${userId}`);
      // console.log(res.data,"========>>>");
      setProfileData(res.data);
    }
    getProfileData();
  }, []);

  return (
    <>
      <ActiveComments
        content={content}
        profile={"commentator"}
        setDashboardSUser={props.setDashboardSUser}
        setSelectContent={props.setSelectContent}
        profileData={profileData}
      />
      <CommentatorIcons setContent={setContent} content={content} />

      {content === "home" && (
        <>
          <SelectComments
            setSelectComment={setSelectComment}
            SelectComment={SelectComment}
          />
          {(SelectComment === "activeComments" ||
            SelectComment === "resolvedComments") && (
            <CommentsContentSection SelectComment={SelectComment} />
          )}
          {SelectComment === "statistics" && <EditorProfileStatisticsSection />}
        </>
      )}

      {content === "subscribers" && (
        <>
          <SubscribersSelection
            setSubscribersOrSubscriptions={setSubscribersOrSubscriptions}
            subscribersOrSubscriptions={subscribersOrSubscriptions}
            user={"commentator"}
          />
          <MySubscribers
            subscribersOrSubscriptions={subscribersOrSubscriptions}
            user={"commentator"}
          />
        </>
      )}
      {content === "wallet" && (
        <>
          <WalletSelection
            setWalletSelection={setWalletSelection}
            walletSelection={walletSelection}
            user={"commentator"}
          />
          {walletSelection === "My transactions" && <Transactions />}
          {walletSelection === "pending balance" && <PendingBalance />}
          {walletSelection === "account status" && <AccountStatus />}
        </>
      )}
      {content === "fav" && (
        <>
          <FavoriteSelection
            setFavSelection={setFavSelection}
            favSelection={favSelection}
          />
          {favSelection === "fav editor" && (
            <FavEditor favEditorData={favEditorData} />
          )}
          {favSelection === "fav comments" && (
            <FavComments favCommentData={favCommentData} />
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

export default CommentatorsCommentsPage;
