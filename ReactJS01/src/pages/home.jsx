import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHello } from '../util/api.js';
import { useAuth } from '../components/context/auth.context.jsx';

export default function Home() {
  const { token, refreshProfile } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getHello();
        if (!cancelled) setMessage(res.data?.message || JSON.stringify(res.data));
      } catch (e) {
        if (!cancelled) {
          setError(
            e.response?.data?.message ||
              e.message ||
              'Không gọi được API. Hãy chạy backend Express (port 8080).'
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (token) {
      refreshProfile();
    }
  }, [token, refreshProfile]);

  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>React + Express API</h1>
      <p>
        Frontend gọi backend tại{' '}
        <code>{import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'}</code>
        .
      </p>
      {message && (
        <p className="alert alert-success" style={{ marginTop: '1rem' }}>
          API GET /: <strong>{message}</strong>
        </p>
      )}
      {error && (
        <p className="alert alert-error" style={{ marginTop: '1rem' }}>
          {error}
        </p>
      )}
      <p style={{ marginTop: '1.5rem' }}>
        {!token ? (
          <>
            <Link to="/login">Đăng nhập</Link> hoặc <Link to="/register">đăng ký</Link> để xem
            danh sách người dùng.
          </>
        ) : (
          <Link to="/users">Xem danh sách người dùng</Link>
        )}
      </p>
    </div>
  );
}
