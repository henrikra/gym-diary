import React, { Component } from 'react';
import Timer from './Timer';
import { Tabs, Tab, Accordion, Panel, Input, Button, Glyphicon, DropdownButton, MenuItem, Label } from 'react-bootstrap';
import $ from 'jquery';
import Select from './Select';
import _ from 'lodash';
import ResultsList from './ResultsList';

export default class Exercise extends Component {
  state = {
    setCount: 3,
    results: [],
    defaultReps: 10,
    defaultWeights: 10,
    activeTab: 1,
    isLoading: false,
    workoutDays: []
  }
  componentDidMount() {
    this.getResults();
  }
  getResults = () => {
    $.get('/api/results', {exerciseId: this.props.params.exerciseId}, res => {
      if (res.docs.length) {
        const lastWorkoutSet = res.docs[0].sets[res.docs[0].sets.length - 1];
        this.setState({
          results: res.docs,
          setCount: res.docs[0].sets.length,
          defaultReps: lastWorkoutSet.reps,
          defaultWeights: lastWorkoutSet.weights
        });
      } else {
        this.setState({
          results: res.docs,
          setCount: 3,
          defaultReps: 10,
          defaultWeights: 10
        });
      }
    });
  }
  delExercise = () => {
    if (!window.confirm('Are you sure you want to delete this exercise and all of its results?'))
      return;
    $.ajax({
      type: 'delete',
      url: '/api/exercises/' + this.props.params.exerciseId
    })
    .done(res => {
      if(res.success) {
        this.props.history.goBack();
      }
    });
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
  addWorkoutDays = (event, eventKey) => {
    !this.state.workoutDays.includes(eventKey) ? (this.saveWorkoutDays(eventKey)) : (this.removeWorkoutDays(eventKey));
  }
  saveWorkoutDays = (eventKey) => {
    this.setState({workoutDays: this.state.workoutDays.concat([eventKey])});
    console.log("Added ", eventKey);
    //ajax post here
  }
  removeWorkoutDays = (eventKey) => {
    const removed = [].filter.call(this.state.workoutDays, str => {
      return str != eventKey;
    });
    this.setState({workoutDays: removed});
    console.log("Removed ", eventKey);
    //ajax del here
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
    const workoutdays = this.state.workoutDays.map((day) => {
      return (
        <Label bsStyle="success">
          {day}
        </Label>
      );
    });
		return (
			<div className="container">
        <div className="main-content">
          <div className="card-block exercise">
            <div className="exercise--settings">
            {workoutdays}
            <DropdownButton onSelect={this.addWorkoutDays} title={<Glyphicon glyph="tags" />} noCaret pullRight id="exercise-settings">
                <MenuItem eventKey="monday">Monday</MenuItem>
                <MenuItem eventKey="tuesday">Tuesday</MenuItem>
                <MenuItem eventKey="wednesday">Wednesday</MenuItem>
                <MenuItem eventKey="thursday">Thursday</MenuItem>
                <MenuItem eventKey="friday">Friday</MenuItem>
                <MenuItem eventKey="saturday">Saturday</MenuItem>
                <MenuItem eventKey="sunday">Sunday</MenuItem>
              </DropdownButton>
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
                <ResultsList
                  results={this.state.results}
                  onDelete={this.getResults} />
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
