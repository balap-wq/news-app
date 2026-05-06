import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate('/login?error=auth_failed', { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      Cookies.set('token', token, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });
      setUser(decoded);
      navigate('/welcome', { replace: true });
    } catch {
      navigate('/login?error=invalid_token', { replace: true });
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Signing you in...</p>
      </div>
    </>
  );
};

export default AuthCallback;
