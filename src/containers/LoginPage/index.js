import React, { Component } from 'react';
import { Row } from 'antd';
import { graphql } from 'react-apollo';
import LoginForm from 'components/LoginForm';
import { USER_LOGIN } from 'graphql/mutations';

class LoginPage extends Component {
  state = {
    loading: false,
    formError: null
  }

  handleSubmit = async (formData) => {
    this.setState({ loading: true, formError: null });
    await setTimeout(async () => {
      try {
        await this.props.mutate({ variables: formData });
        this.setState({ loading: false })
        window.location.reload(); 
      } catch(err) {
        this.setState({ loading: false, formError: 'Wrong email or password!' })
        console.log(err);
      }
    }, 1000);
  }

  render() {
    return (
      <Row type="flex" justify="center" direction="column" align="middle" style={{ height: '100vh' }}>
        <div>
          <h1>Tigma</h1>
          <LoginForm handleSubmit={this.handleSubmit} loading={this.state.loading} submitError={this.state.formError} />
        </div>
      </Row>
    );
  }
}

export default graphql(USER_LOGIN)(LoginPage);
