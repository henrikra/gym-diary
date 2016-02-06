import React, { Component } from 'react';
import { Input, Button, ProgressBar } from 'react-bootstrap';

export default class Timer extends Component {
  state = {
    secondsRemaining: 60,
    selectedSeconds: 60,
    timerRunning: false
  }
  setInitialTime = (event) => {
    this.setState({
    	selectedSeconds: event.target.options[event.target.selectedIndex].value,
    	secondsRemaining: event.target.options[event.target.selectedIndex].value
    });
  }
  startCountdown = () => {
    this.setState({timerRunning: true});
    this.interval = setInterval(this.tick, 1000);
  }
  resetCountdown = () => {
    clearInterval(this.interval);
    this.setState({timerRunning: false, secondsRemaining: this.state.selectedSeconds});
  }
  tick = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      this.resetCountdown();
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
	render() {
		return (
      <div>
        <p>Stop slacking! Time your breaks!</p>
        {this.state.timerRunning
          ?
          <ProgressBar max={this.state.selectedSeconds} now={this.state.secondsRemaining} label={this.state.secondsRemaining} />
          :
          <Input type="select" value={this.state.selectedSeconds} onChange={this.setInitialTime}>
            <option value="60">60 seconds</option>
            <option value="120">120 seconds</option>
            <option value="180">180 seconds</option>
          </Input>
        }
        <Button block onClick={this.state.timerRunning ? this.resetCountdown : this.startCountdown}>
          {this.state.timerRunning ? 'Stop' : 'Start'} Timer
        </Button>
      </div>
		);
	}
}
