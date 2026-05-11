import React, { useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Result } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import { forgotPasswordApi } from '../util/api';

const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await forgotPasswordApi(values.email);
    setLoading(false);
    if (res && res.EC === 0) {
      setSubmitted(true);
    } else {
      notification.error({
        message: 'Thất bại',
        description: res?.EM ?? 'Có lỗi xảy ra',
      });
    }
  };

  if (submitted) {
    return (
      <Row justify="center" style={{ marginTop: '50px' }}>
        <Col xs={24} md={16} lg={10}>
          <Result
            status="success"
            icon={<MailOutlined style={{ color: '#52c41a' }} />}
            title="Email đã được gửi!"
            subTitle="Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu. Link có hiệu lực trong 15 phút."
            extra={<Link to="/login"><Button type="primary">Quay lại Đăng nhập</Button></Link>}
          />
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center" style={{ marginTop: '30px' }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{ padding: '15px', margin: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <legend>Quên Mật Khẩu</legend>
          <p style={{ marginBottom: '15px', color: '#666' }}>
            Nhập email đăng ký của bạn. Chúng tôi sẽ gửi link đặt lại mật khẩu.
          </p>
          <Form name="forgot" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="example@email.com" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Gửi link đặt lại mật khẩu
              </Button>
            </Form.Item>
          </Form>

          <Link to="/login"><ArrowLeftOutlined /> Quay lại Đăng nhập</Link>
        </fieldset>
      </Col>
    </Row>
  );
};

export default ForgotPasswordPage;