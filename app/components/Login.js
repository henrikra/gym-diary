import React, { Component } from 'react';
import auth from '../auth';
import { Alert, Button } from 'react-bootstrap';

export default class Login extends Component {
	state = {
		email: '',
		password: '',
		message: ''
	}
	handleSubmit = event => {
		event.preventDefault();
		auth.login({
			email: this.state.email,
			password: this.state.password
		}, ({ success, message }) => {
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
								<h3>Login</h3>
								{this.state.message && (
									<Alert bsStyle="danger">{this.state.message}</Alert>
								)}
								<form onSubmit={this.handleSubmit}>
								  <div className="form-group">
								    <label htmlFor="email">Email</label>
								    <input onChange={this.handleInputChange} type="email" className="form-control" id="email" placeholder="Email" />
								  </div>
								  <div className="form-group">
								    <label htmlFor="password">Password</label>
								    <input onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
								  </div>
								  <Button type="submit">Login</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
