import React from "react";
import SelectContentForEditorPage from "../SelectContentForEditorPage/SelectContentForEditorPage";
import ContentSection from "../ContentSection/ContentSection";
import HighlightMainPage from "../HighlightMainPage/HighlightMainPage";
import SharedProfile from "../SharedProfile/SharedProfile";
import { AdvertisementBanner } from "../AdvertisementBanner/AdvertisementBanner";

const CommentsPage = () => {
  return (
    <>
      <SelectContentForEditorPage comments={true} />
      <ContentSection />
      <HighlightMainPage />
      <SharedProfile />
      <AdvertisementBanner />
      <ContentSection />
    </>
  );
};

export default CommentsPage;
