// src/pages/Welcome.jsx
import { useNavigate } from 'react-router-dom';
import useAuth  from '../pages/AuthCallback';

const Welcome = ({
  
  slogan = 'Build something great today.',
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : '?';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-3xl border border-gray-200 p-10 max-w-sm w-full text-center shadow-2xl animate-[popIn_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]">

        {/* Avatar */}
        <div className="w-24 h-24 mx-auto mb-5 rounded-full p-0.75 bg-linear-to-br from-violet-500 to-emerald-400 animate-pulse">
          <div className="w-full h-full rounded-full bg-violet-100 flex items-center justify-center overflow-hidden border-2 border-white">
            {user?.picture ? (
              <img
                src={user.picture}
                alt="avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-violet-600 text-2xl font-semibold">
                {initials}
              </span>
            )}
          </div>
        </div>

        {/* Name + Slogan */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-1 animate-[fadeUp_0.5s_0.25s_both]">
          Welcome back,{' '}
          <em className="text-violet-600 not-italic font-bold">
            {user?.name?.split(' ')[0]}! 😄
          </em>
        </h1>
        <p className="text-sm text-gray-400 mb-5 animate-[fadeUp_0.5s_0.35s_both]">
          {slogan}
        </p>

        {/* Email pill */}
        <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-800 text-sm font-medium px-4 py-2 rounded-full mb-6 animate-[slideIn_0.5s_0.45s_both]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          {user?.email}
        </div>

        {/* Open button */}
        <div className="mb-3">
          <button
            onClick={() => navigate('/')}
            className="relative w-full py-2.5 rounded-xl font-medium cursor-pointer bg-emerald-300 text-gray-800 overflow-hidden group transition-colors duration-300 hover:text-white"
          >
            <span className="absolute inset-0 bg-linear-to-tr from-violet-500 to-emerald-500 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative z-10 text-sm">Open</span>
          </button>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Sign out
        </button>

      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Welcome;