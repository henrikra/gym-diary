import React, { Component } from 'react';
import $ from 'jquery';

export default class Login extends Component {
	state = {
		email: '',
		password: ''
	}
	handleSubmit = () => {
		$.ajax({
			url: '/login',
			dataType: 'json',
			type: 'POST',
			data: {
				email: this.state.email,
				password: this.state.password
			},
			success: (data) => {
				this.props.history.push('/');
			},
			error: function(data) {
				console.log(data);
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
								<form onSubmit={this.handleSubmit}>
								  <div className="form-group">
								    <label htmlFor="email">Email</label>
								    <input onChange={this.handleInputChange} type="email" className="form-control" id="email" placeholder="Email" />
								  </div>
								  <div className="form-group">
								    <label htmlFor="password">Password</label>
								    <input onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
								  </div>
								  <button type="submit" className="btn">Login</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}