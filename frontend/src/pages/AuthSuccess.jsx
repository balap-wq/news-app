import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/headlines');
  }, [navigate]);

  return <p style={{ textAlign: 'center', marginTop: '40vh' }}>Logging you in...</p>;
}
