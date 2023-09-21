import React, { useEffect, useState } from "react";
import SelectContentForEditorPage from "../SelectContentForEditorPage/SelectContentForEditorPage";
import ContentSection from "../ContentSection/ContentSection";
import HighlightMainPage from "../HighlightMainPage/HighlightMainPage";
import SharedProfile from "../SharedProfile/SharedProfile";
import { AdvertisementBanner } from "../AdvertisementBanner/AdvertisementBanner";
import { countsAdsAPI } from "../CountsAdViewAPI";

const CommentsPage = ({
  mergedResult,
  onlyPublicResult,
  ads,
  setData,
  selectContent,
  setSelectContent,
  selectPublicorForYou,
  setActiveCommentsshow,
  followingid,
  verifyid,
  cmtReact,
  homeApiData,
  setArrayMerge,
  publicComments,
  setPublicComments,
  setCmtReact,
  mergeArrays,
  handleOnlyPublicData,
}) => {
  const [onlyPublic, setOnlyPublic] = useState("");
  const [filterCommentData, setFilterCommentData] = useState(null);
  const [displayData, setDisplayData] = useState(mergedResult);
  const [publicSelected, setPublicSelected] = useState(false);
  const [adsdata, setAdsdata] = useState([]);

  useEffect(() => {
    setDisplayData(mergedResult);
  }, [mergedResult]);

  // ADS viewsssssssss-----------------
  const [adsId, setAdsId] = useState(null);
  useEffect(() => {
    const timelineFilter = ads.filter((res) => res.ads_space == "Timeline");

    const adsBannerId = (
      Math.random() * (timelineFilter.length - 1) +
      1
    ).toFixed(0);

    if (adsBannerId >= timelineFilter.length) {
      setAdsId(ads[adsBannerId - 1]);
    } else {
      setAdsId(ads[adsBannerId]);
    }
  }, []);

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    adsId && fetchBannerData();
  }, [adsId]);

  // Simulated API call function
  const fetchBannerData = async () => {
    try {
      const res = await countsAdsAPI("ads_view", adsId);
    } catch (error) {
      console.log("error=>>>>", error);
    }
  };

  const checkBannerVisibility = () => {
    const bannerElement = document.getElementById("banner1");

    if (bannerElement) {
      const bannerRect = bannerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (bannerRect.top < windowHeight && bannerRect.bottom >= 0) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkBannerVisibility);
    checkBannerVisibility();

    return () => {
      window.removeEventListener("scroll", checkBannerVisibility);
    };
  }, []);

  useEffect(() => {
    const adsIdFilter = ads.map((res) => res.id);

    function get_random(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    setAdsId(get_random(adsIdFilter));
    setAdsdata(ads[get_random(adsIdFilter)]);
    if (showBanner) {
      fetchBannerData();
    }
  }, [showBanner]);

  const [showBanner2, setShowBanner2] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", checkBannerVisibility2);
    checkBannerVisibility2();

    return () => {
      window.removeEventListener("scroll", checkBannerVisibility2);
    };
  }, []);
  const checkBannerVisibility2 = () => {
    const bannerElement = document.getElementById("banner2");

    if (bannerElement) {
      const bannerRect = bannerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (bannerRect.top < windowHeight && bannerRect.bottom >= 0) {
        setShowBanner2(true);
      }
    }
  };

  useEffect(() => {
    if (showBanner2) {
      fetchBannerData();
    }
  }, [showBanner2]);

  const [showBanner3, setShowBanner3] = useState(false);

  const checkBannerVisibility3 = () => {
    const bannerElement = document.getElementById("banner3");

    if (bannerElement) {
      const bannerRect = bannerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (bannerRect.top < windowHeight && bannerRect.bottom >= 0) {
        setShowBanner3(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkBannerVisibility3);
    checkBannerVisibility3();

    return () => {
      window.removeEventListener("scroll", checkBannerVisibility3);
    };
  }, []);

  useEffect(() => {
    if (showBanner3) {
      fetchBannerData();
    }
  }, [showBanner3]);

  return (
    <>
      <SelectContentForEditorPage
        data={mergedResult}
        comments={true}
        setOnlyPublic={setOnlyPublic}
        setFilterCommentData={setFilterCommentData}
        setDisplayData={setDisplayData}
        setPublicSelected={setPublicSelected}
        publicSelected={publicSelected}
        handleOnlyPublicData={handleOnlyPublicData}
      />
      <div className="" id="banner1">
        <AdvertisementBanner data={adsdata} />
      </div>
      {onlyPublic == "" &&
      (filterCommentData == null ? displayData : filterCommentData)?.length ==
        0 ? (
        <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
          No Record Found!
        </div>
      ) : (
        (filterCommentData == null ? displayData : filterCommentData)?.map(
          (val, index) => {
            let lastType = displayData[index == 0 ? 0 : index - 1]?.type;

            if (val.type == "comment") {
              return (
                <>
                  {lastType == "highlight" && (
                    <div className="" id="banner2">
                      <AdvertisementBanner data={adsdata} />
                    </div>
                  )}
                  <ContentSection
                    setActiveCommentsshow={setActiveCommentsshow}
                    data={val}
                    setData={setData}
                    selectContent={selectContent}
                    setSelectContent={setSelectContent}
                    followingid={followingid}
                    verifyid={verifyid}
                    cmtReact={cmtReact}
                    homeApiData={homeApiData}
                    setArrayMerge={setArrayMerge}
                    publicComments={publicComments}
                    setPublicComments={setPublicComments}
                    mergeArrays={mergeArrays}
                    setCmtReact={setCmtReact}
                  />
                </>
              );
            }
            if (val.type == "highlight") {
              return (
                <>
                  {lastType == "comment" && <HighlightMainPage />}
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
          }
        )
      )}

      {onlyPublic == "only public" &&
        onlyPublicResult?.map((val, index) => {
          let lastType = onlyPublicResult[index == 0 ? 0 : index - 1]?.type;

          if (val.type == "comment") {
            return (
              <>
                {lastType == "highlight" && (
                  <div className="" id="banner3">
                    <AdvertisementBanner data={adsdata} />
                  </div>
                )}
                <ContentSection
                  setActiveCommentsshow={setActiveCommentsshow}
                  data={val}
                  setData={setData}
                  selectContent={selectContent}
                  setSelectContent={setSelectContent}
                  verifyid={verifyid}
                  followingid={followingid}
                  cmtReact={cmtReact}
                  homeApiData={homeApiData}
                  setArrayMerge={setArrayMerge}
                  publicComments={publicComments}
                  setPublicComments={setPublicComments}
                  mergeArrays={mergeArrays}
                  setCmtReact={setCmtReact}
                />
              </>
            );
          }
          if (val.type == "highlight") {
            return (
              <>
                {lastType == "comment" && <HighlightMainPage />}
                <SharedProfile
                  setActiveCommentsshow={setActiveCommentsshow}
                  data={val}
                  setData={setData}
                  setSelectContent={setSelectContent}
                />
              </>
            );
          }
        })}
    </>
  );
};

export default CommentsPage;
