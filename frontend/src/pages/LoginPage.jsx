// ─────────────────────────────────────────────
// LoginPage.jsx
// ─────────────────────────────────────────────
// Shows the "Sign in with Google" button.
// Clicking it goes to YOUR backend route /auth/google
// which then redirects to Google's login page.
//
// Flow from here:
//   Naren clicks → GET localhost:3000/auth/google
//   → passport redirects to Google
//   → Naren logs in on Google
//   → Google sends code to /auth/google/callback
//   → Backend creates JWT
//   → Redirects to /auth/success?token=...
// ─────────────────────────────────────────────

export default function LoginPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome</h1>
        <p style={styles.subtitle}>Sign in to continue to the app</p>

        {/* This href points to your BACKEND — not Google directly */}
        {/* Your backend will handle the Google redirect */}
        <a href="http://localhost:3000/auth/google" style={styles.link}>
          <button style={styles.button}>🔵 Sign in with Google</button>
        </a>
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
  },
  title: { fontSize: '28px', marginBottom: '8px' },
  subtitle: { color: '#666', marginBottom: '32px' },
  link: { textDecoration: 'none' },
  button: {
    padding: '12px 32px',
    fontSize: '16px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
