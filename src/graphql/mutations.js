import gql from 'graphql-tag';

export const USER_LOGOUT = gql`
	mutation Logout {
		logout
	}
`;

export const USER_LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password)
	}
`;

export const TIMETRACK_STOP = gql`
	mutation TimetrackStop {
		stopTrack
	}
`;

export const TIMETRACK_START = gql`
	mutation TimetrackStart($description: String!, $project_id: Int!) {
		startTrack(description: $description, project_id: $project_id) {
			timetrack_id
			description
			start
			project_id
		}
	}
`;