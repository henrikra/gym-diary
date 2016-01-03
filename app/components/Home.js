import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Home extends Component {
	render() {
		return (
			<header className="home-header">
				<div className="home-header--container container">
					<div className="row">
						<div className="col-sm-5 col-sm-push-7 col-xs-10 col-xs-push-1">
							<div className="home-header--welcome-container">
								<h1 className="home-header--heading">Gym Diary</h1>
								<p className="home-header--description">Write your gym results here with mobile phone. Notebooks are in the past!</p>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}