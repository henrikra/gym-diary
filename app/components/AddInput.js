import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class AddInput extends Component {
	state = {
		inputText: '',
		error: false
	}
	validate = () => {
		// Don't allow empty or invalid input, set borderColor accordingly.
    if (!/^[a-zA-Z0-9 ]+$/.test(this.state.inputText) || !this.state.inputText.trim() ) {
      console.log('Invalid input.');
      this.setState({error: true});
      return;
    }
    this.setState({
    	inputText: '',
    	error: false
    });
    this.props.onSubmit(this.state.inputText);
	}
	handleChange = (event) => {
		this.setState({inputText: event.target.value});
	}
	render() {
		let inputClass = 'form-control';
		if (this.state.error) inputClass += ' has-error';
		return (
			<div className="input-group">
			  <input className={inputClass} type="text"
			  placeholder={this.props.placeholder}
			  value={this.state.inputText}
			  onChange={this.handleChange} />
			  <span className="input-group-btn">
			    <Button onClick={this.validate}>Add</Button>
			  </span>
			</div>
		);
	}
}