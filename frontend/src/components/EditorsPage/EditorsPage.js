import React from "react";
import SelectContentForEditorPage from "../SelectContentForEditorPage/SelectContentForEditorPage";
import { AdvertisementBanner } from "../AdvertisementBanner/AdvertisementBanner";
import SharedProfile from "../SharedProfile/SharedProfile";

const EditorsPage = () => {
  return (
    <>
      <SelectContentForEditorPage editor={true} />
      <AdvertisementBanner />
      <SharedProfile />
      <AdvertisementBanner />
      <SharedProfile />
    </>
  );
};

export default EditorsPage;
