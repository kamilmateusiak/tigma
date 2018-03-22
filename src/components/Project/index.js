import React from 'react';
import { Row, Col, Timeline } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const Project = ({project}) => {
	return (
		<div>
			<h1>{project.project_name}</h1>
			<h4>{project.project_number}</h4>
			<h5>{project.project_type}</h5>
			<Row>
				<Col span={18}>
					<h3>Timetracks in Feburary</h3>
					<p>{moment.duration(_.sumBy(project.users_time, 'time'), "milliseconds").format("h:mm", { trim: false })} h</p>
					<Timeline>
						{ project.users_time && project.users_time.map(user => (
							<Timeline.Item key={user.ID}>
								<p><b>{user.display_name}</b> {moment.duration(user.time, "milliseconds").format("h:mm", { trim: false })} h </p>
							</Timeline.Item>
						)) }
					</Timeline>
				</Col>
				{ project.project_phases.length > 0 && 
					<Col span={6}>
						<h3>Sprints</h3>
						<Timeline>
							{ _.reverse(_.takeRight(project.project_phases, 4)).map(phase => (
								<Timeline.Item key={phase.project_phase_id} color={phase.phase_state === 'active' ? 'green' : 'blue'}>
									<p><b>{phase.phase_name}</b> {moment.duration(phase.time, "milliseconds").format("h:mm", { trim: false })} h </p>
									<p>{new Date(phase.phase_start).toLocaleDateString()} - {new Date(phase.phase_end).toLocaleDateString()}</p>
								</Timeline.Item>
							)) }
						</Timeline>
					</Col>
				}
			</Row>
		</div>
	)
	
}

export default Project;

