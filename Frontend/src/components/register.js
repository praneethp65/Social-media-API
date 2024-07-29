import React from 'react';
import { Form, Input, Button } from 'antd';
//import { status, json } from '../utilities/requestHandlers'; 
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const emailRules = [
  { type: 'email', message: 'The input is not valid E-mail!' },
  { required: true, message: 'Please input your E-mail!' },
];

const passwordRules = [
  { required: true, message: 'Please input your password!' },
];

const confirmRules = [
  { 
    required: true, 
    message: 'Please confirm your password!' 
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The passwords that you entered do not match!'));
    },
  }),
];

const usernameRules = [
  { required: true, message: 'Please input your username!', whitespace: true },
];

/**
 * Registration form component for app signup.
 */
class RegistrationForm extends React.Component {
  onFinish = (values) => {
    console.log('Received values of form:', values);
    const { confirm, ...data } = values; 
    fetch('https://maydayclub-pressloyal-3001.codio-box.uk/api/v1/users', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(status)
    .then(json)
    .then((data) => {
      console.log(data);
      alert("Registration successful!");
    })
    .catch((error) => {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    });
  };

  render() {
    return (
      <Form {...formItemLayout} name="register" onFinish={this.onFinish}>
        <Form.Item name="email" label="E-mail" rules={emailRules}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={passwordRules}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="confirm" label="Confirm Password" rules={confirmRules}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="username" label="Username" rules={usernameRules}>
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

export default RegistrationForm;

function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return new Promise((resolve, reject) => {
        return reject(response);
      });
    }
}

function json(response) {
    return response.json();  // note this returns a promise
}
