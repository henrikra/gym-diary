import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Input, ButtonInput } from 'react-bootstrap';
import { createProgram } from '../actions';
import auth from '../auth';
import InputField from './InputField';

class ProgramsNew extends Component {
	onSubmit = (formData) => {
		this.props.createProgram(formData)
			.then(() => this.props.history.push('programs'));
	}
	render() {
		const { fields: { name, trainerId }, handleSubmit } = this.props;
		return (
			<div className="container">
        <div className="main-content">
          <div className="card-block">
            <h3>New program</h3>
            <form onSubmit={handleSubmit(this.onSubmit)}>
            	<InputField
				        type="text"
				        label="Name"
				        field={name} />
				      <Input
				       	type="hidden"
				       	{...trainerId} />
				      <ButtonInput type="submit" value="Add program" block />
            </form>
          </div>
        </div>
      </div>
		);
	}
}

function validate(values) {
	const errors = {};
	if (!values.name) {
		errors.name = 'Enter program name';
	}
	return errors;
}

export default reduxForm({
	form: 'ProgramsNew',
	fields: ['name', 'trainerId'],
	initialValues: {
		trainerId: auth.getUserId()
	},
	validate
}, null, { createProgram })(ProgramsNew);