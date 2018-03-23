/*global gantt*/
import React, { Component } from 'react'
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

var data = {
	data: [
	  {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
	  {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4}
	],
	links: [
	  {id: 1, source: 1, target: 2, type: '0'}
	]
};

export default class Gantt extends Component {
	componentDidMount() {
	  gantt.init(this.ganttContainer);
	  gantt.parse(data);
	}

	setZoom(value){
		switch (value){
		  case 'Hours':
			gantt.config.scale_unit = 'day';
			gantt.config.date_scale = '%d %M';
	 
			gantt.config.scale_height = 60;
			gantt.config.min_column_width = 30;
			gantt.config.subscales = [
			  {unit:'hour', step:1, date:'%H'}
			];
			break;
		  case 'Days':
			gantt.config.min_column_width = 70;
			gantt.config.scale_unit = "week";
			gantt.config.date_scale = "#%W";
			gantt.config.subscales = [
			  {unit: "day", step: 1, date: "%d %M"}
			];
			gantt.config.scale_height = 60;
			break;
		  case 'Months':
			gantt.config.min_column_width = 70;
			gantt.config.scale_unit = "month";
			gantt.config.date_scale = "%F";
			gantt.config.scale_height = 60;
			gantt.config.subscales = [
			  {unit:"week", step:1, date:"#%W"}
			];
			break;
		  default:
			break;
		}
	  }
	 
	  shouldComponentUpdate(nextProps ){
		return this.props.zoom !== nextProps.zoom;
	  }
	
	  componentDidUpdate() {
		gantt.render();
	  }
	
	render() {
	  return (
		<div className="gantt-container">
		  <div
			  ref={(input) => { this.ganttContainer = input }}
			  style={{width: '100%', height: '800px'}}
		  ></div>
		</div>
	  );
	}
  }