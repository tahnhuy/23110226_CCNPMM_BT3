import { useMemo, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { postResetPassword } from '../util/api.js';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenFromUrl = useMemo(
    () => searchParams.get('token') || '',
    [searchParams]
  );

  const [email, setEmail] = useState('');
  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await postResetPassword({
        email,
        token,
        newPassword,
      });
      if (res.data?.EC === 0) {
        setMessage(res.data?.EM || 'Đặt lại mật khẩu thành công.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(res.data?.EM || 'Thất bại');
      }
    } catch (err) {
      setError(
        err.response?.data?.EM ||
          err.response?.data?.message ||
          err.message ||
          'Lỗi mạng hoặc server.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Đặt lại mật khẩu</h2>
      {error && <p className="alert alert-error">{error}</p>}
      {message && <p className="alert alert-success">{message}</p>}
      <form className="form-stack" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Token (từ link email)
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </label>
        <label>
          Mật khẩu mới
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Đang lưu…' : 'Cập nhật mật khẩu'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}
