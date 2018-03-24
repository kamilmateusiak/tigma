import React, { Fragment } from 'react';
import { Input, Icon, Col } from 'antd';
import styled from 'styled-components';
const InputGroup = Input.Group;

const AppTitle = styled.h1`
	margin: 0 auto;
	text-align: center;
`;

const Dashboard = ({currentTrack, trackDuration, trackDescription, changeDescription, summary}) => {
	return (
		<Fragment>
			<AppTitle>Tigma</AppTitle>
			{ currentTrack && 
				<div>
					<h3>Current: </h3>
					<InputGroup compact>
						<Col span={10}>
							<Input onChange={changeDescription} value={trackDescription} defaultValue="track track track" />
						</Col>
						<Col span={4}>
							{trackDuration} h
							<Icon type="setting" />
						</Col>
					</InputGroup>
				</div> 
			}
			<div>Summary this month: {summary}</div>
		</Fragment>
	)
}

export default Dashboard;

