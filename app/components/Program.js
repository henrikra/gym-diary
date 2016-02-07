import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExercises, activateProgram } from '../actions';
import List from './List';
import SettingsCog from './SettingsCog';

class Program extends Component {
	componentWillMount = () => {
    this.props.fetchExercises(this.props.params.programId);
    this.props.activateProgram(this.props.params.programId);
	}
	render() {
		const cogItems = [{label: 'Add', onClick: () => this.props.history.push('exercises/new')}];
		return (
			<div className="container">
				<div className="main-content">
	        <div className="card-block">
		        <h3>{this.props.location.query.name}</h3>
            <SettingsCog items={cogItems} />
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