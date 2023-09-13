import React from "react";
import SelectContentForEditorPage from "../SelectContentForEditorPage/SelectContentForEditorPage";
import { AdvertisementBanner } from "../AdvertisementBanner/AdvertisementBanner";
import SharedProfile from "../SharedProfile/SharedProfile";
import EditorFilter from "../EditorFilter/EditorFilter";
import { useState } from "react";
import { countsAdsAPI } from "../CountsAdViewAPI";
import { useEffect } from "react";
import axios from "axios";
import config from "../../config";
import { userId } from "../GetUser";

const EditorsPage = ({
  data,
  ads,
  setData,
  setSelectContent,
  setActiveCommentsshow,
  verifyid,
  highlights,
}) => {
  const [filterData, setFilterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayData, setDisplayData] = useState([]);
  const [mergedEditorResult, setMergedEditorResult] = useState([]);

  // ADS viewsssssssss-----------------
  const [adsId, setAdsId] = useState(null);
  useEffect(() => {
    console.log("this page called");
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
    HandleCommentator();
  }, []);

  const HandleCommentator = async () => {
    try {
      const response = await axios.get(
        `${config?.apiUrl}/retrieve-commentator-list/?id=${userId}`
      );
      // const commentatorData = response?.data?.Commentator?.map((item) => ({
      //   type: "commentator",
      //   value: item,
      // }));
      // console.log("commentatorData::::::::::::::::", commentatorData);
      console.log("highlights::::::::::::::::", highlights);
      setDisplayData(response?.data?.Commentator);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("err:::", error);
    }
  };

  const mergeEditorArrays = () => {
    if (displayData.length > 0) {
      let merged = [];
      let remainingPublic = [...displayData];
      let remainingHighlights = [...highlights];

      if (remainingPublic.length > 0) {
        merged = [
          ...merged,
          ...remainingPublic.map((comment) => ({
            value: comment,
          })),
        ];
      }

      // if (remainingHighlights.length > 0) {
      //   merged = [
      //     ...merged,
      //     ...remainingHighlights.map((highlight) => ({
      //       value: highlight,
      //     })),
      //   ];
      // }

      setMergedEditorResult(merged);
    }
  };

  useEffect(() => {
    mergeEditorArrays();
  }, [displayData, highlights]);

  useEffect(() => {
    console.log("mergedEditorResult:::::::::::::", mergedEditorResult);
  }, [mergedEditorResult]);

  const [showBanner, setShowBanner] = useState(false);

  // Simulated API call function
  const fetchBannerData = async () => {
    const res = await countsAdsAPI("ads_view", adsId?.id);
    // console.log("res=>>>>", res);
  };

  const checkBannerVisibility = () => {
    const bannerElement = document.getElementById("banner");

    if (bannerElement) {
      const bannerRect = bannerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (bannerRect.top < windowHeight && bannerRect.bottom >= 0) {
        setShowBanner(true);
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
    if (showBanner) {
      fetchBannerData();
    }
  }, [showBanner]);

  return (
    <>
      <SelectContentForEditorPage
        editor={true}
        data={mergedEditorResult}
        setDisplayData={setDisplayData}
        setFilterData={setFilterData}
      />
      {/* <AdvertisementBanner
        data={ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]}
      /> */}
      {/* <SharedProfile /> */}
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          Loading…
        </div>
      ) : (
        (filterData == null ? mergedEditorResult : filterData)?.map(
          (val, index) => {
            return (
              <>
                {index % 10 == 0 ? (
                  // <AdvertisementBanner
                  //   data={ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]}
                  // />
                  <div className="" id={`banner-${index}`}>
                    <AdvertisementBanner data={adsId} />
                  </div>
                ) : null}
                <SharedProfile
                  setActiveCommentsshow={setActiveCommentsshow}
                  data={val}
                  setData={setData}
                  setSelectContent={setSelectContent}
                  verifyid={verifyid}
                  mergedEditorResult={mergedEditorResult}
                  setMergedEditorResult={setMergedEditorResult}
                />
              </>
            );
          }
        )
      )}
    </>
  );
};

export default EditorsPage;
