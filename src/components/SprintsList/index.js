import React from 'react';
import ReactTable from 'react-table'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const SprintsList = ({projectPhases}) => {
	const columns = [
		{
			Header: 'Sprint',
			accessor: 'phase_name' // String-based value accessors!
		}, {
			id: 'project_name', // Required because our accessor is not a string
			Header: 'Project',
			accessor: sprint => sprint.project.project_name // Custom value accessors!
		}, {
			id: 'users_time',
			Header: 'Users',
			accessor: sprint => sprint.users_time,
			Cell: row => {
				return (
					<div>
						{row.row.users_time.map((time) => (
							<div key={time.ID}>
								[<b>{time.display_name}</b>] - {moment.duration(time.time, "milliseconds").format("h:mm", { trim: false })} h
							</div>
						))}
					</div>
				)
			}
		}
	]

	return (
		<div  style={{maxWidth: '960px', margin: '0 auto'}}>
			<h1>Aktywne sprinty</h1>
			<ReactTable
				getTheadProps={(state, rowInfo, column, instance) => {
					return {
						style: { color: '#fff', background: '#000' }
					}
				}}
				data={projectPhases}
				columns={columns}
				className="-striped -highlight"
				style={{
					height: "900px" // This will force the table body to overflow and scroll, since there is not enough room
				}}
			/>
		</div>
	)
	
}

export default SprintsList;

