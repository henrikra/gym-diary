import React, { Component } from 'react';
import { Input } from 'react-bootstrap';

export default class Select extends Component {
	state = {
		value: this.props.value
	};
	componentWillReceiveProps = (nextProps) => {
		this.setState({value: nextProps.value});
	}
	changeSelect = (event) => {
		this.setState({value: event.target.options[event.target.selectedIndex].value});
	}
	render = () => {
		let options = this.props.options.map(function(option) {
			return <option value={option}>{option}</option>
		});
		return (
			<Input type="select" onChange={this.changeSelect} value={this.state.value} ref="select" addonAfter={this.props.addonAfter}>
        {options}
      </Input>
		);
	}
}