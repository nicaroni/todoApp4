import React, { useState } from "react";
import axios from "axios";

const TodoItem = ({ todo, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(todo.description);

  const handleComplete = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:5000/todos/${todo.todo_id}`, updatedTodo);
      dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };


    // Define handleDelete function to remove the todo
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:5000/todos/${todo.todo_id}`);
        dispatch({ type: "DELETE_TODO", payload: todo.todo_id });
      } catch (err) {
        console.error("Error deleting todo:", err);
      }
    };

    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
      <tr className={`todo-item-row ${todo.completed ? "completed" : ""}`}>
        <td className="circle" onClick={handleComplete}>
          {todo.completed ? "✓" : ""}
        </td>
        <td className="todo-date">{formatDate(todo.created_at)}</td>
        <td className="todo-description">
          {isEditing ? (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch({
                    type: "UPDATE_TODO",
                    payload: { ...todo, description: input },
                  });
                  setIsEditing(false);
                }
              }}
              className="form-control"
            />
          ) : (
            <span onClick={() => setIsEditing(true)}>{todo.description}</span>
          )}
        </td>
        <td className="delete-btn-cell">
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  };
  

export default TodoItem;
