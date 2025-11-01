import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
