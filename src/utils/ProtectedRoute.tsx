import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../helpers/storageHelpers';

interface ProtectedRouteProps {
  role: 'student' | 'admin';
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const user = getCurrentUser();
  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
