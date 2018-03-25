import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row } from 'antd';

const FormItem = Form.Item;

const LoginForm = (props) => {
	const { handleSubmit, loading, submitError, form: { getFieldDecorator, validateFields } } = props;

	const onSubmit = (e) => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				handleSubmit(values);
			}
		})
	}

	return (
		<Form onSubmit={onSubmit} className="login-form" style={{minWidth: '400px', boxShadow: '0 0 3px 1px rgb(9, 79, 146)', padding: '20px', backgroundColor: '#fff'}}>
			<FormItem>
				{getFieldDecorator('email', { rules: [{ required: true, message: 'Please input your email!' }] })(
					<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
				)}
			</FormItem>
			<FormItem>
				{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your Password!' }]})(
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
				
				<p style={{color: '#f5222d'}}>{submitError}</p>
				<Row type="flex" justify="center" align="middle" style={{ minHeight: '100px' }}>
					<Button loading={loading} type="primary" htmlType="submit" className="login-form-button" style={{minWidth: '120px'}}>
						{ !loading && 'Log in'}
					</Button>
				</Row>
				
				<Row type="flex" justify="space-between">
					<a href="">Register</a>
					<a href="">Forgot password</a>
				</Row>
			</FormItem>
		</Form>	
	);
};

export default Form.create()(LoginForm);
