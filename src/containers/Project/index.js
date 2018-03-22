import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Spin } from 'antd';
import ProjectComponent from '../../components/Project';

class Project extends Component {
	render () {
    const { loading, project } = this.props;
		if (loading) {
			return <Spin size="large" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>;
    }
    console.log(project)
		return <ProjectComponent project={project} />
	}
}

const PROJECT_QUERY = gql`
  query ProjectQuery($project_slug: String!) {
    project(project_slug: $project_slug) {
			project_name
      project_type
      project_number
      project_phases {
        project_phase_id
        phase_name
        phase_start
        phase_end
        phase_state
        time 
      }
      users_time {
        ID
        display_name
        time
      }
    }
  }
`;

export default graphql(PROJECT_QUERY, {
    options: (ownProps) => ({
      variables: { project_slug: ownProps.match.params.slug }
    }),
    props: ({ data }) => ({...data})
})(Project);
