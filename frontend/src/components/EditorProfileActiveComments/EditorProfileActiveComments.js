import React, { useState, useEffect } from "react";
import ActiveComments from "../ActiveComments/ActiveComments";
import SelectComments from "../SelectComments/SelectComments";
import ContentSection from "../ContentSection/ContentSection";
import CommentsContentSection from "../CommentsContentSection/CommentsContentSection";
import EditorProfileStatisticsSection from "../EditorProfileStatisticsSection/EditorProfileStatisticsSection";
import axios from "axios";
import config from "../../config";

const EditorProfileActiveComments = (props) => {
  const [SelectComment, setSelectComment] = useState("activeComments");

  console.log(">>>>>>>>>>>>.", props.activeCommentsshow);
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    async function getProfileData() {
      const res = await axios.get(`${config.apiUrl}/profile/${props?.activeCommentsshow}`);
      // console.log(res.data,"========>>>");
      setProfileData(res.data);
    }
    getProfileData();
  }, []);

  return (
    <>
      <ActiveComments
        setSelectContent={props.setSelectContent}
        setDashboardSUser={props.setDashboardSUser}
        activeCommentsshow={props?.activeCommentsshow}
        profileData={profileData}
      />
      <SelectComments
        setSelectComment={setSelectComment}
        SelectComment={SelectComment}
      />
      {SelectComment !== "statistics" && (
        <CommentsContentSection SelectComment={SelectComment} />
      )}
      {SelectComment === "statistics" && <EditorProfileStatisticsSection from={'editor'} activeCommentsshow={props.activeCommentsshow}/>}
    </>
  );
};

export default EditorProfileActiveComments;
