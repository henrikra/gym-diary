import React, { Component } from 'react';
import { Input, Button } from 'react-bootstrap';

export default class Timer extends Component {
  state = {
    secondsRemaining: 60,
    selectedSeconds: 60,
    timerRunning: false
  }
  setInitialTime = (event) => {
    this.setState({selectedSeconds: event.target.options[event.target.selectedIndex].value});
    this.setState({secondsRemaining: event.target.options[event.target.selectedIndex].value});
  }
  startCoundown = () => {
    console.log("Start, timer state: ", this.state.timerRunning);
    if(!(this.state.timerRunning)) {
      console.log("Timer state false, set to true.");
      this.setState({timerRunning: true});
      this.interval = setInterval(this.tick, 1000);
    } else {
      console.log("Timer already running.");
    }
  }
  tick = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
      this.setState({timerRunning: false, secondsRemaining: this.state.selectedSeconds});
    }
  }
	render = () => {
    let button;
    if(!(this.state.timerRunning)) {
      button = <Button block onClick={this.startCoundown}>Start</Button>;
    } else {
      button = <Button block disabled>{this.state.secondsRemaining}</Button>;
    }
		return (
      <div>
        <p>Stop slacking! Time your breaks!</p>
          <Input type="select" value={this.state.selectedSeconds} onChange={this.setInitialTime}>
            <option value="60">60 seconds</option>
            <option value="120">120 seconds</option>
            <option value="180">180 seconds</option>
          </Input>
          {button}
      </div>
		);
	}
}
