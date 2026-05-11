import { createContext, useState } from 'react';

const defaultAuth = { isAuthenticated: false, user: { email: '', name: '' } };

export const AuthContext = createContext({
  auth: defaultAuth,
  setAuth: () => {},
  appLoading: false,
  setAppLoading: () => {},
});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState(defaultAuth);
  const [appLoading, setAppLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
