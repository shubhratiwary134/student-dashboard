import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  role: 'student' | 'admin';
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const storedRole = localStorage.getItem('role');
  if (storedRole !== role) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
