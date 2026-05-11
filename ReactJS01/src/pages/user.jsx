import { useEffect, useState } from 'react';
import { getUsers } from '../util/api.js';

export default function User() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getUsers();
        const data = Array.isArray(res.data) ? res.data : res.data?.data;
        if (!cancelled) setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) {
          setError(
            e.response?.data?.message ||
              e.message ||
              'Không tải được danh sách (cần JWT hợp lệ).'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Danh sách người dùng</h2>
      {loading && <p>Đang tải…</p>}
      {error && <p className="alert alert-error">{error}</p>}
      {!loading && !error && (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p>Không có dữ liệu.</p>}
        </div>
      )}
    </div>
  );
}
