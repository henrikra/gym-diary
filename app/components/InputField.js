import React from 'react';
import { Input } from 'react-bootstrap';

const validationState = field => {
	return field.touched && field.invalid ? 'error' : '';
}

const renderError = field => {
	return field.touched ? field.error : '';
}

const InputField = ({ field, type, label}) => {
	return (
		<Input
	    type={type}
	    label={label}
	    help={renderError(field)}
	    bsStyle={validationState(field)}
	    {...field} />
	);
}

export default InputField;