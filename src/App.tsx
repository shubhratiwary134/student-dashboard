import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
