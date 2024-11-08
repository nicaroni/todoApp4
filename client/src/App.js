import TodoApp from './components/TodoApp';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import SignUp from './components/signUp/LoginSignUp';
import './index.scss';

function App() {
  return (
   <Router>
      <Routes>
      <Route path="/" element={<SignUp />} /> 
        <Route path="/todos" element={<TodoApp />} /> 
      </Routes>
   </Router>
  );
}


export default App;
