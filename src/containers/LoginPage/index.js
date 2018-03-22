import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Row } from 'antd';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
const FormItem = Form.Item;

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        await this.props.mutate({
          variables: values,
        });
        window.location.reload();
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center" direction="column" align="middle" style={{minHeight: '100vh'}}>
        <div>
          <h1>Tigma</h1>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{maxWidth: '300px'}}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </div>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
// export default WrappedNormalLoginForm;

const mutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default graphql(mutation)(WrappedNormalLoginForm);