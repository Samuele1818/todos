import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./styles.css";

const TODOItem = ({ item, deleteItem, checkItem }) => {
  return (
    <div className="todo-item">
      <button onClick={deleteItem} />
      <div onClick={checkItem}>
        <p className={item.complete && "checked"}>{item.task}</p>
      </div>
    </div>
  );
};

export default function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const addTodo = () => {
    let copy = [...todos];
    copy = [
      ...copy,
      { id: todos.length, task: inputRef.current.value, complete: false }
    ];
    setTodos(copy);
    inputRef.current.value = "";
  };

  const removeTODO = (id) => {
    let map = [...todos];
    map.forEach((i, index) => {
      i.id === id && map.splice(index, 1);
    });
    setTodos([...map]);
  };

  const checkTODO = (id) => {
    let map = [...todos];
    todos.forEach((i, index) => {
      i.id === id && (map[index].complete = !map[index].complete);
    });
    setTodos([...map]);
  };

  useLayoutEffect(() => {
    const todosItem = window.localStorage.getItem("todos");
    todosItem && setTodos(JSON.parse(todosItem));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, setTodos]);

  return (
    <div className="main-container">
      <div className="content-container">
        <section className="input-container">
          <label>Add your todo:</label>
          <input ref={inputRef} placeholder="Insert a new TODO..." />
          <button onClick={addTodo}>Add TODO</button>
        </section>
        <section>
          {todos.map((item, index) => {
            return (
              <TODOItem
                key={index}
                checkItem={() => checkTODO(item.id)}
                deleteItem={() => removeTODO(item.id)}
                item={item}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}
