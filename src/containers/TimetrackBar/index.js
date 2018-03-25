import React, { Component } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { graphql, compose } from 'react-apollo';
import TimetrackBarComponent from 'components/TimetrackBar';
import Loader from 'components/Loader';
import { CURRENT_TRACK_QUERY, LOGGED_USER_QUERY } from 'graphql/queries';
import { TIMETRACK_STOP, TIMETRACK_START } from 'graphql/mutations';

momentDurationFormatSetup(moment);

const SECOND = 1000;
const HOUR = 3600000;

class Dashboard extends Component {
	state = {
		trackDuration : null,
		trackDescription: '',
		projectsVisibility: false,
		project_id: null
	}

	timetrackInterval = setInterval(() => {
		this.setState({ trackDuration: this.state.trackDuration + SECOND })
	}, SECOND)

	componentWillReceiveProps(newProps){
        if(!newProps.loading && newProps.currentTrack) {
			const { start, description, project_id } = newProps.currentTrack;
			/**
			 * TODO: times from database localization, removing HOUR constant
			 */
			this.setState({
				trackDuration: new Date() - new Date(start) + HOUR,
				trackDescription: description,
				project_id
			}, () => this.timetrackInterval);
		}
	}
	
	changeDescription = (e) => {
		const trackDescription = e.target.value;
		this.setState({ trackDescription }) 
	}

	stopTrack = async () => {
		const result = await this.props.timetrackStop();
		this.setState({
			trackDescription: '',
			project_id: null,
			trackDuration: null
		})
		clearInterval(this.timetrackInterval)
		console.log('stop', result)
	}

	startTrack = async () => {
		const { project_id, trackDescription: description } = this.state;
		const result = await this.props.timetrackStart({ 
			variables: {
				description,
				project_id
			}
		});
		this.setState({
			description: result.description,
			project_id: result.project_id
		})
		console.log('start', result);
	}

	toggleProjectsVisibility = () => {
		this.setState({
			projectsVisibility: !this.state.projectsVisibility
		})
	}

	selectProject = (project_id) => {
		this.setState({ project_id })
	}

	render () {
		const { loading, currentTrack, me : currentUser } = this.props;
		const { trackDuration, trackDescription, projectsVisibility, project_id } = this.state;
		const formatedDuration = moment.duration(trackDuration, "milliseconds").format("h:mm:ss", { trim: false })

		return (
			<div style={{position: 'relative', minHeight: '40px'}}>
				{ loading 
					? <Loader />
					: <TimetrackBarComponent
						projects={currentUser.projects}
						stopTrack={this.stopTrack}
						startTrack={this.startTrack}
						currentTrack={currentTrack}
						trackDescription={trackDescription}
						trackDuration={formatedDuration}
						changeDescription={this.changeDescription}
						projectsVisibility={projectsVisibility}
						toggleProjectsVisibility={this.toggleProjectsVisibility}
						selectProject={this.selectProject}
						project_id={project_id}
					/>
				}
			</div>
		)
	}
}

export default compose(
	graphql(CURRENT_TRACK_QUERY, {
		props: ({ data }) => ({...data})
	}),
	graphql(TIMETRACK_START, {
		name: 'timetrackStart',
		options: {
			refetchQueries: [ 'CurrentTrackQuery' ]
		}
	}),
	graphql(TIMETRACK_STOP, {
		name: 'timetrackStop',
		options: {
			refetchQueries: [ 'CurrentTrackQuery', 'SummaryQuery' ]
		}
	}),
	graphql(LOGGED_USER_QUERY, {
		props: ({ data }) => ({...data})
	})
)(Dashboard);
