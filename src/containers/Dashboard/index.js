import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Spin } from 'antd';
import DashboardComponent from '../../components/Dashboard';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

class Dashboard extends Component {
	state = {
		trackDuration : 0,
		trackDescription: ''
	}

	componentWillReceiveProps(newProps){
        if(!newProps.loading && newProps.currentTrack){
			this.setState({
				trackDuration: new Date() - new Date(newProps.currentTrack.start) + 3600000,
				trackDescription: newProps.currentTrack.description
			})
			setInterval(() => {
				this.setState({
					trackDuration: this.state.trackDuration + 1000
				})
			}, 1000)
		}
	}
	
	changeDescription = (e) => {
		console.log(e);
		const newValue = e.target.value;
		this.setState({
			trackDescription: newValue
		}) 
	}

	render () {
    	const { loading, currentTrack } = this.props;
		if (loading) {
			return <Spin size="large" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>;
		}

		const trackDuration = moment.duration(this.state.trackDuration, "milliseconds").format("h:mm:ss", { trim: false })
		
		return <DashboardComponent currentTrack={currentTrack} trackDescription={this.state.trackDescription} trackDuration={trackDuration} changeDescription={this.changeDescription}/>
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
