import React, { Component } from 'react';

export default class Programs extends Component {
	render() {
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
								<tr>
								  <td>Golden Six</td>
								  <td>3.1.2016</td>
								</tr>
								<tr>
								  <td>Starting strength</td>
								  <td>13.9.2015</td>
								</tr>
							</tbody>
						</table> 
					</div>
				</div>
			</div>
		);
	}
}