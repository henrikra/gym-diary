import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Input, ButtonInput } from 'react-bootstrap';
import { createExercise } from '../actions';

class ProgramsNew extends Component {
	validationState(field) {
		return field.touched && field.invalid ? 'error' : '';
	}
	onSubmit = (props) => {
		this.props.createExercise(props)
			.then(() => this.props.history.push(`programs/${props.programId}`));
	}
	render() {
		const { fields: { name, programId }, handleSubmit } = this.props;
		return (
			<div className="container">
        <div className="main-content">
          <div className="card-block">
            <h3>New exercise</h3>
            <form onSubmit={handleSubmit(this.onSubmit)}>
            	<Input
				        type="text"
				        label="Name"
				        help={name.touched ? name.error : ''}
				        bsStyle={this.validationState(name)}
				        {...name} />
				      <Input
				      	type="hidden"
				       	{...programId} />
				      {/* TODO checkboxes with workout days */}
				      <ButtonInput type="submit" value="Add exercise" block />
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
		errors.name = 'Enter exercise name';
	}
	return errors;
}

function mapStateToProps(state) {
	return {
		initialValues: {
			programId: state.programs.active
		}	
	}
}

export default reduxForm({
	form: 'ExercisesNew',
	fields: ['name', 'programId'],
	validate
}, mapStateToProps, { createExercise })(ProgramsNew);