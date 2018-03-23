import React, { Component } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { Spin } from 'antd';
import { graphql } from 'react-apollo';
import DashboardComponent from 'components/Dashboard';
import Loader from 'components/Loader';

momentDurationFormatSetup(moment);

const SECOND = 1000;
const HOUR = 3600000;

class Dashboard extends Component {
	state = {
		trackDuration : 0,
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
		if (loading) {
			return <Loader />;
		}

		const formatedDuration = moment.duration(trackDuration, "milliseconds").format("h:mm:ss", { trim: false })
		
		return ( 
			<DashboardComponent 
				currentTrack={currentTrack}
				trackDescription={trackDescription}
				trackDuration={formatedDuration}
				changeDescription={this.changeDescription}
			/>
		);
	}
}

const CURRENT_TRACK_QUERY = gql`
  query CurrentTrackQuery {
    currentTrack {
		description
		start
		stop
	}
  }
`;

export default graphql(CURRENT_TRACK_QUERY, {
    props: ({ data }) => ({...data})
})(Dashboard);
