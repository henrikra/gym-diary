import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExercises, activateProgram } from '../actions';
import List from './List';
import { Link } from 'react-router';

class Program extends Component {
	componentWillMount = () => {
    this.props.fetchExercises(this.props.params.programId);
    this.props.activateProgram(this.props.params.programId);
	}
	render() {
		return (
			<div className="container">
				<div className="main-content">
	        <div className="card-block">
		        <h3>{this.props.location.query.name}</h3>
            <Link to={'exercises/new'} className="btn btn-default">Add</Link>
            <List data={this.props.exercises} linkTo="exercises" />
        	</div>
        </div>
      </div>
		);
	}
}

function mapStateToProps(state) {
  return {
    exercises: state.exercises.all
  }
}

export default connect(mapStateToProps, { fetchExercises, activateProgram })(Program);