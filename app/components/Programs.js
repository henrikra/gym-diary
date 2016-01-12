import React, { Component } from 'react';
import $ from 'jquery';
import auth from '../auth';

export default class Programs extends Component {
	state = {
		programs: []
	}
	componentDidMount() {
		$.get('/api/programs/' + auth.getUserId(), (res) => {
      if (res.programs) {
  			this.setState({
  				programs: res.programs
  			});
      }
		});
	}
  addNew = () => {
    var data = {
      program: this.refs.programName.value,
      trainerId: auth.getUserId()
    };

    // Don't allow empty or invalid input, set borderColor accordingly.
    if (!/^[a-zA-Z0-9 ]+$/.test(this.refs.programName.value) || this.refs.programName.value === '' || (((this.refs.programName.value).trim()).length) === 0 ) {
      console.log('Invalid input.');
      document.getElementById('newProgram').style.borderColor = 'red';
      return;
    }
    // Reset borderColor, input not empty.
    document.getElementById('newProgram').style.borderColor = '#CCC';
    // Ajax post to save new program
    $.ajax({
      type: 'post',
      url: '/api/addprogram',
      data: data
    })
    .done(res => {
      this.setState({
        programs: res.programs
      });
      this.refs.programName.value = '';
    })
    .fail(res => {
        console.log('Error.', res);
    });
  }
  render() {
    var programs = this.state.programs.map(function(program) {
      return (
        <tr key={program._id}>
          <td><a href={'/#/programs/' + program._id}>{program.name}</a></td>
          <td>3.1.2016</td>
        </tr>
      );
    });
    let table;
    if (programs.length) {
      table = (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last workout</th>
            </tr>
          </thead>
          <tbody>
            {programs}
          </tbody>
        </table>
      );
    }
    return (
        <div className="container">
          <div className="main-content">
            <div className="card-block">
              <h3>Your Programs</h3>
              {table}
              <div className="input-group">
                <input id="newProgram" className="form-control" ref="programName" type="text" placeholder="Add new program..." />
                <span className="input-group-btn">
                  <button className="btn" onClick={this.addNew}>Add</button>
                </span>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
