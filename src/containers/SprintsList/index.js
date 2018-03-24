import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import SprintsListComponent from 'components/SprintsList';
import Loader from 'components/Loader';
import { SPRINTS_QUERY } from 'graphql/queries';

class SprintsList extends Component {
	render () {
		const { loading, projectPhases } = this.props;
		if (loading) {
			return <Loader />;
		}

		const orderedPhases = _.orderBy(projectPhases, 'phase_start', 'desc');
		return <SprintsListComponent projectPhases={orderedPhases} />
	}
}

export default graphql(SPRINTS_QUERY, {
    props: ({ data }) => ({...data})
})(SprintsList);
