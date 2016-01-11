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

    //Don't allow empty or invalid input, set borderColor accordingly.
    if (!/^[a-zA-Z0-9 ]+$/.test(this.refs.programName.value) || this.refs.programName.value === '' || (((this.refs.programName.value).trim()).length) === 0 ) {
      console.log("Invalid input.");
      document.getElementById("newProgram").style.borderColor = "red";
      return;
    }
    //Reset borderColor, input not empty.
    document.getElementById("newProgram").style.borderColor = "#CCC";
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
