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
	render() {
		var programs = this.state.programs.map(function(program) {
			return (
				<tr key={program._id}>
				  <td>{program.name}</td>
				  <td>3.1.2016</td>
				</tr>
			);
		});
		return (
			<div className="container">
				<div className="main-content">
					<div className="card-block">
						<h3>Your programs</h3>
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
					</div>
				</div>
			</div>
		);
	}
}