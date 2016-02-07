import React, { Component } from 'react';
import { connect } from 'react-redux';
import auth from '../auth';
import List from './List';
import { fetchPrograms } from '../actions';
import { Link } from 'react-router';

class Programs extends Component {
	componentWillMount() {
    this.props.fetchPrograms(auth.getUserId());
	}
  render() {
    return (
      <div className="container">
        <div className="main-content">
          <div className="card-block">
            <h3>Your Programs</h3>
            <Link to="programs/new">Add</Link>
            <List data={this.props.programs} linkTo="programs" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    programs: state.programs.all
  };
}

export default connect(mapStateToProps, { fetchPrograms })(Programs);
