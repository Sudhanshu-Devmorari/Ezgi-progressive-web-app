import React, { useState } from "react";
import ActiveComments from "../ActiveComments/ActiveComments";
import SelectComments from "../SelectComments/SelectComments";
import ContentSection from "../ContentSection/ContentSection";
import CommentsContentSection from "../CommentsContentSection/CommentsContentSection";


const EditorProfileActiveComments = (props) => {
  const [SelectComment, setSelectComment] = useState("activeComments");
  
  return (
    <>
    <ActiveComments setSelectContent={props.setSelectContent}/>
    <SelectComments setSelectComment={setSelectComment} SelectComment={SelectComment}/>
    <CommentsContentSection SelectComment={SelectComment}/>
    </>
  );
};

export default EditorProfileActiveComments;
