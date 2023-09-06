import React, { useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar";
import "./MainPage.css";
import Banner from "../Banner/Banner";
import CurrentTheme from "../../context/CurrentTheme";
import ContentSection from "../ContentSection/ContentSection";
import SharedProfile from "../SharedProfile/SharedProfile";
import { AdvertisementBanner } from "../AdvertisementBanner/AdvertisementBanner";
import { Footer } from "../Footer/Footer";
import { EditorBanner } from "../EditorBanner/EditorBanner";
import { SelectContent } from "../SelectContent/SelectContent";
import HighlightMainPage from "../HighlightMainPage/HighlightMainPage";
import EditorsPage from "../EditorsPage/EditorsPage";
import CommentsPage from "../CommentsPage/CommentsPage";
import EditorProfileActiveComments from "../EditorProfileActiveComments/EditorProfileActiveComments";
import CommentatorsCommentsPage from "../CommentatorsCommentsPage/CommentatorsCommentsPage";
import DashboardSU from "../DashboardSU/DashboardSU";
import LandingPage from "../LandingPage/LandingPage";
import axios from "axios";
import config from "../../config";
import BecomeEditor from "../BecomeEditor/BecomeEditor";
import { userId } from "../GetUser";
import initialProfile from "../../assets/profile.png";
import Spinner from "react-bootstrap/Spinner";

const MainPage = () => {
  // CHANGE THEME
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  // Select Content
  const [selectContent, setSelectContent] = useState("home");
  const [selectPublicorForYou, setSelectPublicorForYou] = useState("for you");
  const [dashboardSUser, setDashboardSUser] = useState(false);
  // console.log("--------", selectContent,"=======", selectPublicorForYou)

  const themeMode = localStorage.getItem("CurrentTheme");

  const [data, setData] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followingid, setFollowingId] = useState([]);
  const [verifyid, setVerifyid] = useState([]);
  const [cmtReact, setCmtReact] = useState([]);
  const [mergedResult, setMergedResult] = useState([]);
  const [subscriptionResult, setSubscriptionResult] = useState([]);
  const [onlyPublicResult, setOnlyPublicResult] = useState([]);
  const [subscriptionComments, setsubscriptionComments] = useState([]);
  const [publicComments, setPublicComments] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [ads, setads] = useState([]);
  const [arrayMerge, setArrayMerge] = useState("Select");
  const [commentator, setCommentator] = useState([]);
  const publicCount = 3;
  const SubscriptionCount = 3;
  const highlightCount = 5;
  const [profileData, setProfileData] = useState(initialProfile);
  const [isLoading, setIsLoading] = useState(false);

  async function getProfileData() {
    setIsLoading(true);
    const res = await axios.get(`${config.apiUrl}/profile/${userId}`);
    // console.log(res.data,"===============?>>");
    setProfileData(res.data.profile_pic);
    setIsLoading(false);
  }
  useEffect(() => {
    if (userId) {
      getProfileData();
    }
  }, []);

  function homeApiData(user_id) {
    axios
      .get(`${config?.apiUrl}/retrieve-commentator/?id=${user_id}`)
      .then((res) => {
        setData(res?.data);
        setPublicComments(res?.data?.Public_Comments);
        setHighlights(res?.data?.highlights);
        setsubscriptionComments(res?.data?.Subscription_Comments);
        setads(res?.data?.ads);
        setVerifyid(res?.data?.verify_ids);
        setFollowingList(res?.data?.following_user);
        setFollowingId(res?.data?.following_user?.map((item) => item?.id));
        setCmtReact(res?.data?.comment_reactions);

        const commentatorData = res?.data?.Commentator?.map((item) => ({
          type: "commentator",
          value: item,
        }));
        setCommentator(commentatorData);
        mergeArrays()
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      }, []);
  }

  const mergeArrays = () => {
    if (subscriptionComments.length > 0) {

      let merged = [];
      let remainingPublic = [...publicComments];
      let remainingHighlights = [...highlights];
      let remainingSubscription = [...subscriptionComments];

      while (
        remainingPublic.length > 0 &&
        remainingHighlights.length > 0 &&
        remainingSubscription.length > 0
      ) {
        merged = [
          ...merged,
          ...remainingPublic
            .splice(0, publicCount)
            .map((comment) => ({ type: "comment", value: comment })),
          ...remainingHighlights
            .splice(0, highlightCount)
            .map((highlight) => ({ type: "highlight", value: highlight })),
          ...remainingSubscription
            .splice(0, SubscriptionCount)
            .map((remainingSubscription) => ({
              type: "comment",
              value: remainingSubscription,
            })),
        ];
      }

      if (remainingPublic.length > 0) {
        merged = [
          ...merged,
          ...remainingPublic.map((comment) => ({
            type: "comment",
            value: comment,
          })),
        ];
      }

      if (remainingHighlights.length > 0) {
        merged = [
          ...merged,
          ...remainingHighlights.map((highlight) => ({
            type: "highlight",
            value: highlight,
          })),
        ];
      }

      if (remainingSubscription.length > 0) {
        merged = [
          ...merged,
          ...remainingSubscription.map((Subscription) => ({
            type: "comment",
            value: Subscription,
          })),
        ];
      }
      setMergedResult(merged);
    }

    if (subscriptionComments.length === 0) {
      let merged = [];
      let remainingPublic = [...publicComments];
      let remainingHighlights = [...highlights];

      while (remainingHighlights.length > 0 && remainingPublic.length > 0) {
        merged = [
          ...remainingPublic
            .splice(0, SubscriptionCount)
            .map((remainingPublic) => ({
              type: "comment",
              value: remainingPublic,
            })),
          ...remainingHighlights
            .splice(0, highlightCount)
            .map((highlight) => ({ type: "highlight", value: highlight })),
        ];
      }
      if (remainingPublic.length > 0) {
        merged = [
          ...merged,
          ...remainingPublic.map((comment) => ({
            type: "comment",
            value: comment,
          })),
        ];
      }

      if (remainingHighlights.length > 0) {
        merged = [
          ...merged,
          ...remainingHighlights.map((highlight) => ({
            type: "highlight",
            value: highlight,
          })),
        ];
      }
      setMergedResult(merged);
    }
  };

  const subscriptionArrays = () => {
    let merged = [];
    let remainingSubscription = [...subscriptionComments];
    let remainingHighlights = [...highlights];

    while (remainingHighlights.length > 0 && remainingSubscription.length > 0) {
      merged = [
        ...remainingSubscription
          .splice(0, SubscriptionCount)
          .map((remainingSubscription) => ({
            type: "comment",
            value: remainingSubscription,
          })),
        ...remainingHighlights
          .splice(0, highlightCount)
          .map((highlight) => ({ type: "highlight", value: highlight })),
      ];
    }
    if (remainingSubscription.length > 0) {
      merged = [
        ...merged,
        ...remainingSubscription.map((Subscription) => ({
          type: "comment",
          value: Subscription,
        })),
      ];
    }

    if (remainingHighlights.length > 0) {
      merged = [
        ...merged,
        ...remainingHighlights.map((highlight) => ({
          type: "highlight",
          value: highlight,
        })),
      ];
    }

    setSubscriptionResult(merged);
  };

  const publicArrays = () => {
    let merged = [];
    let remainingPublic = [...publicComments];
    let remainingHighlights = [...highlights];

    while (remainingHighlights.length > 0 && remainingPublic.length > 0) {
      merged = [
        ...remainingPublic
          .splice(0, SubscriptionCount)
          .map((remainingPublic) => ({
            type: "comment",
            value: remainingPublic,
          })),
        ...remainingHighlights
          .splice(0, highlightCount)
          .map((highlight) => ({ type: "highlight", value: highlight })),
      ];
    }
    if (remainingPublic.length > 0) {
      merged = [
        ...merged,
        ...remainingPublic.map((comment) => ({
          type: "comment",
          value: comment,
        })),
      ];
    }

    if (remainingHighlights.length > 0) {
      merged = [
        ...merged,
        ...remainingHighlights.map((highlight) => ({
          type: "highlight",
          value: highlight,
        })),
      ];
    }

    setOnlyPublicResult(merged);
  };

  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("body-dark-mode");
      setCurrentTheme("dark");
    } else {
      document.body.classList.add("body-light-mode");
      setCurrentTheme("light");
    }
    const user_id = localStorage.getItem("user-id");
    homeApiData(user_id);
  }, [themeMode]);

  const user = localStorage.getItem("user-role");
  useEffect(() => {
    mergeArrays();
    subscriptionArrays();
    publicArrays();
  }, [publicComments, highlights, subscriptionComments, arrayMerge]);

  // const user = "c-";
  // const user = localStorage.getItem("userPhone");
  // console.log("-----user_id-----", user_id)

  const [activeCommentsshow, setActiveCommentsshow] = useState(null);

  const [contentData, setContentData] = useState([]);
  const [contentFilterData, setContentFilterData] = useState([]);
  const [commentsReactionsSports, setCommentsReactionsSports] = useState([]);
  // console.log(contentFilterData, "=>>>contentFilterData");

  useEffect(() => {
    handlesportData();
  }, [contentData]);

  // console.log("=>>contentData", contentData)

  const handlesportData = async () => {
    let merged = [];
    let remainingPublic = [...contentData];
    // console.log(remainingPublic,"=>>>remainingPublic")

    if (remainingPublic.length > 0) {
      merged = [
        ...merged,
        ...remainingPublic.map((comment) => ({
          type: "content",
          value: comment,
        })),
      ];
    }
    // console.log("merged:::::::::::::", merged);
    setContentFilterData(merged);
  };

  return (
    <>
      <div className="landing-page">
        <LandingPage />
      </div>
      <div
        className={`container-fluid mt-3 mobile-view ${
          selectContent === "become-editor" && "p-0"
        }`}
      >
        <div style={{ marginBottom: "66px" }}>
          <NavBar
            setDashboardSUser={setDashboardSUser}
            setSelectContent={setSelectContent}
            selectContent={selectContent}
            profileData={profileData}
          />

          {dashboardSUser ? (
            isLoading ? (
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
            ) : user !== "standard" ? (
              <CommentatorsCommentsPage
                setActiveCommentsshow={setActiveCommentsshow}
                setSelectContent={setSelectContent}
                setDashboardSUser={setDashboardSUser}
                selectContent={selectContent}
                getProfileData={getProfileData}
                verifyid={verifyid}
                homeApiData={homeApiData}
                followingList={followingList}
                followingid={followingid}
                cmtReact={cmtReact}
                setArrayMerge={setArrayMerge}
              />
            ) : (
              <DashboardSU
                setActiveCommentsshow={setActiveCommentsshow}
                setSelectContent={setSelectContent}
                setDashboardSUser={setDashboardSUser}
                selectContent={selectContent}
                getProfileData={getProfileData}
                verifyid={verifyid}
                homeApiData={homeApiData}
                followingList={followingList}
                followingid={followingid}
                cmtReact={cmtReact}
              />
            )
          ) : (
            <>
              {(selectContent === "home" ||
                selectContent === "editor" ||
                selectContent === "category-content" ||
                selectContent === "comments") && (
                <>
                  <Banner
                    data={
                      ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]
                    }
                  />
                  <EditorBanner
                    setSelectContent={setSelectContent}
                    setContentData={setContentData}
                    setCommentsReactionsSports={setCommentsReactionsSports}
                  />
                </>
              )}
              {selectContent === "home" &&
                selectPublicorForYou === "for you" && (
                  <>
                    <SelectContent
                      selectContent={selectPublicorForYou}
                      setSelectContent={setSelectPublicorForYou}
                    />

                    {mergedResult.map((val, index) => {
                      let lastType =
                        mergedResult[index == 0 ? 0 : index - 1]?.type;

                      if (val.type == "comment") {
                        return (
                          <>
                            {lastType == "highlight" ? (
                              <AdvertisementBanner
                                data={
                                  ads[
                                    (
                                      Math.random() * (ads.length - 1) +
                                      1
                                    ).toFixed(0)
                                  ]
                                }
                              />
                            ) : null}
                            <ContentSection
                              setActiveCommentsshow={setActiveCommentsshow}
                              homeApiData={homeApiData}
                              data={val}
                              setData={setData}
                              selectContent={selectPublicorForYou}
                              setSelectContent={setSelectContent}
                              followingList={followingList}
                              followingid={followingid}
                              verifyid={verifyid}
                              cmtReact={cmtReact}
                            />
                          </>
                        );
                      }
                      if (val.type == "highlight") {
                        return (
                          <>
                            {lastType == "comment" ? (
                              <HighlightMainPage
                                data={
                                  ads[
                                    (
                                      Math.random() * (ads.length - 1) +
                                      1
                                    ).toFixed(0)
                                  ]
                                }
                              />
                            ) : null}
                            <SharedProfile
                              setActiveCommentsshow={setActiveCommentsshow}
                              data={val}
                              setData={setData}
                              setSelectContent={setSelectContent}
                              verifyid={verifyid}
                            />
                          </>
                        );
                      }
                    })}
                  </>
                )}

              {selectContent === "home" &&
                selectPublicorForYou === "subscription" && (
                  <>
                    <SelectContent
                      selectContent={selectPublicorForYou}
                      setSelectContent={setSelectPublicorForYou}
                    />

                    {subscriptionResult.map((val, index) => {
                      let lastType =
                        subscriptionResult[index == 0 ? 0 : index - 1]?.type;

                      if (val.type == "comment") {
                        return (
                          <>
                            {lastType == "highlight" ? (
                              <AdvertisementBanner
                                data={
                                  ads[
                                    (
                                      Math.random() * (ads.length - 1) +
                                      1
                                    ).toFixed(0)
                                  ]
                                }
                              />
                            ) : null}
                            <ContentSection
                              setActiveCommentsshow={setActiveCommentsshow}
                              homeApiData={homeApiData}
                              data={val}
                              setData={setData}
                              selectContent={selectPublicorForYou}
                              setSelectContent={setSelectContent}
                              followingList={followingList}
                              followingid={followingid}
                              verifyid={verifyid}
                              cmtReact={cmtReact}
                            />
                          </>
                        );
                      }
                      if (val.type == "highlight") {
                        return (
                          <>
                            {lastType == "comment" ? (
                              <HighlightMainPage />
                            ) : null}
                            <SharedProfile
                              setActiveCommentsshow={setActiveCommentsshow}
                              data={val}
                              setData={setData}
                              setSelectContent={setSelectContent}
                              verifyid={verifyid}
                            />
                          </>
                        );
                      }
                    })}
                  </>
                )}

              {selectContent === "home" &&
                selectPublicorForYou === "only public" && (
                  <>
                    <SelectContent
                      selectContent={selectPublicorForYou}
                      setSelectContent={setSelectPublicorForYou}
                    />

                    {onlyPublicResult.map((val, index) => {
                      let lastType =
                        onlyPublicResult[index == 0 ? 0 : index - 1]?.type;

                      if (val.type == "comment") {
                        return (
                          <>
                            {lastType == "highlight" ? (
                              <AdvertisementBanner
                                data={
                                  ads[
                                    (
                                      Math.random() * (ads.length - 1) +
                                      1
                                    ).toFixed(0)
                                  ]
                                }
                              />
                            ) : null}
                            <ContentSection
                              setActiveCommentsshow={setActiveCommentsshow}
                              homeApiData={homeApiData}
                              data={val}
                              setData={setData}
                              selectContent={selectPublicorForYou}
                              setSelectContent={setSelectContent}
                              followingList={followingList}
                              followingid={followingid}
                              verifyid={verifyid}
                              cmtReact={cmtReact}
                            />
                          </>
                        );
                      }
                      if (val.type == "highlight") {
                        return (
                          <>
                            {lastType == "comment" ? (
                              <HighlightMainPage />
                            ) : null}
                            <SharedProfile
                              setActiveCommentsshow={setActiveCommentsshow}
                              data={val}
                              setData={setData}
                              setSelectContent={setSelectContent}
                              verifyid={verifyid}
                            />
                          </>
                        );
                      }
                    })}
                  </>
                )}
              {selectContent === "editor" && (
                <EditorsPage
                  setActiveCommentsshow={setActiveCommentsshow}
                  data={commentator}
                  ads={ads}
                  setData={setData}
                  setSelectContent={setSelectContent}
                  followingList={followingList}
                  followingid={followingid}
                  verifyid={verifyid}
                />
              )}
              {selectContent === "comments" && (
                <CommentsPage
                  setActiveCommentsshow={setActiveCommentsshow}
                  mergedResult={mergedResult}
                  onlyPublicResult={onlyPublicResult}
                  ads={ads}
                  homeApiData={homeApiData}
                  setData={setData}
                  selectContent="comments"
                  setSelectContent={setSelectContent}
                  followingList={followingList}
                  followingid={followingid}
                  verifyid={verifyid}
                  cmtReact={cmtReact}
                  setArrayMerge={setArrayMerge}
                />
              )}
              {selectContent === "show-all-comments" && (
                <EditorProfileActiveComments
                  activeCommentsshow={activeCommentsshow}
                  selectContent={selectContent}
                  setSelectContent={setSelectContent}
                  setDashboardSUser={setDashboardSUser}
                  verifyid={verifyid}
                  cmtReact={cmtReact}
                  homeApiData={homeApiData}
                  followingid={followingid}
                />
              )}
              {selectContent === "become-editor" && <BecomeEditor />}
              {selectContent === "category-content" && (
                <>
                  {contentFilterData?.map((res) => (
                    <ContentSection data={res} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <Footer
          setDashboardSUser={setDashboardSUser}
          setSelectContent={setSelectContent}
          selectContent={selectContent}
        />
      </div>
    </>
  );
};

export default MainPage;
