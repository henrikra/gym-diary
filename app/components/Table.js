import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Table extends Component {
	render() {
		let headers = this.props.headers.map(function(header) {
			return <th>{header}</th>;
		});
		let dataRows = this.props.data.map(dataRow => {
			return (
				<tr>
          <td><Link to={`/${this.props.linkTo}/${dataRow._id}`} query={{name: dataRow.name}}>{dataRow.name}</Link></td>
          <td>3.1.2016</td>
        </tr>
			);
		});
		return (
			<table className="table table-hover">
			  <thead>
			    <tr>
			      {headers}
			    </tr>
			  </thead>
			  <tbody>
			  	{dataRows}
			  </tbody>
			</table>
		);
	}
}