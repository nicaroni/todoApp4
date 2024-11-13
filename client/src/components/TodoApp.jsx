import React, { useReducer, useEffect, Suspense } from "react";
import todoReducer, { initialState } from "./TodoReducer";
import axios from "axios";
import '../index.scss';

const TodoList = React.lazy(() => import('./TodoList'));

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  // Fetch all todos from the server on component mount
  const fetchTodos = async () => {
    const token = localStorage.getItem('authToken');  // Get the token from localStorage
  
    if (!token) {
      console.error('No token found, please log in.');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:5000/todos', {
        headers: {
          'Authorization': `Bearer ${token}`  // Include the token in the header
        },
      });
  
      dispatch({ type: 'SET_TODOS', payload: response.data });  // Dispatch todos to the state
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();  // Call fetchTodos on component mount
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
