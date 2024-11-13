import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ dispatch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty todos

    const token = localStorage.getItem("authToken"); // Get the token from localStorage
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/todos", 
        { description: input },
        {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the header
          }
        }
      );
      dispatch({ type: "ADD_TODO", payload: response.data }); // Dispatch the new todo to the state
      setInput(""); // Clear input after submitting
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="table-like-row">
        <div className="circle add-circle">+</div>
        <input
          type="text"
          className="form-control todo-input"
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary add-todo-btn" type="submit">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;
