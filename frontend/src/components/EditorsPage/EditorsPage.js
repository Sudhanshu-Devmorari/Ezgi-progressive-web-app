import React from "react";
import SelectContentForEditorPage from "../SelectContentForEditorPage/SelectContentForEditorPage";
import { AdvertisementBanner } from "../AdvertisementBanner/AdvertisementBanner";
import SharedProfile from "../SharedProfile/SharedProfile";
import EditorFilter from "../EditorFilter/EditorFilter";
import { useState } from "react";


const EditorsPage = ({ data, ads, setData, setSelectContent, setActiveCommentsshow, verifyid }) => {
  const [filterData, setFilterData] = useState(null)
  const [displayData, setDisplayData] = useState(data)
  return (
    <>
      <SelectContentForEditorPage editor={true} data={data} setDisplayData={setDisplayData} setFilterData={setFilterData}/>
      {/* <AdvertisementBanner
        data={ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]}
      /> */}
      {/* <SharedProfile /> */}
      {(filterData == null ? displayData : filterData)?.map((val, index) => {
        return (
          <>
            {index % 10 == 0 ? (
              <AdvertisementBanner
                data={ads[(Math.random() * (ads.length - 1) + 1).toFixed(0)]}
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
      })}
    </>
  );
};

export default EditorsPage;
