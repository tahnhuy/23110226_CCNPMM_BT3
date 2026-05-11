import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/auth.context.jsx';

export default function Register() {
  const { register, token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await register(name, email, password);
      setSuccess('Đăng ký thành công. Bạn có thể đăng nhập.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      const msg =
        err.response?.data?.EM || err.message || 'Đăng ký thất bại';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Đăng ký</h2>
      {error && <p className="alert alert-error">{error}</p>}
      {success && <p className="alert alert-success">{success}</p>}
      <form className="form-stack" onSubmit={handleSubmit}>
        <label>
          Họ tên
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Mật khẩu
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Đang xử lý…' : 'Đăng ký'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        <Link to="/login">Đã có tài khoản?</Link>
      </p>
    </div>
  );
}
