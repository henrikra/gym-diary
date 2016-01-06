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
  addNew() {
    var self = this;
    var name = self.refs.programName.value;
    var data = {"name": name};
    //Ajax post to save new program
      var ajax = $.ajax({
          type: "post",
          url: '/addprogram',
          data: data
      });
      ajax.done(response => {
          self.setState({
              programs: response
          });
          self.refs.programName.value = "";
      });
      ajax.fail(response => {
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
            <div>
              <input ref="programName" type="text" placeholder="Enter program name..."></input>
            </div>
            <button onClick={this.addNew.bind(this)}>Add new Program</button>
          </div>
        </div>
      </div>
    );
  }
}
