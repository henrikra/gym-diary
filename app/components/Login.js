import React, { Component } from 'react';

export default class Login extends Component {
	render() {
		return (
			<div className="container">
				<div className="main-content">
					<div className="row">
						<div className="col-md-6 col-md-push-3 col-sm-8 col-sm-push-2">
							<div className="card-block">
								<h3>Login</h3>
								<form>
								  <div className="form-group">
								    <label htmlFor="input-email">Email</label>
								    <input type="email" className="form-control" id="input-email" placeholder="Email" />
								  </div>
								  <div className="form-group">
								    <label htmlFor="input-password">Password</label>
								    <input type="password" className="form-control" id="input-password" placeholder="Password" />
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