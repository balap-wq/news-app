import { useEffect, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'unreachable' }));
  }, []);

  return (
    <div className="app">
      <h1>News App</h1>
      <p>API Status: {health ? health.status : 'checking...'}</p>
    </div>
  );
}

export default App;
