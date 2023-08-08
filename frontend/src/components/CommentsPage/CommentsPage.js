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
}) => {
  const [onlyPublic, setOnlyPublic] = useState("");
  console.log('&&&&&&&&', onlyPublicResult)
  console.log('&&-----&&', selectContent)
  return (
    <>
      <SelectContentForEditorPage
        comments={true}
        setOnlyPublic={setOnlyPublic}
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
        mergedResult.map((val, index) => {
          let lastType = mergedResult[index == 0 ? 0 : index - 1]?.type;

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
                  data={val}
                  setData={setData}
                  selectContent={selectContent}
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
                      ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]
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
                  data={val}
                  setData={setData}
                  selectContent={selectContent}
                  setSelectContent={setSelectContent}
                />
              </>
            );
          }
          if (val.type == "highlight") {
            return (
              <>
                {lastType == "comment" ? <HighlightMainPage /> : null}
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
  );
};

export default CommentsPage;
