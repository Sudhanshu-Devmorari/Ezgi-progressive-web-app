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
  handleOnlyPublicData
}) => {
  const [filterData, setFilterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayData, setDisplayData] = useState([]);
  const [mergedEditorResult, setMergedEditorResult] = useState([]);
  const [adsdata, setAdsdata] = useState([]);

  const [adsId, setAdsId] = useState(null);
  useEffect(() => {
    // console.log("this page called");

    HandleCommentator();
  }, []);

  const HandleCommentator = async () => {
    try {
      const response = await axios.get(
        `${config?.apiUrl}/retrieve-commentator-list/?id=${userId}`
      );

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

      if (remainingPublic.length > 0) {
        merged = [
          ...merged,
          ...remainingPublic.map((comment) => ({
            value: comment,
          })),
        ];
      }

      setMergedEditorResult(merged);
    }
  };

  useEffect(() => {
    mergeEditorArrays();
  }, [displayData, highlights]);

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
    const bannerElement = document.getElementById("banner");

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

  return (
    <>
      <SelectContentForEditorPage
        editor={true}
        data={mergedEditorResult}
        setDisplayData={setDisplayData}
        setFilterData={setFilterData}
        handleOnlyPublicData={handleOnlyPublicData}
      />

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
                  <div className="" id={`banner`}>
                    <AdvertisementBanner data={adsdata} />
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
