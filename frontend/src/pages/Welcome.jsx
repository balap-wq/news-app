import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Welcome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleEnter = () => {
    navigate('/headlines', { replace: true });
  };

  return (
    // Full screen overlay with blur
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal card */}
      <div
        className="bg-white rounded-3xl border border-gray-200 p-10 max-w-sm w-full mx-4 text-center shadow-2xl
                      animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)_both]"
      >
        {/* Avatar */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-linear-to-br from-violet-500 to-emerald-400 p-0.5">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            {user?.picture ? (
              <img
                src={user.picture}
                alt="avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-violet-600 text-2xl font-semibold">{initials}</span>
            )}
          </div>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Welcome, <span className="text-violet-600">{user?.name?.split(' ')[0]}! 👋</span>
        </h1>
        <p className="text-sm text-gray-400 mb-5">You are successfully signed in.</p>

        {/* Email pill */}
        <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          {user?.email}
        </div>

        {/* Enter app */}
        <button
          onClick={handleEnter}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-violet-600 text-white
                     hover:bg-violet-700 transition-colors mb-3 cursor-pointer"
        >
          Go to Headlines
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-500
                     border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Welcome;
