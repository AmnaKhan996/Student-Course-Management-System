import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/homepage";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signUp";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentDashboard from "./pages/Student/studentDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import Unauthorized from "./components/unauthorized";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/adminDashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        
        <Route path="/studentDashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />

        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;