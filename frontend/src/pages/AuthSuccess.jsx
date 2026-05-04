import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('jwt', token);
      navigate('/headlines');
    } else {
      navigate('/');
    }
  }, []);

  return <p style={{ textAlign: 'center', marginTop: '40vh' }}>Logging you in...</p>;
}
