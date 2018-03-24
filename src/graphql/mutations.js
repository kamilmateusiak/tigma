import gql from 'graphql-tag';

export const USER_LOGOUT = gql`
	mutation {
		logout
	}
`;

export const USER_LOGIN = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password)
	}
`;