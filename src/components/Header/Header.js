import React, { useEffect, useState } from "react";
import { todoList } from "../../constants/constants";
import Footer from "../Footer/Footer";
import TodoContent from "../TodoContent/TodoContent";
import "./Header.scss";

function Header() {
  const [inputValue, setInputValue] = useState("");
  const { todo, filter, filters } = todoList;
  const [list, setList] = useState(todo);
  const [editing, setEditing] = useState(0);
  const [currentFilter, setCurrentFilter] = useState(filter);
  const [checkAll, setCheckAll] = useState(list.every(filters.Completed));
  // console.log(list.every(filters.Completed));

  const handleAdd = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setInputValue("");
      const newId = Math.max(...list.map((item) => item.id));
      const newList = {
        id: newId + 1,
        name: inputValue,
        completed: false,
      };
      const newTodo = list;
      newTodo.push(newList);
      setList(newTodo);
    }
  };

  const handleToggleCheck = (id) => {
    let newList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : { ...item }
    );
    setList(newList);
  };

  const handleDelete = (id) => {
    let newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const handleEditing = (id) => {
    setEditing(id);
  };

  const handleBlur = () => {
    setEditing(0);
  };

  const handleUpdate = (e, id) => {
    if (e.key === "Enter" && e.target.value) {
      const newList = list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: e.target.value,
          };
        }
        return item;
      });
      setEditing(0);
      e.target.value = "";
      setList(newList);
    }
  };

  const handleClearCompleted = () => {
    const newList = list.filter((item) => item.completed === false);
    setList(newList);
  };

  const setFilter = (filter) => {
    setCurrentFilter(filter);
  };
  const handleCheckAll = () => {
    setCheckAll(!checkAll);
  };
  useEffect(() => {
    const newList = list.map((item) => {
      return {
        ...item,
        completed: checkAll,
      };
    });
    // console.log("newlist", newList);
    setList(newList);
  }, [checkAll]);
  // useEffect(() => {
  //   if (list.every(filters.Completed)) {
  //     setCheckAll(!checkAll);
  //   }
  // }, [list]);

  // console.log(list);
  // console.log("list", list);

  return (
    <>
      <header className="header">
        <h1>Todo List</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyUp={handleAdd}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={() => handleCheckAll()}
          checked={checkAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {list.filter(filters[currentFilter]).map((item) => {
            return (
              <TodoContent
                data={item}
                handleToggleCheck={handleToggleCheck}
                handleDelete={handleDelete}
                handleEditing={handleEditing}
                editing={editing}
                handleBlur={handleBlur}
                handleUpdate={handleUpdate}
              />
            );
          })}
        </ul>
      </section>
      <Footer
        clearCompleted={handleClearCompleted}
        setFilter={setFilter}
        list={list}
      />
    </>
  );
}

export default Header;
