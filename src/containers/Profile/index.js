import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Loader from 'components/Loader';
import { PROFILE_USER_QUERY } from 'graphql/queries';

class Project extends Component {
	render () {
    	const { loading, user } = this.props;
		if (loading) {
			return <Loader />;
    	}
		return (
			<div>{user.display_name}</div>
		)
	}
}

export default graphql(PROFILE_USER_QUERY, {
    options: (ownProps) => ({
      variables: { id: ownProps.match.params.id }
    }),
    props: ({ data }) => ({...data})
})(Project);
