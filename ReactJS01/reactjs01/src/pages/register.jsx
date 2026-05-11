import React from 'react';
import {
  Button, Col, Divider, Form, Input, notification, Row,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { createUserApi } from '../util/api';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, password } = values;
    const res = await createUserApi(name, email, password);
    if (res && res.EC === 0) {
      notification.success({
        message: 'Đăng ký thành công',
        description: res.EM,
      });
      navigate('/login');
    } else {
      notification.error({
        message: 'Đăng ký thất bại',
        description: res?.EM ?? 'Có lỗi xảy ra',
      });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: '30px' }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{ padding: '15px', margin: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <legend>Đăng Ký Tài Khoản</legend>
          <Form name="register" onFinish={onFinish} autoComplete="off" layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }, { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng ký
              </Button>
            </Form.Item>
          </Form>

          <Link to="/"><ArrowLeftOutlined /> Quay lại trang chủ</Link>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default RegisterPage;