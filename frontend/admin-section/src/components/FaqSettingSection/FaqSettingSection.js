import React, { useState } from "react";
import {
  Draggable,
  moveItems,
  useDraggable,
  useDraggableContext,
} from "react-tiny-dnd";
import { MdDelete, MdDragIndicator } from "react-icons/md";

const Item = ({
  id,
  color: backgroundColor,
  listeners,
  isDragging,
  handleDelete,
}) => {
  const index = Number(id);
  const opacity = isDragging ? 0.5 : 1;

  let height = "initial";
  if (index % 3 === 0) {
    height = 110;
  } else if (index % 4 === 0) {
    height = 70;
  }

  return (
    <div className="item" style={{ height, opacity }}>
      <div className="d-flex align-items-center">
        <div className="dnd-icon me-3" {...listeners}>
          <MdDragIndicator
            color="#fff"
            size={30}
            style={{ marginTop: "2.2rem" }}
          />
        </div>
        <form>
          <div className="my-2 mt-3 d-flex gap-3">
            {/* <div className="col-2"> */}
            <div className=" d-flex flex-column">
              <span className="p-1 ps-0">Daily Match Limit</span>
              <input
                //   onChange={formik.handleChange}
                name="daily_match_limit"
                type="text"
                className="darkMode-input form-control text-center"
                //   value={formik.values.daily_match_limit}
              />
            </div>
            {/* </div> */}
            {/* <div className="col-2"> */}
            <div className="d-flex flex-column">
              <span className="p-1 ps-0">Monthly Min.Content</span>
              <input
                //   onChange={formik.handleChange}
                name="monthly_min_limit"
                type="text"
                className="darkMode-input form-control text-center"
                //   value={formik.values.monthly_min_limit}
              />
            </div>
            {/* </div> */}
          </div>
        </form>
        <div className="delete-icon ms-3" onClick={() => handleDelete?.()}>
          <MdDelete color="#fff" size={30} style={{ marginTop: "2.2rem" }} />
        </div>
      </div>
    </div>
  );
};

const DraggableItem = ({ index, context, item }) => {
  const {
    listeners, // Handler listeners can be passed to Draggable component as well
    isDragging,
  } = useDraggable(context, index);

  return (
    <Draggable
      context={context}
      key={index}
      index={index}
      preview={
        <Item
          id={item.id}
          color={item.color}
          listeners={listeners}
          isDragging={false}
        />
      }
    >
      <Item
        item={item}
        handler={
          <div className="dnd-icon" {...listeners}>
            {/* <img src={dndIc} alt="dnd" /> */}
            <MdDragIndicator color="#fff" />
          </div>
        }
      />
    </Draggable>
  );
};

const FaqSettingSection = () => {
  const [items, setItems] = useState([
    {
      que: "",
      ans: "",
    },
    {
      que: "",
      ans: "",
    },
  ]);

  const onDrop = (dragIndex, overIndex) => {
    const nextItems = moveItems(items, dragIndex, overIndex);
    setItems(nextItems);
  };

  const context = useDraggableContext({
    onDrop,
  });

  return (
    <div className="m-3">
      {items.map((item, i) => {
        return (
          <DraggableItem
            key={item.id}
            context={context}
            index={i}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default FaqSettingSection;
