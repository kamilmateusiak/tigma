import gql from 'graphql-tag';

export const SPRINTS_QUERY = gql`
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

export const PROJECT_QUERY = gql`
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

export const PROFILE_USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
		ID
		display_name
		user_email
    }
  }
`;

export const LOGGED_USER_QUERY = gql`
  	query {
    	me {
			ID
      		display_name
			projects {
        		project_id
				project_name
				project_slug
				project_type
				project_status
			}
    	}
  	}
`;

export const CURRENT_TRACK_QUERY = gql`
  query CurrentTrackQuery {
    currentTrack {
		description
		start
		stop
	}
  }
`;