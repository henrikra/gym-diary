import React, { Component } from 'react';
import $ from 'jquery';

export default class Programs extends Component {
	state = {
		programs: []
	}
	componentDidMount(){
		$.get('/programs', (results) => {
			this.setState({
				programs: results
			});
		});
	}
  addNew = () => {
    var data = {name: this.refs.programName.value};
    //Ajax post to save new program
    $.ajax({
        type: 'post',
        url: '/addprogram',
        data: data
    })
    .done(response => {
        this.setState({
            programs: response
        });
        this.refs.programName.value = '';
    })
    .fail(response => {
        console.log("Error.", response);
    });
  }
  render() {
    var programs = this.state.programs.map(function(program) {
      return (
        <tr key={program._id}>
          <td><a href={"/#/programs/"+program._id}>{program.name}</a></td>
          <td>3.1.2016</td>
        </tr>
      );
    });
    return (
      <div className="container">
        <div className="main-content">
          <div className="card-block">
            <h3>Your Programs</h3>
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
            
            <div className="input-group">
              <input className="form-control" ref="programName" type="text" placeholder="Add new program..." />
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
