import React, { useContext } from 'react';
import {
  Button, Col, Divider, Form, Input, notification, Row,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { loginApi } from '../util/api';
import { AuthContext } from '../components/context/auth.context.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);
    if (res && res.EC === 0) {
      localStorage.setItem('access_token', res.access_token);
      setAuth({ isAuthenticated: true, user: { email: res?.user?.email, name: res?.user?.name } });
      notification.success({ message: 'Đăng nhập thành công' });
      navigate('/');
    } else {
      notification.error({
        message: 'Đăng nhập thất bại',
        description: res?.EM ?? 'error',
      });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: '30px' }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{ padding: '15px', margin: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <legend>Đăng Nhập</legend>
          <Form name="login" onFinish={onFinish} autoComplete="off" layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>

          <Link to="/"><ArrowLeftOutlined /> Quay lại trang chủ</Link>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            Quên mật khẩu? <Link to="/forgot-password">Khôi phục tại đây</Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;