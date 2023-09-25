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
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

const CommentatorsCommentsPage = (props) => {
  const [SelectComment, setSelectComment] = useState("activeComments");
  const subcurrentpage = localStorage.getItem("subcurrentpage");
  const [content, setContent] = useState(subcurrentpage || "home");
  const [subscribersOrSubscriptions, setSubscribersOrSubscriptions] =
    useState("My subscribers");
  const [walletSelection, setWalletSelection] = useState("My transactions");
  const [favSelection, setFavSelection] = useState("fav editor");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [props.selectContent, subcurrentpage, props]);

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
      setFavCommentData(
        res.data.favComments.sort(
          (a, b) => moment(b.created).unix() - moment(a.created).unix()
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
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
      setIsLoading(false);
    }
    getProfileData();
  }, []);

  const [active, setActive] = useState([]);
  const [resolve, setResolve] = useState([]);

  const activeResolved = async (user_id) => {
    try {
      const res = await axios
        .get(`${config?.apiUrl}/active-resolved-comment/${user_id}`)
        .then((res) => {
          setActive(res.data?.active_comments);
          setResolve(res.data?.resolved_comments);
        })
        .catch((error) => {
          console.error("Error fetching data.", error);
        });
    } catch (error) {
      console.error("Error fetching data.", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "75vh" }}
          >
            <Spinner
              as="span"
              animation="border"
              size="md"
              role="status"
              aria-hidden="true"
            />
          </div>
        </>
      ) : (
        <>
          <ActiveComments
            from={props.activeCommentsshow !== null ? "editor" : "dashboard"}
            content={content}
            profile={"commentator"}
            setDashboardSUser={props.setDashboardSUser}
            setSelectContent={props.setSelectContent}
            profileData={profileData}
            getProfileData={props.getProfileData}
            activeResolved={activeResolved}
            selectContent={props.selectContent}
            profileLoading={isLoading}
            setActiveCommentsshow={props.setActiveCommentsshow}
            verifyid={props.verifyid}
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
                <CommentsContentSection
                  SelectComment={SelectComment}
                  dashboardSUser={props.dashboardSUser}
                  verifyid={props.verifyid}
                  homeApiData={props.homeApiData}
                  followingList={props.followingList}
                  followingid={props.followingid}
                  cmtReact={props.cmtReact}
                  setActiveCommentsshow={props.setActiveCommentsshow}
                  setData={props.setData}
                  selectContent={props.selectContent}
                  setSelectContent={props.setSelectContent}
                  setArrayMerge={props.setArrayMerge}
                  publicComments={props.publicComments}
                  setPublicComments={props.setPublicComments}
                  subscriptionComments={props.subscriptionComments}
                  setsubscriptionComments={props.setsubscriptionComments}
                  mergeArrays={props.mergeArrays}
                  setCmtReact={props.setCmtReact}
                  activeResolved={activeResolved}
                  setActive={setActive}
                  active={active}
                  setResolve={setResolve}
                  resolve={resolve}
                />
              )}
              {SelectComment === "statistics" && (
                <EditorProfileStatisticsSection
                  from={"dashboard"}
                  profileData={profileData}
                />
              )}
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
                verifyid={props.verifyid}
              />
              {favSelection === "fav editor" && (
                <FavEditor
                  setFavCommentData={setFavCommentData}
                  setFavEditorData={setFavEditorData}
                  setDashboardSUser={props?.setDashboardSUser}
                  favEditorData={favEditorData}
                  verifyid={props.verifyid}
                  setActiveCommentsshow={props?.setActiveCommentsshow}
                  setSelectContent={props?.setSelectContent}
                  homeApiData={props.homeApiData}
                  followingList={props.followingList}
                  followingid={props.followingid}
                  cmtReact={props.cmtReact}
                  setMergedEditorResult={props.setMergedEditorResult}
                  mergedEditorResult={props.mergedEditorResult}
                />
              )}
              {favSelection === "fav comments" && (
                <FavComments
                  getFavData={getFavData}
                  setFavCommentData={setFavCommentData}
                  setFavEditorData={setFavEditorData}
                  setDashboardSUser={props?.setDashboardSUser}
                  favCommentData={favCommentData}
                  verifyid={props.verifyid}
                  setActiveCommentsshow={props?.setActiveCommentsshow}
                  setSelectContent={props?.setSelectContent}
                  homeApiData={props.homeApiData}
                  followingList={props.followingList}
                  followingid={props.followingid}
                  cmtReact={props.cmtReact}
                  SelectComment={SelectComment}
                  setData={props.setData}
                  selectContent={props.selectContent}
                  setArrayMerge={props.setArrayMerge}
                  publicComments={props.publicComments}
                  setPublicComments={props.setPublicComments}
                  mergeArrays={props.mergeArrays}
                  setCmtReact={props.setCmtReact}
                  favSelection={favSelection}
                  setMergedEditorResult={props?.setMergedEditorResult}
                  mergedEditorResult={props?.mergedEditorResult}
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
      )}
    </>
  );
};

export default CommentatorsCommentsPage;
