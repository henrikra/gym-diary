import React, { Component } from 'react';
import $ from 'jquery';
import { Alert, Button } from 'react-bootstrap';

export default class Register extends Component {
	state = {
		email: '',
		password: '',
		passwordRepeat: '',
		message: ''
	}
	handleSubmit = event => {
		event.preventDefault();
		const email = this.state.email.trim();
		const password = this.state.password.trim();
		const passwordRepeat = this.state.passwordRepeat.trim();
		if (!email || !password || !passwordRepeat) {
			return this.setState({message: 'Please fill all fields'});
		}
		$.ajax({
			url: '/api/trainers/register',
			type: 'POST',
			data: {
				email,
				password,
				passwordRepeat
			}
		})
		.done(({ success, message }) => {
			if (success) {
				this.props.history.push('/');
			} else {
				this.setState({ message });
			}
		});
	}
	handleInputChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}
	render() {
		return (
			<div className="container">
				<div className="main-content">
					<div className="row">
						<div className="col-md-6 col-md-push-3 col-sm-8 col-sm-push-2">
							<div className="card-block">
								<h3>Register</h3>
								{this.state.message && (
									<Alert bsStyle="danger">{this.state.message}</Alert>
								)}
								<form onSubmit={this.handleSubmit}>
								  <div className="form-group">
								    <label htmlFor="email">Email</label>
								    <input value={this.state.email} onChange={this.handleInputChange} type="email" className="form-control" id="email" placeholder="Email" />
								  </div>
								  <div className="form-group">
								    <label htmlFor="password">Password</label>
								    <input value={this.state.password} onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
								  </div>
								  <div className="form-group">
								    <label htmlFor="passwordRepeat">Repeat password</label>
								    <input value={this.state.passwordRepeat} onChange={this.handleInputChange}  type="password" className="form-control" id="passwordRepeat" placeholder="Repeat password" />
								  </div>
								  <Button type="submit">Register</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
