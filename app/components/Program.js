
import React, { Component } from 'react';
import $ from 'jquery';
import AddInput from './AddInput';
import List from './List';

export default class Program extends Component {
	state = {
		exercises: []
	}
	componentDidMount = () => {
		$.get(`/api/exercises/${this.props.params.programId}`, exercises => {
			this.setState({ exercises });
		});
	}
	addNew = (exerciseName) => {
		const data = {
      exerciseName,
      programId: this.props.params.programId
    };
    // Ajax post to save new program
    $.ajax({
      type: 'post',
      url: '/api/exercises',
      data
    })
    .done(exercises => {
      this.setState({ exercises });
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
