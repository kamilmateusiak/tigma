import React, { Fragment } from 'react';
import { Input, Col, Row, Button } from 'antd';
import { StyledInput, TrackInfo, TimerIcon, Timer, ProjectsWrapper, SingleProject } from 'components/TimetrackBar/styled/index.js';

const InputGroup = Input.Group;

const TimetrackBar = (props) => {
	const { 
		currentTrack,
		trackDuration,
		trackDescription,
		changeDescription,
		stopTrack,
		startTrack,
		projects,
		toggleProjectsVisibility,
		projectsVisibility,
		selectProject,
		project_id
	} = props;

	return (
		<div>
			<InputGroup compact>
				<Col span={20}>
					<StyledInput onChange={changeDescription} value={trackDescription} defaultValue="track track track" />
				</Col>
				<Col span={4}>
					<TrackInfo>
						<Row>
							{ currentTrack
								? <Fragment>
									<Col span={12} style={{textAlign: 'center'}}>
										<Timer>{trackDuration}</Timer>
									</Col>
									<Col span={6}>
										<TimerIcon type="retweet"  disabled={trackDescription === '' || project_id === null}/>
									</Col>
									<Col span={6}>
										<TimerIcon type="pause-circle" disabled={trackDescription === '' || project_id === null} onClick={stopTrack} />
									</Col>
								</Fragment>
								: <Col span={24} style={{textAlign: 'center'}}>
									<TimerIcon type="play-circle" disabled={trackDescription === '' || project_id === null} onClick={startTrack} />
								</Col>
							}
						</Row>
					</TrackInfo>
				</Col>
			</InputGroup>
			{ projectsVisibility &&
				<ProjectsWrapper>
					{ projects && projects.map((project) => (
						<SingleProject active={project.project_id === project_id} 
							title={project.project_name}
							onClick={() => selectProject(project.project_id)}
							key={project.project_id}
						>
							{project.project_number}
						</SingleProject>
					))}

				</ProjectsWrapper>
			}
			<div style={{textAlign: 'center', margin: '20px 0 0'}}>
				<Button type="primary" htmlType="button" style={{minWidth: '120px'}} onClick={toggleProjectsVisibility}>
					{projectsVisibility ? 'Hide projects' : 'Show projects'}
				</Button>
			</div> 
		</div>
	)
}

export default TimetrackBar;

