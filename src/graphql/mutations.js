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