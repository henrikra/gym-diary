import React, { Component } from 'react';
import { Input, Accordion, Panel, Button } from 'react-bootstrap';
import _ from 'lodash';
import Select from './Select';

export default class CurrentResults extends Component {
	addResults = () => {
    const isEven = (value, index) => index % 2 === 0

    const weights = _.filter(_.values(this.refs), isEven);
    const reps = _.reject(_.values(this.refs), isEven);

    const results = _.map(_.zip(weights, reps), pair =>
      ({
        reps: pair[1].refs.select.getValue(),
        weights: pair[0].refs.select.getValue()
      })
    );
    const data = {
      exerciseId: this.props.exerciseId,
      results: JSON.stringify(results)
    }

    this.props.onAdd(data);
  }
  setCountChange = (event) => {
    this.props.onCountChange(parseInt(event.target.options[event.target.selectedIndex].value));
  }
	render() {
		const { setCount, defaultWeights, defaultReps, isLoading } = this.props;
    const sets = _.map(_.range(1, setCount + 1), i =>
      <Panel key={i} header={`Set #${i}`} eventKey={i}>
        <Select
          value={defaultWeights}
          min={0}
          max={300}
          increment={0.25}
          ref={`weights${i}`}
          label="kg" />
        <Select
          value={defaultReps}
          min={0}
          max={50}
          increment={1}
          ref={`reps${i}`}
          label="reps" />
      </Panel>
    );
		return (
			<div>
				<Input label="Sets" type="select" value={setCount} onChange={this.setCountChange}>
	        <option value="3">3</option>
	        <option value="4">4</option>
	      </Input>
        <form onSubmit={this.addResults}>
  	      <Accordion>
  	        {sets}
  	      </Accordion>
  	      <Button disabled={isLoading} block type="submit">
  	        {isLoading ? 'Loading...' : 'Add results'}
  	      </Button>
        </form>
      </div>
		);
	}
}