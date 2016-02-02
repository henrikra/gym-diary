
import React, { Component } from 'react';
import $ from 'jquery';
import AddInput from './AddInput';
import List from './List';

export default class Program extends Component {
	state = {
		exercises: []
	}
	componentDidMount = () => {
		$.get(`/api/exercises/${this.props.params.programId}`, (res) => {
			this.setState({
				exercises: res
			});
		});
	}
	addNew = (exerciseName) => {
		var data = {
      exerciseName: exerciseName,
      programId: this.props.params.programId
    };

    // Ajax post to save new program
    $.ajax({
      type: 'post',
      url: '/api/exercises',
      data: data
    })
    .done(res => {
      this.setState({
        exercises: res
      });
    })
    .fail(res => {
        console.log('Error.', res);
    });
	}
	render() {
		return (
			<div className="container">
				<div className="main-content">
	        <div className="card-block">
		        <h3>{this.props.location.query.name}</h3>
		        <AddInput
              placeholder="Add new exercise..."
              onSubmit={this.addNew} />
            <List data={this.state.exercises} linkTo="exercises" />
        	</div>
        </div>
      </div>
		);
	}
}
