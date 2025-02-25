import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TaskBoard from "./pages/TaskBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<TaskBoard />} />
      </Routes>
    </Router>
  );
}

export default App;