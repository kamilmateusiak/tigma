import React, { Component } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { graphql } from 'react-apollo';
import TimetrackBarComponent from 'components/TimetrackBar';
import Loader from 'components/Loader';
import { CURRENT_TRACK_QUERY } from 'graphql/queries';

momentDurationFormatSetup(moment);

const SECOND = 1000;
const HOUR = 3600000;

class Dashboard extends Component {
	state = {
		trackDuration : null,
		trackDescription: ''
	}

	componentWillReceiveProps(newProps){
        if(!newProps.loading && newProps.currentTrack) {
			const { start, description } = newProps.currentTrack;
			/**
			 * TODO: times from database localization, removing HOUR constant
			 */
			this.setState({
				trackDuration: new Date() - new Date(start) + HOUR,
				trackDescription: description
			}, () => setInterval(() => {
				this.setState({ trackDuration: this.state.trackDuration + SECOND })
			}, SECOND));
		}
	}
	
	changeDescription = (e) => {
		const trackDescription = e.target.value;
		this.setState({ trackDescription }) 
	}

	render () {
		const { loading, currentTrack } = this.props;
		const { trackDuration, trackDescription } = this.state;
		
		const formatedDuration = moment.duration(trackDuration, "milliseconds").format("h:mm:ss", { trim: false })

		return (
			<div style={{position: 'relative', minHeight: '40px'}}>
				{ loading 
					? <Loader />
					: <TimetrackBarComponent 
						currentTrack={currentTrack}
						trackDescription={trackDescription}
						trackDuration={formatedDuration}
						changeDescription={this.changeDescription}
					/>
				}
			</div>
		)
	}
}

export default graphql(CURRENT_TRACK_QUERY, {
	props: ({ data }) => ({...data})
})(Dashboard);
