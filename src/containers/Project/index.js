import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Loader from 'components/Loader';
import ProjectComponent from 'components/Project';
import { PROJECT_QUERY } from 'graphql/queries';

class Project extends Component {
	render () {
    const { loading, project } = this.props;
		if (loading) {
			return <Loader />;
    }
		return <ProjectComponent project={project} />
	}
}

export default graphql(PROJECT_QUERY, {
    options: (ownProps) => ({
      variables: { project_slug: ownProps.match.params.slug }
    }),
    props: ({ data }) => ({...data})
})(Project);
