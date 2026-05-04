import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────
// Dashboard.jsx
// ─────────────────────────────────────────────
// Protected page — only accessible if Naren has a JWT.
//
// On load it calls GET /api/dashboard on the backend,
// sending the stored JWT in the Authorization header.
//
// Backend middleware (verifyToken.js) checks:
//   1. Is there a token?
//   2. Is the signature valid?
//   3. Has it expired?
//
// If all pass → returns Naren's user data.
// If fail → 401 → redirect to login.
// ─────────────────────────────────────────────

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      // No JWT stored — not logged in
      navigate('/');
      return;
    }

    // Call protected backend route
    // Send JWT in Authorization header — NOT in URL
    fetch('http://localhost:3000/api/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`, // ← JWT travels here
      },
    })
      .then((res) => {
        if (res.status === 401) {
          // Token invalid or expired — clear and go to login
          localStorage.removeItem('jwt');
          navigate('/');
        }
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => setError('Something went wrong'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // delete the JWT
    navigate('/'); // back to login
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p style={{ textAlign: 'center', marginTop: '40vh' }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.welcome}>
          Welcome, <strong>{user.name}</strong>!
        </p>
        <p style={styles.email}>📧 {user.email}</p>
        <p style={styles.id}>🔑 Google ID: {user.id}</p>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  card: {
    background: 'white',
    padding: '48px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
    minWidth: '320px',
  },
  title: { fontSize: '28px', marginBottom: '24px' },
  welcome: { fontSize: '18px', marginBottom: '8px' },
  email: { color: '#555', marginBottom: '8px' },
  id: { color: '#888', fontSize: '13px', marginBottom: '32px' },
  logout: {
    padding: '10px 24px',
    fontSize: '14px',
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
