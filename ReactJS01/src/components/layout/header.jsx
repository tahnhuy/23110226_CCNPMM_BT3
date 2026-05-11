import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth.context.jsx';

const linkStyle = ({ isActive }) => ({
  fontWeight: isActive ? 700 : 500,
  color: isActive ? '#1677ff' : '#334155',
});

export default function Header() {
  const { token, user, logout } = useAuth();

  return (
    <header
      style={{
        borderBottom: '1px solid #e2e8f0',
        background: '#fff',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/" style={{ fontWeight: 800, color: '#0f172a' }}>
          FullStack MySQL
        </Link>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <NavLink to="/" style={linkStyle} end>
            Trang chủ
          </NavLink>
          {token ? (
            <>
              <NavLink to="/users" style={linkStyle}>
                Người dùng
              </NavLink>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                {user?.email || user?.name}
              </span>
              <button type="button" className="btn btn-secondary" onClick={logout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" style={linkStyle}>
                Đăng nhập
              </NavLink>
              <NavLink to="/register" style={linkStyle}>
                Đăng ký
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
