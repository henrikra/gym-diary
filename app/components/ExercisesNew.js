import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Input, ButtonInput } from 'react-bootstrap';
import { createExercise } from '../actions';
import InputField from './InputField';

class ProgramsNew extends Component {
	onSubmit = (props) => {
		this.props.createExercise(props)
			.then(() => this.props.history.push(`programs/${props.programId}`));
	}
	render() {
      const { fields: { name, programId, monday, tuesday, wednesday, thursday, friday, saturday, sunday }, handleSubmit } = this.props;
		return (
			<div className="container">
        <div className="main-content">
          <div className="card-block">
            <h3>New exercise</h3>
            <form onSubmit={handleSubmit(this.onSubmit)}>
            	<InputField
            		field={name}
            		type="text"
            		label="Name" />
				      <Input
				      	type="hidden"
				       	{...programId} />
				    {/* TODO checkboxes with workout days */}
            <Input type="checkbox" label="Monday" {...monday}/>
            <Input type="checkbox" label="Tuesday" {...tuesday}/>
            <Input type="checkbox" label="Wednesday" {...wednesday}/>
            <Input type="checkbox" label="Thursday" {...thursday}/>
            <Input type="checkbox" label="Friday" {...friday}/>
            <Input type="checkbox" label="Saturday" {...saturday}/>
            <Input type="checkbox" label="Sunday" {...sunday}/>
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
    fields: ['name', 'programId', 'monday',
             'tuesday', 'wednesday', 'thursday',
             'friday', 'saturday', 'sunday'],
	validate
}, mapStateToProps, { createExercise })(ProgramsNew);
