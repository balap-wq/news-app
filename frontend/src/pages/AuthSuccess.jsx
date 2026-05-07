import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function AuthSuccess() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    fetch(`/auth/me`, {
      credentials: 'include',
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          navigate('/welcome', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      })
      .catch(() => navigate('/login', { replace: true }));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e]">
      <p className="text-white/40 text-sm animate-pulse">Signing you in...</p>
    </div>
  );
}
