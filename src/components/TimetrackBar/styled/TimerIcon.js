import { Icon } from 'antd';
import styled from 'styled-components';

const TimerIcon = styled(Icon)`
	font-size: 30px;
	line-height: 40px;
	color: ${props => props.disabled ? '#ccc' : '#1890ff'};
	cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
	opacity: 0.65;
	transition: .3s opacity ease-in-out;
	&:hover {
		opacity: 1;
		transition: .3s opacity ease-in-out;
	}
`;

export default TimerIcon;