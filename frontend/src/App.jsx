import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/homepage";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signUp";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentDashboard from "./pages/Student/studentDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import Unauthorized from "./components/unauthorized";
import CourseDashboard from "./pages/Admin/CourseDashboard";
import Topics from "./components/Topics";
import Curriculum from "./pages/Student/Curriculum";
import EditQuiz from "./pages/Quiz/EditQuiz";
import AddQuestion from "./pages/Quiz/AddQuestion";
import ViewQuiz from "./pages/Quiz/ViewQuiz";
import AttemptQuiz from "./pages/Student/AttemptQuiz";
import QuizResult from "./pages/Student/QuizResult";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/adminDashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>}/>

        <Route path="/adminDashboard/courseDashboard/:courseId" element={<ProtectedRoute allowedRole="admin"><CourseDashboard /></ProtectedRoute>}/>
        
        <Route path="/studentDashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />

        <Route path="/Topics" element={<Topics />}/> 

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/curriculum/:courseId" element={<ProtectedRoute allowedRole="student"><Curriculum /></ProtectedRoute>} />

        <Route path="/quiz/:quizId/edit" element={<ProtectedRoute allowedRole="admin"><EditQuiz /></ProtectedRoute>} />

        <Route path="/quiz/:quizId/add-question" element={<ProtectedRoute allowedRole="admin"><AddQuestion /></ProtectedRoute>} />

        <Route path="/quiz/:quizId/view" element={<ProtectedRoute allowedRole="admin"><ViewQuiz /></ProtectedRoute>} />

        <Route path="/quiz/:quizId/attempt" element={<ProtectedRoute allowedRole="student"><AttemptQuiz /></ProtectedRoute>} />

        <Route path="/quiz/:quizId/result" element={<ProtectedRoute allowedRole="student"><QuizResult /></ProtectedRoute>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;