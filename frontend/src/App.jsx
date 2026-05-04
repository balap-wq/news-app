// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import AuthCallback from './pages/AuthCallback';
import Welcome from './pages/Welcome';
// import Login from './pages/Login'; // your teammate's page

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Protected */}
        <Route path="/welcome" element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;