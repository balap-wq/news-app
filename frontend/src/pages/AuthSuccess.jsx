import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────
// AuthSuccess.jsx
// ─────────────────────────────────────────────
// Backend redirects Naren here after creating JWT:
//   http://localhost:5173/auth/success?token=eyJhbGci...
//
// This page:
//   1. Reads the token from the URL query param
//   2. Saves it to localStorage
//   3. Redirects Naren to /dashboard
//
// Naren never sees this page — it runs instantly and redirects.
// ─────────────────────────────────────────────

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Read the URL: /auth/success?token=eyJhbGci...
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token'); // extract the JWT

    if (token) {
      // Save JWT — all future API calls will use this
      localStorage.setItem('jwt', token);

      // Redirect to the protected dashboard
      navigate('/dashboard');
    } else {
      // No token — something went wrong — back to login
      navigate('/');
    }
  }, []);

  return <p style={{ textAlign: 'center', marginTop: '40vh' }}>Logging you in...</p>;
}
