import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Input, ButtonInput } from 'react-bootstrap';
import { createProgram } from '../actions';
import auth from '../auth';

class ProgramsNew extends Component {
	validationState(field) {
		return field.touched && field.invalid ? 'error' : '';
	}
	onSubmit = (props) => {
		this.props.createProgram(props)
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
            	<Input
				        type="text"
				        label="Name"
				        help={name.touched ? name.error : ''}
				        bsStyle={this.validationState(name)}
				        {...name} />
				       <Input
				       	type="hidden"
				       	{...trainerId} />
				      <ButtonInput type="submit" value="Add" block />
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