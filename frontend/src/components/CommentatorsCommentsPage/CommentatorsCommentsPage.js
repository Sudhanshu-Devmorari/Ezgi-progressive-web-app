import React, { useState } from 'react'
import ActiveComments from '../ActiveComments/ActiveComments'
import CommentatorIcons from '../CommentatorIcons/CommentatorIcons'
import SelectComments from '../SelectComments/SelectComments'
import CommentsContentSection from '../CommentsContentSection/CommentsContentSection'
import EditorProfileStatisticsSection from '../EditorProfileStatisticsSection/EditorProfileStatisticsSection'

const CommentatorsCommentsPage = (props) => {
    const [SelectComment, setSelectComment] = useState("activeComments");
    const [home, setHome] = useState("home");
  return (
    <>
        <ActiveComments user={props.user}/>
        <CommentatorIcons setHome={setHome}/>
        <SelectComments setSelectComment={setSelectComment} SelectComment={SelectComment}/>
        {SelectComment !== "statistics" && (
            <CommentsContentSection SelectComment={SelectComment}/>
        )}
        {SelectComment === "statistics" && (
        <EditorProfileStatisticsSection/>
        )}
    </>
  )
}

export default CommentatorsCommentsPage