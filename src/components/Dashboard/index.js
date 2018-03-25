import React, { Fragment } from 'react';
import { Row, Progress } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import TimetrackBar from 'containers/TimetrackBar';

momentDurationFormatSetup(moment);

const WORK_HOURS_MONTH = 168;
const WORK_HOURS_DAY = 8;
const MILLISEC_MONTH = WORK_HOURS_MONTH * 60 * 60 * 1000;
const MILLISEC_DAY = WORK_HOURS_DAY * 60 * 60 * 1000;

// const AppTitle = styled.h1`
// 	margin: 0 auto;
// 	text-align: center;
// 	color: #1890ff;
// 	text-transform: uppercase;
// `;

const Tile = styled.div`
	box-shadow: 0 0 3px 1px rgb(9, 79, 146);
	padding: 32px;
	margin: 8px 0;
	width: ${props => props.width || '100%'};
	background-color: #fff;
`;

const SummaryItem = styled.div`
	margin: 5px 0;
	padding: 5px 0;
	border-bottom: 1px solid rgb(9, 79, 146);
	display: flex;
	justify-content: space-between;
`;

const Dashboard = ({summary}) => {
	const formatedSummary = {
		time_month: moment.duration(summary.time_month, "milliseconds").format("h:mm", { trim: false }),
		time_day: moment.duration(summary.time_day, "milliseconds").format("h:mm", { trim: false })
	};

	const PERCENT_MONTH = Math.round(summary.time_month/MILLISEC_MONTH * 100, 2);
	const PERCENT_DAY = Math.round(summary.time_day/MILLISEC_DAY * 100, 2);

	return (
		<Fragment>
			<Tile>
				<TimetrackBar />
			</Tile>
			<Row>
				<Tile width='30%'>
					<h3>SUMMARY</h3>
					<h4>month:</h4>
					<SummaryItem>{formatedSummary.time_month} <Progress type="circle" percent={PERCENT_MONTH} width={35} /></SummaryItem>
					<h4>day:</h4>
					<SummaryItem>{formatedSummary.time_day} <Progress type="circle" percent={PERCENT_DAY} width={35} /></SummaryItem> 
				</Tile>
			</Row>
			
		</Fragment>
	)
}

export default Dashboard;

