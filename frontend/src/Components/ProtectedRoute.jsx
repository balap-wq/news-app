import { useAuth } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <p className="text-gray-400 text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!user) {
    // saves where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
