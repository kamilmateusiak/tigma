import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Spin } from 'antd';

class Project extends Component {
	render () {
    	const { loading, user } = this.props;
		if (loading) {
			return <Spin size="large" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>;
    	}
		return (
			<div>{user.display_name}</div>
		)
	}
}

const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
		ID
		display_name
		user_email
    }
  }
`;

export default graphql(USER_QUERY, {
    options: (ownProps) => ({
      variables: { id: ownProps.match.params.id }
    }),
    props: ({ data }) => ({...data})
})(Project);
