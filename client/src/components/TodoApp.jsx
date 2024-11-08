import React, { useReducer, useEffect, Suspense } from "react";

import todoReducer, { initialState } from "./TodoReducer";
import axios from "axios";
import '../index.scss';


const TodoList = React.lazy(() => import('./TodoList'));
const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  // Fetch all todos from the server on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        dispatch({ type: "SET_TODOS", payload: response.data });
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Todo App</h1>
      <Suspense fallback={<div>Loading List...</div>}>
        <TodoList todos={todos} dispatch={dispatch} />
      </Suspense>
    </div>
  );
};

export default TodoApp;
