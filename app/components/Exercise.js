import React, { Component } from 'react';
import { Tabs, Tab, Glyphicon, DropdownButton, MenuItem, Label } from 'react-bootstrap';
import $ from 'jquery';
import CurrentResults from './CurrentResults';
import ResultsList from './ResultsList';
import Timer from './Timer';
import SettingsCog from './SettingsCog';

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
  componentWillMount() {
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
      url: `/api/exercises/${this.props.params.exerciseId}`
    })
    .done(res => {
      if (res.success) {
        this.props.history.goBack();
      }
    });
  }
  setCountChange = (newCount) => {
    this.setState({setCount: newCount});
  }
  addResults = (data) => {
    $.post('/api/results', data, res => {
      this.setState({
        activeTab: 2,
        isLoading: false
      });
      this.getResults()
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
    const workoutdays = this.state.workoutDays.map((day) => {
      return (
        <Label bsStyle="success">
          {day}
        </Label>
      );
    });
    const cogItems = [{label: 'Delete', onClick: this.delExercise}];
		return (
			<div className="container">
        <div className="main-content">
          <div className="card-block exercise">
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
            <h3>{this.props.location.query.name}</h3>
            <SettingsCog items={cogItems} />
            <Tabs activeKey={this.state.activeTab} onSelect={this.changeTab} animation={false} justified>
              <Tab eventKey={1} title="Current">
                <CurrentResults
                  setCount={this.state.setCount}
                  defaultWeights={this.state.defaultWeights}
                  defaultReps={this.state.defaultReps}
                  isLoading={this.state.isLoading}
                  onAdd={this.addResults}
                  exerciseId={this.props.params.exerciseId}
                  onCountChange={this.setCountChange} />
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
