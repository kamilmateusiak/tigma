import React from 'react';
import { Input, Icon, Col, Row } from 'antd';
import styled from 'styled-components';
const InputGroup = Input.Group;

const StyledInput = styled(Input)`
	box-shadow: 0 0 3px 1px rgb(9, 79, 146);
	border: none;
	border-radius: 0;
	height: 40px;
`;

const TrackInfo = styled.div`
	box-shadow: 0 0 3px 1px rgb(9, 79, 146);
	height: 40px;
`;

const Timer = styled.div`
	font-size: 14px;
	line-height: 18px;
	padding: 10px;
	display: inline-block;
	font-weight: 700;
`;

const TimerIcon = styled(Icon)`
	font-size: 30px;
	line-height: 40px;
	color: #1890ff;
	cursor: pointer;
	opacity: 0.65;
	transition: .3s opacity ease-in-out;
	&:hover {
		opacity: 1;
		transition: .3s opacity ease-in-out;
	}
`;

const TimetrackBar = ({currentTrack, trackDuration, trackDescription, changeDescription}) => {
	if(currentTrack) { 
		return (
			<div>
				<InputGroup compact>
					<Col span={20}>
						<StyledInput onChange={changeDescription} value={trackDescription} defaultValue="track track track" />
					</Col>
					<Col span={4}>
						<TrackInfo>
							<Row>
								<Col span={12} style={{textAlign: 'center'}}>
									<Timer>{trackDuration}</Timer>
								</Col>
								<Col span={6}>
									<TimerIcon type="retweet" />
								</Col>
								<Col span={6}>
									<TimerIcon type="pause-circle" />
								</Col>
							</Row>
						</TrackInfo>
					</Col>
				</InputGroup>
			</div> 
		)
	}
	return null;
}

export default TimetrackBar;

