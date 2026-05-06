import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Still hydrating from /auth/me — don't redirect yet
  if (user === undefined) return null;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
