import React, { useRef, useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./userTagList.css";

function UserTagList(props) {
  const [usernames, setUsernames] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const tagInputField = document.querySelector(".ReactTags__tagInputField");

    if (tagInputField) {
      tagInputField.placeholder = "Select users";
    }
  }, []);

  const [tags, setTags] = useState(props.usernames);

  const handleOptionChange = (event) => {
    props.setSelectedOption(event.target.value);
    // console.log("selectedOption", props.selectedOption);
    // if (props.selectedOption === "All") {
    //   props.setUserList(props.usernames);
    // }
    // if (props.selectedOption === "Multiple") {
    //   const updatedTagTexts = tags.map((t) => t.text);
    //   props.setUserList(updatedTagTexts);
    // }
  };

  const handleAllClick = () => {
    props.setUserList(props.usernames);
  };
  const handleMultipleClick = () => {
    const updatedTagTexts = tags.map((t) => t.text);
    props.setUserList(updatedTagTexts);
  };
  const suggestions = props.usernames.map((username) => {
    return {
      id: username,
      text: username,
    };
  });

  const handleDelete = (i) => {
    const updatedTags = tags.filter((tag, index) => index !== i);

    const updatedTagTexts = updatedTags.map((tag) => tag.text);

    setTags(updatedTags);

    props.setUserList(updatedTagTexts);
  };

  const handleAddition = (tag) => {
    const tagText = tag.text;
    const updatedTagTexts = [...tags.map((t) => t.text), tagText];
    setTags([...tags, tag]);
    props.setUserList(updatedTagTexts);
  };

  return (
    <div>
      <div className="col my-2 d-flex my-2 g-0 gap-2 btn-group">
        <label>
          <input
            onClick={handleAllClick}
            type="radio"
            value="All"
            checked={props.selectedOption === "All"}
            onChange={handleOptionChange}
          />{" "}
          All
        </label>

        <label>
          <input
            onClick={handleMultipleClick}
            type="radio"
            value="Multiple"
            checked={props.selectedOption === "Multiple"}
            onChange={handleOptionChange}
          />{" "}
          Multiple
        </label>
      </div>
      {props.selectedOption === "Multiple" && (
        
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            autocomplete
            tagClassName="selected-tag"
          />
        
      )}
    </div>
  );
}

export default UserTagList;
