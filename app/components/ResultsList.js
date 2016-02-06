import React, { Component } from 'react';
import { Accordion, Panel, Button } from 'react-bootstrap';
import moment from 'moment';
import $ from 'jquery';

export default class ResultsList extends Component {
	deleteResult = resultId => {
    if (!window.confirm('Are you sure you want to delete this result?'))
      return;
    $.ajax({
      type: 'delete',
      url: `/api/results/${resultId}`
    })
    .done(res => {
      this.props.onDelete();
    });
  }
	render() {
		const results = this.props.results.map((result, i) => {
			return (
				<Panel header={moment(result.date).format('D.M.YYYY')} eventKey={i + 1} key={result._id}>
					{result.sets.map((set, i) => {
						const weights = set.weights != 0 ? `${set.weights} kg` : '';
		        return (
		          <div className="result-row" key={i + 1}>
		            <span className="result-row--counter">{i + 1}.</span> {set.reps} x {weights}
		          </div>
		        );
					})}
	        <Button
	        	bsStyle="danger"
	        	bsSize="xsmall"
	        	onClick={this.deleteResult.bind(this, result._id)}>
	        	Delete
	        </Button>
	      </Panel>
			);
		});
		return (
			<Accordion>
        {results}
      </Accordion>
		);
	}
}