import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../context/auth.context.jsx';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [current, setCurrent] = useState('home');

  const items = [
    {
      label: <Link to="/">Home Page</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated
      ? [{ label: <Link to="/user">Users</Link>, key: 'user', icon: <UsergroupAddOutlined /> }]
      : []),
    {
      label: `Welcome ${auth?.user?.email ?? ''}`,
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        ...(auth.isAuthenticated
          ? [{
              label: (
                <span onClick={() => {
                  localStorage.clear();
                  setAuth({ isAuthenticated: false, user: { email: '', name: '' } });
                  navigate('/');
                }}>
                  Đăng xuất
                </span>
              ),
              key: 'logout',
            }]
          : [{ label: <Link to="/login">Đăng nhập</Link>, key: 'login' }]),
      ],
    },
  ];

  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;