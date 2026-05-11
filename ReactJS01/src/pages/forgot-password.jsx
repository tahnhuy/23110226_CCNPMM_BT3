import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postForgotPassword } from '../util/api.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await postForgotPassword({ email });
      const em = res.data?.EM;
      if (res.data?.EC === 0) {
        setMessage(em || 'Đã gửi email (nếu cấu hình SMTP đúng).');
      } else {
        setError(em || 'Yêu cầu thất bại');
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
      <h2 style={{ marginTop: 0 }}>Quên mật khẩu</h2>
      <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
        Nhập email đã đăng ký. Backend sẽ gửi link đặt lại mật khẩu (cần cấu hình Gmail trong
        Express).
      </p>
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
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Đang gửi…' : 'Gửi link'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/login">Quay lại đăng nhập</Link>
      </p>
    </div>
  );
}
