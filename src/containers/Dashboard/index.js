import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import DashboardComponent from 'components/Dashboard';
import Loader from 'components/Loader';
import { SUMMARY_QUERY } from 'graphql/queries';

class Dashboard extends Component {
	render () {
		const { loading, summary } = this.props;
		if (loading) {
			return <Loader />;
		}

		return ( 
			<DashboardComponent summary={summary} />
		);
	}
}

export default graphql(SUMMARY_QUERY, {
    props: ({ data }) => ({...data})
})(Dashboard);
