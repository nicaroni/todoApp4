import React, { useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList = ({ todos, dispatch }) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);


  // Function to toggle the visibility of the completed tasks table
const toggleCompletedTasks = () => {
  setShowCompleted(prev => !prev)
}

  return (
    <div className="todo-list">
      <table className="table table-borderless main-todo-table">
        <thead>
          <tr>
            
            <th className="todo-header">Description</th>
          </tr>
        </thead>
        <tbody>
          {uncompletedTodos.map((todo) => (
            <TodoItem key={todo.todo_id} todo={todo} dispatch={dispatch} />
          ))}
          {/* Add the form as the last item */}
          <tr className="todo-form-row">
            <td className="td-input" colSpan="2">
              <TodoForm dispatch={dispatch} />
            </td>
          </tr>
        </tbody>
      </table>


<button onClick={toggleCompletedTasks} className="btn btn-secondary m-3" >
  {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks" }
</button>
       {showCompleted && completedTodos.length > 0 && (
        <div className="completed-todos">
          <h3>Completed Tasks</h3>
          <table className="table table-dark table-striped">
            <tbody className="completed-table-body">
              {completedTodos.map((todo) => (
                <TodoItem key={todo.todo_id} todo={todo} dispatch={dispatch} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TodoList;