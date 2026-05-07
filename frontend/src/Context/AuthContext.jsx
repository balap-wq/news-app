import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined = loading, null = logged out

  useEffect(() => {
    fetch(`/auth/me`, {
      credentials: 'include',
    })
      .then((r) => {
        if (r.status === 401) return null; // expected — no user logged in
        if (!r.ok) return null;
        return r.json();
      })
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  const logout = () => {
    fetch(`/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => setUser(null));
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
