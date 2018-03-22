import React from 'react';
import { Input, Icon, Col } from 'antd';
const InputGroup = Input.Group;

const Home = ({currentTrack, trackDuration, trackDescription, changeDescription}) => {
	return (
		<div style={{maxWidth: '960px'}}>
			<h1 style={{margin: '0 auto', 'textAlign': 'center'}}>Tigma</h1>
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
		</div>
	)
}

export default Home;

