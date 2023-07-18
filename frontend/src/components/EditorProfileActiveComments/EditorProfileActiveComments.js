import React, { useState } from "react";
import ActiveComments from "../ActiveComments/ActiveComments";
import SelectComments from "../SelectComments/SelectComments";
import ContentSection from "../ContentSection/ContentSection";
import CommentsContentSection from "../CommentsContentSection/CommentsContentSection";
import EditorProfileStatisticsSection from "../EditorProfileStatisticsSection/EditorProfileStatisticsSection";


const EditorProfileActiveComments = (props) => {
  const [SelectComment, setSelectComment] = useState("activeComments");
  
  return (
    <>
    <ActiveComments setSelectContent={props.setSelectContent} setDashboardSUser={props.setDashboardSUser}/>
    <SelectComments setSelectComment={setSelectComment} SelectComment={SelectComment}/>
    {SelectComment !== "statistics" && (
      <CommentsContentSection SelectComment={SelectComment}/>
    )}
    {SelectComment === "statistics" && (
      <EditorProfileStatisticsSection/>
    )}
    </>
  );
};

export default EditorProfileActiveComments;
