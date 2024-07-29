import React from 'react';
import { Form, Input, Button } from 'antd';

class LoginForm extends React.Component {
  onFinish = (values) => {
    console.log('Received values of login form:', values);
    // Handle login logic here
  };

  render() {
    return (
      <Form {...formItemLayout} name="login" onFinish={this.onFinish}>
        <Form.Item name="username" label="Username" rules={usernameRules}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={passwordRules}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const usernameRules = [
  { required: true, message: 'Please input your username!', whitespace: true },
];

const passwordRules = [
  { required: true, message: 'Please input your password!' },
];


const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

export default LoginForm;
