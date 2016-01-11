import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const Home = function() {
	return (
		<div>
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
			<div className="container">
				<div className="main-content">
					<div className="row">
						<div className="col-sm-4">
							<div className="feature">
								<Glyphicon className="feature--icon" glyph="phone" />
								<h3 className="feature--heading">Mobile</h3>
								<p className="feature--description">Laboris ex. Est facilisis molestie. Inceptos eros cillum. Commodo iaculis. Veniam viverra. Malesuada penatibus aptent.</p>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="feature">
								<Glyphicon className="feature--icon" glyph="ok" />
								<h3 className="feature--heading">Consistent</h3>
								<p className="feature--description">Laboris ex. Est facilisis molestie. Inceptos eros cillum. Commodo iaculis. Veniam viverra. Malesuada penatibus aptent.</p>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="feature">
								<Glyphicon className="feature--icon" glyph="stats" />
								<h3 className="feature--heading">Insightful</h3>
								<p className="feature--description">Laboris ex. Est facilisis molestie. Inceptos eros cillum. Commodo iaculis. Veniam viverra. Malesuada penatibus aptent.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
