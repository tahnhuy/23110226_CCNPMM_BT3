import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { postLogin, postRegister, getAccount } from '../../util/api.js';

const AuthContext = createContext(null);

const TOKEN_KEY = 'access_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await postLogin({ email, password });
    const accessToken = res.data?.access_token;
    if (!accessToken) {
      throw new Error(res.data?.EM || 'Đăng nhập thất bại');
    }
    localStorage.setItem(TOKEN_KEY, accessToken);
    setToken(accessToken);
    const u = res.data?.user;
    setUser(u || { email });
    return res.data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const res = await postRegister({ name, email, password });
    if (res.data?.EC !== 0) {
      throw new Error(res.data?.EM || 'Đăng ký thất bại');
    }
    return res.data;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) return null;
    try {
      const res = await getAccount();
      setUser(res.data);
      return res.data;
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  const value = useMemo(
    () => ({
      token,
      user,
      setUser,
      login,
      logout,
      register,
      refreshProfile,
    }),
    [token, user, login, logout, register, refreshProfile]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
