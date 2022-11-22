import React, { useEffect, useRef } from "react";
import "./TodoContent.scss";

function TodoContent({
  data,
  handleToggleCheck,
  handleDelete,
  handleEditing,
  editing,
  handleBlur,
  handleUpdate,
}) {
  const inputEditRef = useRef();

  useEffect(() => {
    inputEditRef && inputEditRef.current.focus();
  }, [handleEditing]);

  // console.log("data", data);

  return (
    <li
      key={data.id}
      className={`${data.completed ? "completed" : ""} ${
        editing === data.id ? "editing" : ""
      }`}
      onDoubleClick={() => handleEditing(data.id)}
      onBlur={() => handleBlur()}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={data.completed}
          onClick={() => handleToggleCheck(data.id)}
        />
        <label>{data.name}</label>
        <button
          className="destroy"
          onClick={() => handleDelete(data.id)}
        ></button>
      </div>
      <input
        className="edit"
        ref={inputEditRef}
        placeholder={data.name}
        onKeyUp={(e) => handleUpdate(e, data.id)}
      />
    </li>
  );
}

export default TodoContent;
