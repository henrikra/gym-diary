import React, { Component } from 'react';
import Timer from './Timer';
import { Tabs, Tab, Accordion, Panel, Input, Button } from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';

export default class Exercise extends Component {
  state = {
    setCount: 3,
    results: []
  }
  componentDidMount() {
    $.get('/api/results', {exerciseId: this.props.params.exerciseId}, res => {
      this.setState({results: res.docs});
    });
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
        weights.push(this.refs[ref].getValue());
      } else {
        reps.push(this.refs[ref].getValue());
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
      this.setState({results: res.docs});
    });
  }
  acceptSet = () => {
  }
	render = () => {
    let sets = [];
    for (let i = 1; i <= this.state.setCount; i++) {
      sets.push(
        <Panel header={`Set #${i}`} eventKey={i}>
          <form>
            <Input type="select" ref={`weights${i}`} addonAfter="kg">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </Input>
            <Input type="select" ref={`rep${i}`} addonAfter="reps">
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </Input>
            <Button block onClick={this.acceptSet}>Done</Button>
          </form>
        </Panel>
      );
    }
    let previousSets = this.state.results.map(function(result) {
      let counter = 0;
      return result.sets.map(function(set) {
        counter++;
        return <div>{counter}. {set.reps} x {set.weights}kg</div>;
      });
    });
    let counter = 0;
    let results = this.state.results.map(function(result) {
      counter++;
      return (
        <Panel header={moment(result.date).format('D.M.YYYY')} eventKey={counter}>
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
                <Input label="Sets" type="select" onChange={this.setCountChange}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Input>
                <Accordion>
                  {sets}
                </Accordion>
                <Button block onClick={this.addResults}>Add results</Button>
              </Tab>
              <Tab eventKey={2} title="Results">
                <Accordion>
                  {results}
                </Accordion>
              </Tab>
              <Tab eventKey={3} title="Timer">
              <Timer></Timer>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
		);
	}
}
