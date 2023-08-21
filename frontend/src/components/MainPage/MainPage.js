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

const MainPage = () => {
  // CHANGE THEME
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  // Select Content
  const [selectContent, setSelectContent] = useState("home");
  const [selectPublicorForYou, setSelectPublicorForYou] = useState("for you");
  const [dashboardSUser, setDashboardSUser] = useState(false);
  console.log("--------", selectContent,"=======", selectPublicorForYou)

  const themeMode = localStorage.getItem("CurrentTheme");

  const [data, setData] = useState([]);
  const [mergedResult, setMergedResult] = useState([]);
  const [subscriptionResult, setSubscriptionResult] = useState([]);
  const [onlyPublicResult, setOnlyPublicResult] = useState([]);
  const [subscriptionComments, setsubscriptionComments] = useState([]);
  const [publicComments, setPublicComments] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [ads, setads] = useState([]);
  const [commentator, setCommentator] = useState([]);
  const publicCount = 3;
  const SubscriptionCount = 3;
  const highlightCount = 5;


  const homeApiData = async (user_id) => {
    const res = await axios
      .get(`http://127.0.0.1:8000/retrieve-commentator/?id=${user_id}`)
      .then((res) => {
        setData(res.data);
        setPublicComments(res.data.Public_Comments);
        setHighlights(res.data.highlights);
        setsubscriptionComments(res.data.Subscription_Comments);
        setads(res.data.ads);

        const commentatorData = res.data.Commentator.map((item) => ({
          type: "commentator",
          value: item,
        }));
        setCommentator(commentatorData);
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      }, []);
  };

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
  }, [publicComments, highlights, subscriptionComments]);

  // const user = "c-";
  // const user = localStorage.getItem("userPhone");
  // console.log("-----user_id-----", user_id)
  

  return (
    <>
      <div className="landing-page">
        <LandingPage />
      </div>
      <div className="container-fluid mt-3 mobile-view">
        <div
          style={{ marginBottom: "66px" }}
        >
          <NavBar
            setDashboardSUser={setDashboardSUser}
            setSelectContent={setSelectContent}
          />

          {dashboardSUser ? (
            user !== "standard" ? (
              <CommentatorsCommentsPage
                setSelectContent={setSelectContent}
                setDashboardSUser={setDashboardSUser}
                selectContent={selectContent}
              />
            ) : (
              <DashboardSU
                setSelectContent={setSelectContent}
                setDashboardSUser={setDashboardSUser}
                selectContent={selectContent}
              />
            )
          ) : (
            <>
              {(selectContent === "home" ||
                selectContent === "editor" ||
                selectContent === "comments") && (
                <>
                  <Banner
                    data={
                      ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]
                    }
                  />
                  <EditorBanner />
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
                              data={val}
                              setData={setData}
                              selectContent={selectPublicorForYou}
                              setSelectContent={setSelectContent}
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
                              data={val}
                              setData={setData}
                              setSelectContent={setSelectContent}
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
                              data={val}
                              setData={setData}
                              selectContent={selectPublicorForYou}
                              setSelectContent={setSelectContent}
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
                              data={val}
                              setData={setData}
                              setSelectContent={setSelectContent}
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
                              data={val}
                              setData={setData}
                              selectContent={selectPublicorForYou}
                              setSelectContent={setSelectContent}
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
                              data={val}
                              setData={setData}
                              setSelectContent={setSelectContent}
                            />
                          </>
                        );
                      }
                    })}
                  </>
                )}
              {selectContent === "editor" && (
                <EditorsPage
                  data={commentator}
                  ads={ads}
                  setData={setData}
                  setSelectContent={setSelectContent}
                />
              )}
              {selectContent === "comments" && (
                <CommentsPage
                  mergedResult={mergedResult}
                  onlyPublicResult={onlyPublicResult}
                  ads={ads}
                  setData={setData}
                  selectContent = 'comments'
                  setSelectContent={setSelectContent}
                />
              )}
              {selectContent === "show-all-comments" && (
                <EditorProfileActiveComments
                  selectContent={selectContent}
                  setSelectContent={setSelectContent}
                  setDashboardSUser={setDashboardSUser}
                />
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
