import React, { useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Result } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPasswordApi } from '../util/api';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      notification.error({ message: 'Mật khẩu xác nhận không khớp!' });
      return;
    }
    setLoading(true);
    const res = await resetPasswordApi(email, token, values.newPassword);
    setLoading(false);
    if (res && res.EC === 0) {
      setSuccess(true);
    } else {
      notification.error({ message: 'Thất bại', description: res?.EM });
    }
  };

  if (!token || !email) {
    return (
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col>
          <Result status="error" title="Link không hợp lệ" extra={<Link to="/forgot-password"><Button type="primary">Yêu cầu lại</Button></Link>} />
        </Col>
      </Row>
    );
  }

  if (success) {
    return (
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col>
          <Result status="success" title="Đặt lại mật khẩu thành công!" extra={<Link to="/login"><Button type="primary">Đăng nhập ngay</Button></Link>} />
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center" style={{ marginTop: '30px' }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{ padding: '15px', margin: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <legend>Đặt Lại Mật Khẩu</legend>
          <Form name="reset" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }, { min: 6, message: 'Tối thiểu 6 ký tự' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Xác nhận đặt lại
              </Button>
            </Form.Item>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;