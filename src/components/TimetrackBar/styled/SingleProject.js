import styled from 'styled-components';

const SingleProject = styled.div`
	padding: 5px;
	margin: 5px;
	cursor: pointer;
	color: ${props => props.active ? '#fff' : '#000'};
	background-color: ${props => props.active ? '#1890ff' : 'transparent'};
	border: 1px solid #1890ff;
`;

export default SingleProject;