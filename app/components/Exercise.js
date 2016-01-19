import React, { Component } from 'react';
import Timer from './Timer';
import { Tabs, Tab, Accordion, Panel, Input, Button, Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';
import Select from './Select';

export default class Exercise extends Component {
  state = {
    setCount: 3,
    results: [],
    defaultReps: 10,
    defaultWeights: 10
  }
  componentDidMount() {
    $.get('/api/results', {exerciseId: this.props.params.exerciseId}, res => {
      if (res.docs.length) {
        let lastWorkoutSet = res.docs[0].sets[res.docs[0].sets.length - 1];
        this.setState({
          results: res.docs,
          setCount: res.docs[0].sets.length,
          defaultReps: lastWorkoutSet.reps,
          defaultWeights: lastWorkoutSet.weights
        });
      }
    });
  }
  delExercise = () => {
    if(window.confirm("Are you sure you want to delete this exercise?\nAll of your results for this exercise will also be removed.")) {
    $.post('/api/rm_exercise ', {exerciseId: this.props.params.exerciseId}, res => {
      if(res.success) {
        this.props.history.goBack();
      }
    });
    }
  }
  setCountChange = (event) => {
    this.setState({setCount: event.target.options[event.target.selectedIndex].value});
  }
  addResults = () => {
    let results = [];
    let weights = [];
    let reps = [];
    for (let ref in this.refs) {
      if (ref.includes('weights')) {
        weights.push(this.refs[ref].refs.select.getValue());
      } else {
        reps.push(this.refs[ref].refs.select.getValue());
      }
    }
    for (let i = 0; i < weights.length; i++) {
      results.push({
        reps: reps[i],
        weights: weights[i]
      });
    }
    let data = {
      exerciseId: this.props.params.exerciseId,
      results: JSON.stringify(results)
    }
    $.post('/api/addresult', data, res => {
      let lastWorkoutSet = res.docs[0].sets[res.docs[0].sets.length - 1];
      this.setState({
        results: res.docs,
        defaultReps: lastWorkoutSet.reps,
        defaultWeights: lastWorkoutSet.weights
      });
    });
  }
	render() {
    let sets = [];
    for (let i = 1; i <= this.state.setCount; i++) {
      sets.push(
        <Panel header={`Set #${i}`} eventKey={i}>
          <form>
            <Select
              value={this.state.defaultWeights}
              min={0}
              max={300}
              increment={0.25}
              ref={`weights${i}`}
              label="kg" />
            <Select
              value={this.state.defaultReps}
              min={0}
              max={50}
              increment={1}
              ref={`reps${i}`}
              label="reps" />
          </form>
        </Panel>
      );
    }
    let previousSets = this.state.results.map(function(result) {
      let counter = 0;
      return result.sets.map(function(set) {
        counter++;
        let weights;
        if (set.weights != 0) {
          weights = <span>{set.weights}kg</span>;
        }
        
        return (
          <div className="result-row" key={counter}>
            <span className="result-row--counter">{counter}.</span> {set.reps} x {weights}
          </div>
        );
      });
    });
    let counter = 0;
    let results = this.state.results.map(function(result) {
      counter++;
      return (
        <Panel header={moment(result.date).format('D.M.YYYY')} eventKey={counter} key={result._id}>
          {previousSets[counter - 1]}
        </Panel>
      );
    });
		return (
			<div className="container">
        <div className="main-content">
          <div className="card-block">
            <h3>{this.props.location.query.name}</h3>
            <Tabs defaultActiveKey={1} animation={false} justified>
              <Tab eventKey={1} title="Current">
                <Input label="Sets" type="select" value={this.state.setCount} onChange={this.setCountChange}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Input>
                <Accordion>
                  {sets}
                </Accordion>
                <Button block onClick={this.addResults}>Add results</Button>
                <Button bsStyle="danger" block onClick={this.delExercise}>Delete this exercise?</Button>
              </Tab>
              <Tab eventKey={2} title="Results">
                <Accordion>
                  {results}
                </Accordion>
              </Tab>
              <Tab eventKey={3} title={<Glyphicon glyph="time" />}>
                <Timer />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
		);
	}
}
