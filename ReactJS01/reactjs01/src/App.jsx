import { Outlet } from 'react-router-dom';
import Header from './components/layout/header.jsx';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context.jsx';
import { getAccountApi } from './util/api.js';

function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          return;
        }
        const res = await getAccountApi();
        if (res?.email) {
          setAuth({ isAuthenticated: true, user: { email: res.email, name: res.name ?? '' } });
        } else if (res?.message) {
          localStorage.removeItem('access_token');
        }
      } catch {
        localStorage.removeItem('access_token');
      }
    };
    fetchAccount();
  }, [setAuth]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
