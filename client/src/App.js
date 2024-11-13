import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TodoApp from './components/TodoApp';
import './index.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<TodoApp />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
