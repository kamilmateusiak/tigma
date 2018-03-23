import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'
import SprintsListComponent from '../../components/SprintsList'
import Loader from '../../components/Loader';

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

const SPRINTS_QUERY = gql`
  {
    projectPhases(state: "active") {
		phase_name
		phase_start
		project {
			project_name
		}
		users_time {
			ID
			display_name
			time
		}
    }
  }
`;

export default graphql(SPRINTS_QUERY, {
    props: ({ data }) => ({...data})
})(SprintsList);
