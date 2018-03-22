import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'
import SprintsListComponent from '../../components/SprintsList'
import { Spin } from 'antd';

class SprintsList extends Component {
	render () {
		const { loading, projectPhases } = this.props;
		if (loading) {
			return <Spin size="large" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>;
		}

		return <SprintsListComponent projectPhases={_.orderBy(projectPhases, 'phase_start', 'desc')} />
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
			# timetracks {
			# 	timetrack_id
			# 	description
			# 	user {
			# 		ID
			# 	}
			# }
			users_time {
				ID
				display_name
				time
			}
			# tasks {
			# 	title
			# 	task_id
			# 	user {
			# 		display_name
			# 		ID
			# 	}
			# }
    }
  }
`

export default graphql(SPRINTS_QUERY, {
    props: ({ data }) => ({...data})
})(SprintsList);
