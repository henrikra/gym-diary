import React, { Component } from 'react';
import $ from 'jquery';
import auth from '../auth';
import AddInput from './AddInput';
import List from './List';

export default class Programs extends Component {
	state = {
		programs: []
	}
	componentDidMount() {
		$.get('/api/programs/' + auth.getUserId(), (res) => {
      if (res) {
  			this.setState({
  				programs: res
  			});
      }
		});
	}
  addNew = (programName) => {
    var data = {
      program: programName,
      trainerId: auth.getUserId()
    };

    // Ajax post to save new program
    $.ajax({
      type: 'post',
      url: '/api/addprogram',
      data: data
    })
    .done(res => {
      this.setState({
        programs: res
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
            <h3>Your Programs</h3>
            <AddInput
              placeholder="Add new program..."
              onSubmit={this.addNew} />
            <List data={this.state.programs} linkTo="programs" />
          </div>
        </div>
      </div>
    );
  }
}
