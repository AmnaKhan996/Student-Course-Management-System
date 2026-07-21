import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/homepage";
import Login from "./Auth/login";
import Signup from "./Auth/signUp";
import AdminDashboard from "./Admin/AdminDashboard";
import StudentDashboard from "./Student/studentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/adminDashboard" element={<AdminDashboard />} />
        
        <Route path="/studentDashboard" element={<StudentDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;