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
	render() {
		let { min, max, increment } = this.props;
		let options = [];
		for (let i = min; i <= max; i += increment) {
			options.push(<option value={i}>{i} {this.props.label}</option>);
		}
		return (
			<Input type="select" onChange={this.changeSelect} value={this.state.value} ref="select">
        {options}
      </Input>
		);
	}
}
