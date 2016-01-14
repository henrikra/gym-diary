import React, { Component } from 'react';
import { Input, Button, ProgressBar } from 'react-bootstrap';

export default class Timer extends Component {
  state = {
    secondsRemaining: 60,
    selectedSeconds: 60,
    timerRunning: false
  }
  setInitialTime = (event) => {
    if (!this.state.timerRunning) {
      this.setState({
      	selectedSeconds: event.target.options[event.target.selectedIndex].value,
      	secondsRemaining: event.target.options[event.target.selectedIndex].value
    });
    }
  }
  startCountdown = () => {
    if(!this.state.timerRunning) {
      this.setState({timerRunning: true});
      this.interval = setInterval(this.tick, 1000);
    }
  }
  resetCountdown = () => {
    clearInterval(this.interval);
    this.setState({timerRunning: false, secondsRemaining: this.state.selectedSeconds});
    this.startCountdown();
  }
  tick = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
      this.setState({timerRunning: false, secondsRemaining: this.state.selectedSeconds});
    }
  }
	render = () => {
    let button, progressBar, select;
    if(!this.state.timerRunning) {
      select = (
        <Input type="select" value={this.state.selectedSeconds} onChange={this.setInitialTime}>
          <option value="60">60 seconds</option>
          <option value="120">120 seconds</option>
          <option value="180">180 seconds</option>
        </Input>
      );
      button = <Button block onClick={this.startCountdown}>Start Timer</Button>;
    } else {
      button = <Button block onClick={this.resetCountdown}>Stop Timer</Button>;
      progressBar = <ProgressBar max={this.state.selectedSeconds} now={this.state.secondsRemaining} label={this.state.secondsRemaining}></ProgressBar>;
    }
		return (
      <div>
        <p>Stop slacking! Time your breaks!</p>
          {select}
          
          {progressBar}
          {button}
          
      </div>
		);
	}
}
