import React, { useState } from "react";
import SelectContentForEditorPage from "../SelectContentForEditorPage/SelectContentForEditorPage";
import ContentSection from "../ContentSection/ContentSection";
import HighlightMainPage from "../HighlightMainPage/HighlightMainPage";
import SharedProfile from "../SharedProfile/SharedProfile";
import { AdvertisementBanner } from "../AdvertisementBanner/AdvertisementBanner";

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
  homeApiData
}) => {
  const [onlyPublic, setOnlyPublic] = useState("");
  // console.log('&&&&&&&&', mergedResult)
  // console.log('&&-----&&', selectContent)
  const [filterCommentData, setFilterCommentData] = useState(null)
  const [displayData, setDisplayData] = useState(mergedResult)
  // console.log(":::::::::::", filterCommentData)
  return (
    <>
      <SelectContentForEditorPage
        data={mergedResult}
        comments={true}
        setOnlyPublic={setOnlyPublic}
        setFilterCommentData={setFilterCommentData}
        setDisplayData={setDisplayData}
      />
      {/* <ContentSection />
      <HighlightMainPage />
      <SharedProfile />
      <AdvertisementBanner />
      <ContentSection /> */}
      <AdvertisementBanner
        data={ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]}
      />
      {onlyPublic == "" &&
      (filterCommentData == null ? displayData : filterCommentData)?.map((val, index) => {
          let lastType = displayData[index == 0 ? 0 : index - 1]?.type;

          if (val.type == "comment") {
            return (
              <>
                {lastType == "highlight" ? (
                  <AdvertisementBanner
                    data={
                      ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]
                    }
                  />
                ) : null}
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
                      ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]
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
      {onlyPublic == "Only public" &&
        onlyPublicResult?.map((val, index) => {
          let lastType = onlyPublicResult[index == 0 ? 0 : index - 1]?.type;

          if (val.type == "comment") {
            return (
              <>
                {lastType == "highlight" ? (
                  <AdvertisementBanner
                    data={
                      ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]
                    }
                  />
                ) : null}
                <ContentSection
                setActiveCommentsshow={setActiveCommentsshow}
                  data={val}
                  setData={setData}
                  selectContent={selectContent}
                  setSelectContent={setSelectContent}
                  verifyid={verifyid}
                  followingid={followingid}
                  cmtReact={cmtReact}
                />
              </>
            );
          }
          if (val.type == "highlight") {
            return (
              <>
                {lastType == "comment" ? <HighlightMainPage /> : null}
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
