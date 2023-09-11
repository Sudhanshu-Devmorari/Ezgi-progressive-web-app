import React from "react";
import SelectContentForEditorPage from "../SelectContentForEditorPage/SelectContentForEditorPage";
import { AdvertisementBanner } from "../AdvertisementBanner/AdvertisementBanner";
import SharedProfile from "../SharedProfile/SharedProfile";
import EditorFilter from "../EditorFilter/EditorFilter";
import { useState } from "react";
import { countsAdsAPI } from "../CountsAdViewAPI";
import { useEffect } from "react";

const EditorsPage = ({
  data,
  ads,
  setData,
  setSelectContent,
  setActiveCommentsshow,
  verifyid,
}) => {
  const [filterData, setFilterData] = useState(null);
  const [displayData, setDisplayData] = useState(data);

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

  // Simulated API call function
  const fetchBannerData = async () => {
    const res = await countsAdsAPI("ads_view", adsId?.id);
    console.log("res=>>>>", res);
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
        data={data}
        setDisplayData={setDisplayData}
        setFilterData={setFilterData}
      />
      {/* <AdvertisementBanner
        data={ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]}
      /> */}
      {/* <SharedProfile /> */}
      {(filterData == null ? displayData : filterData)?.map((val, index) => {
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
            />
          </>
        );
      })}
    </>
  );
};

export default EditorsPage;
