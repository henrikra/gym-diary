import React, { Component } from 'react';
import Timer from './Timer';
import { Tabs, Tab, Accordion, Panel, Input, Button, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';
import Select from './Select';
import _ from 'lodash';

export default class Exercise extends Component {
  state = {
    setCount: 3,
    results: [],
    defaultReps: 10,
    defaultWeights: 10,
    activeTab: 1,
    isLoading: false
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
    this.setState({ isLoading: true });
    let isEven = (value, index) => index % 2 === 0

    let weights = _.filter(_.values(this.refs), isEven);
    let reps = _.reject(_.values(this.refs), isEven);

    let results = _.map(_.zip(weights, reps), pair =>
      ({
        reps: pair[1].refs.select.getValue(),
        weights: pair[0].refs.select.getValue()
      })
    );

    let data = {
      exerciseId: this.props.params.exerciseId,
      results: JSON.stringify(results)
    }

    $.post('/api/results', data, res => {
      let lastWorkoutSet = res.docs[0].sets[res.docs[0].sets.length - 1];
      this.setState({
        results: res.docs,
        defaultReps: lastWorkoutSet.reps,
        defaultWeights: lastWorkoutSet.weights,
        activeTab: 2,
        isLoading: false
      });
    });
  }
  changeTab = key => {
    this.setState({activeTab: key});
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
      return result.sets.map(function(set, i) {
        let weights;
        if (set.weights != 0) {
          weights = <span>{set.weights}kg</span>;
        }
        return (
          <div className="result-row" key={i + 1}>
            <span className="result-row--counter">{i + 1}.</span> {set.reps} x {weights}
          </div>
        );
      });
    });
    let results = this.state.results.map(function(result, i) {
      return (
        <Panel header={moment(result.date).format('D.M.YYYY')} eventKey={i + 1} key={result._id}>
          {previousSets[i]}
        </Panel>
      );
    });
		return (
			<div className="container">
        <div className="main-content">
          <div className="card-block exercise">
            <div className="exercise--settings">
              <DropdownButton title={<Glyphicon glyph="cog" />} noCaret pullRight id="exercise-settings">
                <MenuItem eventKey="1" onClick={this.delExercise}>Delete</MenuItem>
              </DropdownButton>
            </div>
            <h3>{this.props.location.query.name}</h3>
            <Tabs activeKey={this.state.activeTab} onSelect={this.changeTab} animation={false} justified>
              <Tab eventKey={1} title="Current">
                <Input label="Sets" type="select" value={this.state.setCount} onChange={this.setCountChange}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Input>
                <Accordion>
                  {sets}
                </Accordion>
                <Button disabled={this.state.isLoading} block onClick={this.addResults}>
                  {this.state.isLoading ? 'Loading...' : 'Add results'}
                </Button>
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
