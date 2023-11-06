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
import moment from "moment";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import { ref, transcationQueryAPI } from "../GetRefNo";
import { subcriptionEntry } from "../SubscribeModal/SubscribeModal";
import Swal from "sweetalert2";

const MainPage = () => {
  // CHANGE THEME
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  // Select Content
  const [selectContent, setSelectContent] = useState(
    localStorage.getItem("currentpage") || "home"
  );
  const userId = localStorage.getItem("user-id");
  const [selectPublicorForYou, setSelectPublicorForYou] = useState("for you");
  const dashboardShow = localStorage.getItem("dashboardShow");
  const [dashboardSUser, setDashboardSUser] = useState(
    dashboardShow == "true" ? true : false || false
  );

  const [categoryCounts, setCategoryCounts] = useState({
    futbol: 0,
    basketbol: 0,
  });

  const themeMode = localStorage.getItem("CurrentTheme");
  const [publicSelected, setPublicSelected] = useState(false);

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
  // const [membershipDate, setMembershipDate] = useState("");
  const [commentator, setCommentator] = useState([]);
  const publicCount = 5;
  const SubscriptionCount = 5;
  const highlightCount = 5;
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user_id = localStorage.getItem("user-id");

  // check the successful payment request
  const ref_no = ref();
  useEffect(() => {
    async function testPurchase() {
      try {
        const result = await transcationQueryAPI(ref_no);

        if (result?.STATUS === "SUCCESS" && result?.RETURN_CODE === "0") {
          // console.log("payment succesffull", result);
          const category = result?.PRODUCTS[0]?.PRODUCT_CATEGORY;
          const ID = result?.PRODUCTS[1]?.PRODUCT_ID;

          // window.location.reload()
          // const reloadCount = sessionStorage.getItem("reloadCount");
          // if (reloadCount < 2) {
          //   sessionStorage.setItem("reloadCount", String(reloadCount + 1));
          //   window.location.reload();
          // } else {
          //   sessionStorage.removeItem("reloadCount");
          // }
          if (category === "subscription" && ID == userId) {
            const commentator_user_id = result?.PRODUCTS[0]?.PRODUCT_ID;
            const duration = result?.PRODUCTS[0]?.PRODUCT_NAME;
            const amount = result?.PRODUCTS[0]?.PRODUCT_AMOUNT;
            const commentator_username =
              result?.PRODUCTS[0]?.PRODUCT_DESCRIPTION;

            subcriptionEntry(
              amount,
              duration,
              commentator_user_id,
              commentator_username
            );
          }
          // const url = new URL(window.location.href);
          // const refExists = url.searchParams.has("ref");
          // if (refExists) {
          //   window.location.replace(window.location.origin + "/");
          // }
        }
        if (result?.STATUS === "ERROR") {
          window.location.replace(window.location.origin + "/");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (ref_no) {
      testPurchase();
    }
  }, [ref_no]);


  async function getNotifications() {
    try {
      const response = await axios.get(`${config.apiUrl}/notification/${userId}`);
      const data = response.data.flash_notification;
      console.log(data);
  
      if (data.length > 0) {
        for (const item of data) {
          async function showSwal() {
            const confirmation = await Swal.fire({
              text: `${item.context}.`,
              // icon: "success",
              backdrop: false,
              customClass: currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
            });
  
            if (confirmation.value === true) {
              try {
                await axios.post(`${config.apiUrl}/notification/${userId}`, {
                  "update-status": [item.id],
                });
              } catch (error) {
                console.log(error);
              }
            }
          }
  
          // Call the async function
          await showSwal();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getProfileData() {
    const res = await axios.get(`${config.apiUrl}/profile/${userId}`);
    // console.log(res.data,"===============?>>");
    setProfileData(res.data);
    // setMembershipDate(res.data.membership_date);
    setIsLoading(false);
    localStorage.setItem("user-active", res.data.is_active);
    if(res.status == 200){
      getNotifications()
    }
  }
  useEffect(() => {
    if (userId || selectContent == "show-all-comments") {
      getProfileData();
    }
  }, [userId, selectContent == "show-all-comments"]);

  const [leftCornerAds, setLeftCornerAds] = useState([]);
  const [rightCornerAds, setRightCornerAds] = useState([]);
  const [category, setCategory] = useState("Futbol");

  // const [highlightUserId, setHighlightUserId] = useState([]);

  function homeApiData(user_id) {
    axios
      // .get(`${config?.apiUrl}/retrieve-dashboard/?id=${user_id}`)
      .get(
        `${config?.apiUrl}/retrieve-dashboard/?id=${user_id}&category=${category}`
      )
      // .get(`${config?.apiUrl}/retrieve-commentator/?id=${user_id}`)
      .then((res) => {
        // setPublicComments(
        //   res?.data?.Public_Comments.sort(
        //     (a, b) => moment(b.created).unix() - moment(a.created).unix()
        //   )
        // );
        setPublicComments(res?.data?.Public_Comments);

        setHighlights(res?.data?.highlights);
        // console.log("res?.data?.highlights", res?.data?.highlights);
        // const highlightsData = res?.data?.highlights;
        // const highlightIds = highlightsData.map((highlight) => highlight?.user?.id);
        // setHighlightUserId(highlightIds)
        // console.log("highlightUserId", highlightUserId);

        // console.log("res?.data?.Public_Comments", res?.data?.Public_Comments);
        // console.log("res?.data?.Subscription_Comments", res?.data?.Subscription_Comments);

        // setsubscriptionComments(
        //   res?.data?.Subscription_Comments.sort(
        //     (a, b) => moment(b.created).unix() - moment(a.created).unix()
        //   )
        // );
        setsubscriptionComments(res?.data?.Subscription_Comments);
        setads(res?.data?.ads);
        const ads = res?.data?.ads;
        const leftCornerAdsFilter = ads.filter(
          (res) => res.ads_space == "Main Page Top Left"
        );
        const rightCornerAdsFilter = ads.filter(
          (res) => res.ads_space == "Main Page Top Right"
        );
        setLeftCornerAds(leftCornerAdsFilter);
        setRightCornerAds(rightCornerAdsFilter);

        setVerifyid(res?.data?.verify_ids);
        setFollowingList(res?.data?.following_user);
        setFollowingId(res?.data?.following_user?.map((item) => item?.id));
        setCmtReact(res?.data?.comment_reactions);

        // const commentatorData = res?.data?.Commentator?.map((item) => ({
        //   type: "commentator",
        //   value: item,
        // }));
        // setCommentator(commentatorData);
        mergeArrays();
      })
      .catch((error) => {
        console.error("Error fetching data.", error);
      });
  }
  // console.log("highlightUserId", highlightUserId);

  function getUnique(arr, index) {
    const staticData = arr
      .map((e) => e[index]?.id)
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    setMergedResult(staticData);
    // setFilterData(staticData);
  }

  const mergeArrays = () => {
    if (subscriptionComments.length > 0) {
      let merged = [];
      let remainingPublic = [...publicComments];
      let remainingHighlights = [...highlights];

      while (remainingPublic.length > 0 && remainingHighlights.length > 0) {
        merged = [
          ...merged,
          ...remainingPublic
            .splice(0, publicCount)
            .map((comment) => ({ type: "comment", value: comment })),
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
      getUnique(merged, "value");
      setMergedResult(merged);
      // sortMergeList()
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
      // console.log("merged: ", merged);
      getUnique(merged, "value");
      setMergedResult(merged);
      // sortMergeList()
    }
  };

  const subscriptionArrays = () => {
    let merged = [];
    let remainingSubscription = [...subscriptionComments];
    let remainingHighlights = [...highlights];
    let followingData = [...followingList];
    let remainingPublic = [...publicComments];

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

    const followingDataIndex = followingData.map((res) => res.id);

    const subScriptionIndex = remainingSubscription.map((res) => res.id);

    const filterData = remainingPublic.filter(
      (res) =>
        followingDataIndex.includes(res?.commentator_user?.id) &&
        !subScriptionIndex.includes(res.id)
    );

    if (filterData.length > 0) {
      merged = [
        ...merged,
        ...filterData.map((highlight) => ({
          type: "comment",
          value: highlight,
        })),
      ];
    }
    // console.log(merged,"=======>>merged")
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

  const handleOnlyPublicData = async (isPublic) => {
    let merged = [];

    if (!isPublic) {
      const filterData = publicComments.filter(
        (res) => res.public_content === !isPublic
      );
      if (filterData.length > 0) {
        const remainingLength =
          (filterData.length / 2).toFixed(0) - filterData.length;
        merged = [
          ...filterData
            .slice(0, (filterData.length / 2).toFixed(0))
            .map((comment) => ({
              type: "comment",
              value: comment,
            })),
          ...highlights.map((highlight) => ({
            type: "highlight",
            value: highlight,
          })),
          ...filterData.slice(remainingLength).map((comment) => ({
            type: "comment",
            value: comment,
          })),
        ];
      }

      setOnlyPublicResult(merged);
    } else {
      mergeArrays();
    }
  };

  useEffect(() => {
    selectPublicorForYou == "only public" &&
      handleOnlyPublicData(publicSelected);
  }, [selectPublicorForYou, publicSelected]);

  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("body-dark-mode");
      setCurrentTheme("dark");
    } else {
      document.body.classList.add("body-light-mode");
      setCurrentTheme("light");
    }
    homeApiData(user_id);
  }, [themeMode, category]);

  const [mergedEditorResult, setMergedEditorResult] = useState([]);

  const mergeEditorArrays = () => {
    if (highlights.length > 0) {
      let merged = [];
      let remainingPublic = [];
      let remainingHighlights = [...highlights];

      if (remainingPublic.length > 0) {
        merged = [
          ...merged,
          ...remainingPublic.map((comment) => ({
            value: comment,
          })),
        ];
      }

      if (remainingHighlights.length > 0) {
        merged = [
          ...merged,
          ...remainingHighlights.map((highlight) => ({
            value: highlight,
          })),
        ];
      }

      setMergedEditorResult(merged);
    }
  };

  const user = localStorage.getItem("user-role");
  useEffect(() => {
    mergeArrays();
    subscriptionArrays();
    publicArrays();
    mergeEditorArrays();
  }, [publicComments, highlights, subscriptionComments, arrayMerge]);

  const activeCommentId = localStorage.getItem("activeCommentId");

  const [activeCommentsshow, setActiveCommentsshow] = useState(
    activeCommentId || null
  );

  useEffect(() => {
    setActiveCommentsshow(activeCommentId);
  }, [activeCommentId, activeCommentsshow]);

  const [contentData, setContentData] = useState([]);
  const [contentFilterData, setContentFilterData] = useState([]);
  const [commentsReactionsSports, setCommentsReactionsSports] = useState([]);

  useEffect(() => {
    handlesportData();
  }, [contentData]);

  const handlesportData = async () => {
    let merged = [];
    let remainingPublic = [...contentData];

    if (remainingPublic.length > 0) {
      merged = [
        ...merged,
        ...remainingPublic.map((comment) => ({
          type: "content",
          value: comment,
        })),
      ];
    }
    setContentFilterData(merged);
  };

  const [onlyPubliccategory, setOnlyPubliccategory] = useState(false);
  const [filteredcategoryData, setFilteredcategoryData] = useState([]);

  const filterCategoryData = (value) => {
    const filteredArray = contentFilterData.filter(
      (obj) =>
        obj?.value?.commentator_user?.username
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||
        obj?.value?.match_detail?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredcategoryData(filteredArray);
  };
  const categoryData =
    filteredcategoryData.length > 0 ? filteredcategoryData : contentFilterData;

  useEffect(() => {
    if (onlyPubliccategory) {
      if (filteredcategoryData.length > 0) {
        const data = filteredcategoryData.filter(
          (obj) => obj?.value?.public_content == true
        );
        setFilteredcategoryData(data);
      } else {
        const data = contentFilterData.filter(
          (obj) => obj?.value?.public_content == true
        );
        setContentFilterData(data);
      }
    } else {
      handlesportData();
    }
  }, [onlyPubliccategory]);

  useEffect(() => {
    window.addEventListener("popstate", (e) => {
      window.history.go(1);
    });
  }, []);

  // window.addEventListener("popstate", (e) => {
  //   console.log("window.history.length", window.history.length)
  //   if(window.history.length === 2){
  //   console.log("IFFFFFFFFFFFFF")
  //     window.location.replace("/")
  //   }else{
  //   console.log("ELSEEEEEEEEEEE")
  //     window.history.go(1);
  //     // window.location.replace("/")
  //   }
  // });

  // const sortMergeList = () => {
  //   console.log("mergedResult", mergedResult)
  //   const sortedList = mergedResult.slice();
  //   console.log("sortedList", sortedList)

  //   sortedList.sort((a, b) => {
  //     const idA = a.value?.commentator_user?.id;
  //     const idB = b.value?.commentator_user?.id;

  //     const isAHighlighted = highlightUserId.includes(idA);
  //     const isBHighlighted = highlightUserId.includes(idB);

  //     if (isAHighlighted && !isBHighlighted) {
  //       return -1;
  //     } else if (!isAHighlighted && isBHighlighted) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });

  //   console.log("\n\nsortedList\n\n", sortedList)

  //   // setMergedResult(sortedList);
  // };
  // useEffect(() => {
  //   sortMergeList();
  // }, [mergedResult]);

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
            isLoading={isLoading}
            setActiveCommentsshow={setActiveCommentsshow}
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
              <>
                {activeCommentsshow !== null ? (
                  <EditorProfileActiveComments
                    activeCommentsshow={activeCommentsshow}
                    selectContent={selectContent}
                    setSelectContent={setSelectContent}
                    setDashboardSUser={setDashboardSUser}
                    verifyid={verifyid}
                    cmtReact={cmtReact}
                    homeApiData={homeApiData}
                    followingid={followingid}
                    setCmtReact={setCmtReact}
                    setActiveCommentsshow={setActiveCommentsshow}
                    mergedResult={mergedResult}
                    onlyPublicResult={onlyPublicResult}
                    ads={ads}
                    setData={setData}
                    followingList={followingList}
                    setArrayMerge={setArrayMerge}
                    publicComments={publicComments}
                    setPublicComments={setPublicComments}
                    mergeArrays={mergeArrays}
                    mergedEditorResult={mergedEditorResult}
                    setMergedEditorResult={setMergedEditorResult}
                  />
                ) : (
                  <CommentatorsCommentsPage
                    activeCommentsshow={activeCommentsshow}
                    setActiveCommentsshow={setActiveCommentsshow}
                    setSelectContent={setSelectContent}
                    setDashboardSUser={setDashboardSUser}
                    dashboardSUser={dashboardSUser}
                    selectContent={selectContent}
                    getProfileData={getProfileData}
                    verifyid={verifyid}
                    homeApiData={homeApiData}
                    followingList={followingList}
                    followingid={followingid}
                    cmtReact={cmtReact}
                    setArrayMerge={setArrayMerge}
                    setCmtReact={setCmtReact}
                    publicComments={publicComments}
                    setPublicComments={setPublicComments}
                    subscriptionComments={subscriptionComments}
                    setsubscriptionComments={setsubscriptionComments}
                    mergeArrays={mergeArrays}
                    setMergedEditorResult={setMergedEditorResult}
                    mergedEditorResult={mergedEditorResult}
                    handleOnlyPublicData={handleOnlyPublicData}
                    // membershipDate={membershipDate}
                  />
                )}
              </>
            ) : (
              <>
                {activeCommentsshow !== null ? (
                  <EditorProfileActiveComments
                    activeCommentsshow={activeCommentsshow}
                    selectContent={selectContent}
                    setSelectContent={setSelectContent}
                    setDashboardSUser={setDashboardSUser}
                    verifyid={verifyid}
                    cmtReact={cmtReact}
                    homeApiData={homeApiData}
                    followingid={followingid}
                    setCmtReact={setCmtReact}
                    setActiveCommentsshow={setActiveCommentsshow}
                    mergedResult={mergedResult}
                    onlyPublicResult={onlyPublicResult}
                    ads={ads}
                    setData={setData}
                    followingList={followingList}
                    setArrayMerge={setArrayMerge}
                    publicComments={publicComments}
                    setPublicComments={setPublicComments}
                    mergeArrays={mergeArrays}
                    mergedEditorResult={mergedEditorResult}
                    setMergedEditorResult={setMergedEditorResult}
                  />
                ) : (
                  <DashboardSU
                    activeCommentsshow={activeCommentsshow}
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
                    setCmtReact={setCmtReact}
                    setArrayMerge={setArrayMerge}
                    publicComments={publicComments}
                    setPublicComments={setPublicComments}
                    mergeArrays={mergeArrays}
                    setMergedEditorResult={setMergedEditorResult}
                    mergedEditorResult={mergedEditorResult}
                    handleOnlyPublicData={handleOnlyPublicData}
                  />
                )}
              </>
            )
          ) : (
            <>
              {(selectContent === "home" ||
                selectContent === "editor" ||
                selectContent === "category-content" ||
                selectContent === "comments") && (
                <>
                  <Banner
                    ads={ads}
                    leftCornerAds={leftCornerAds}
                    rightCornerAds={rightCornerAds}
                    // data={
                    //   ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]
                    // }
                  />
                  <EditorBanner
                    homeApiData={homeApiData}
                    category={category}
                    setCategory={setCategory}
                    setSelectContent={setSelectContent}
                    setContentData={setContentData}
                    setCommentsReactionsSports={setCommentsReactionsSports}
                    categoryCounts={categoryCounts}
                    setCategoryCounts={setCategoryCounts}
                  />
                </>
              )}
              {selectContent === "home" &&
                selectPublicorForYou === "for you" && (
                  <>
                    <SelectContent
                      selectContent={selectPublicorForYou}
                      setSelectContent={setSelectPublicorForYou}
                      setPublicSelected={setPublicSelected}
                      publicSelected={publicSelected}
                      handleOnlyPublicData={handleOnlyPublicData}
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
                              publicComments={publicComments}
                              setPublicComments={setPublicComments}
                              mergeArrays={mergeArrays}
                              setCmtReact={setCmtReact}
                              setDashboardSUser={setDashboardSUser}
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
                              setHighlights={setHighlights}
                              highlights={highlights}
                              mergeArrays={mergeArrays}
                              setMergedEditorResult={setMergedEditorResult}
                              mergedEditorResult={mergedEditorResult}
                              setDashboardSUser={setDashboardSUser}
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
                      setPublicSelected={setPublicSelected}
                      publicSelected={publicSelected}
                      handleOnlyPublicData={handleOnlyPublicData}
                    />
                    {/* {console.log(subscriptionResult,"=============>>subscriptionResult")} */}
                    {subscriptionResult?.length === 0 ? (
                      <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                        No Record Found!
                      </div>
                    ) : (
                      <>
                        {subscriptionResult.map((val, index) => {
                          let lastType =
                            subscriptionResult[index == 0 ? 0 : index - 1]
                              ?.type;

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
                                  publicComments={publicComments}
                                  setPublicComments={setPublicComments}
                                  mergeArrays={mergeArrays}
                                  setCmtReact={setCmtReact}
                                  key={index}
                                  handlesportData={handlesportData}
                                  setContentData={setContentData}
                                  contentData={contentData}
                                  subscriptionResult={subscriptionResult}
                                  setSubscriptionResult={setSubscriptionResult}
                                  setDashboardSUser={setDashboardSUser}
                                />
                              </>
                            );
                          }
                          if (val.type == "highlight") {
                            return (
                              <>
                                {/* {lastType == "comment" || val.type !== "comment"
                                  ? index === 0 && <HighlightMainPage />
                                  : null} */}
                                {lastType == "comment" ? (
                                  <HighlightMainPage />
                                ) : null}
                                <SharedProfile
                                  setActiveCommentsshow={setActiveCommentsshow}
                                  data={val}
                                  setData={setData}
                                  setSelectContent={setSelectContent}
                                  verifyid={verifyid}
                                  setDashboardSUser={setDashboardSUser}
                                />
                              </>
                            );
                          }
                        })}
                      </>
                    )}
                  </>
                )}

              {selectContent === "home" &&
                selectPublicorForYou === "only public" && (
                  <>
                    <SelectContent
                      selectContent={selectPublicorForYou}
                      setSelectContent={setSelectPublicorForYou}
                      setPublicSelected={setPublicSelected}
                      publicSelected={publicSelected}
                      handleOnlyPublicData={handleOnlyPublicData}
                    />

                    {onlyPublicResult.map((val, index) => {
                      let lastType =
                        onlyPublicResult[index == 0 ? 0 : index - 1]?.type;

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
                              setDashboardSUser={setDashboardSUser}
                            />
                          </>
                        );
                      }

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
                              publicComments={publicComments}
                              setPublicComments={setPublicComments}
                              mergeArrays={mergeArrays}
                              setCmtReact={setCmtReact}
                              setDashboardSUser={setDashboardSUser}
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
                  highlights={highlights}
                  handleOnlyPublicData={handleOnlyPublicData}
                  setDashboardSUser={setDashboardSUser}
                  categoryCounts={categoryCounts}
                  setCategoryCounts={setCategoryCounts}
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
                  setCmtReact={setCmtReact}
                  publicComments={publicComments}
                  setPublicComments={setPublicComments}
                  mergeArrays={mergeArrays}
                  mergedEditorResult={mergedEditorResult}
                  setMergedEditorResult={setMergedEditorResult}
                  handleOnlyPublicData={handleOnlyPublicData}
                  setDashboardSUser={setDashboardSUser}
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
                  setCmtReact={setCmtReact}
                  setActiveCommentsshow={setActiveCommentsshow}
                  mergedResult={mergedResult}
                  onlyPublicResult={onlyPublicResult}
                  ads={ads}
                  setData={setData}
                  followingList={followingList}
                  setArrayMerge={setArrayMerge}
                  publicComments={publicComments}
                  setPublicComments={setPublicComments}
                  mergeArrays={mergeArrays}
                  mergedEditorResult={mergedEditorResult}
                  setMergedEditorResult={setMergedEditorResult}
                />
              )}
              {selectContent === "become-editor" && (
                <BecomeEditor
                  profileData={profileData}
                  setDashboardSUser={setDashboardSUser}
                  setSelectContent={setSelectContent}
                  setActiveCommentsshow={setActiveCommentsshow}
                />
              )}
              {selectContent === "category-content" && (
                <>
                  <CategoryFilter
                    filterCategoryData={filterCategoryData}
                    setOnlyPubliccategory={setOnlyPubliccategory}
                    onlyPubliccategory={onlyPubliccategory}
                  />
                  {categoryData.length == 0 ? (
                    <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                      No Record Found!
                    </div>
                  ) : (
                    categoryData?.map((res, index) => (
                      <ContentSection
                        key={index}
                        data={res}
                        setActiveCommentsshow={setActiveCommentsshow}
                        homeApiData={homeApiData}
                        setData={setData}
                        selectContent={selectPublicorForYou}
                        selectPublicorForYou={selectContent}
                        setSelectContent={setSelectContent}
                        followingList={followingList}
                        followingid={followingid}
                        verifyid={verifyid}
                        cmtReact={cmtReact}
                        mergeArrays={mergeArrays}
                        publicComments={publicComments}
                        setPublicComments={setPublicComments}
                        setCmtReact={setCmtReact}
                        handlesportData={handlesportData}
                        setContentData={setContentData}
                        contentData={contentData}
                        setDashboardSUser={setDashboardSUser}
                      />
                    ))
                  )}
                </>
              )}
            </>
          )}
        </div>
        <Footer
          setDashboardSUser={setDashboardSUser}
          setSelectContent={setSelectContent}
          selectContent={selectContent}
          homeApiData={homeApiData}
        />
      </div>
    </>
  );
};

export default MainPage;
