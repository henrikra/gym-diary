import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import auth from '../auth';
import AddInput from './AddInput';
import List from './List';
import { fetchPrograms } from '../actions';

class Programs extends Component {
	componentDidMount() {
    this.props.fetchPrograms(auth.getUserId());
	}
  addNew = (program) => {
    const data = {
      program,
      trainerId: auth.getUserId()
    };
    // Ajax post to save new program
    $.ajax({
      type: 'post',
      url: '/api/programs',
      data
    })
    .done(programs => {
      this.setState({ programs });
    })
    .fail(res => {
      console.log('Error.', res);
    });
  }
  render() {
    return (
      <div className="container">
        <div className="main-content">
          <div className="card-block">
            <h3>Your Programs</h3>
            <AddInput
              placeholder="Add new program..."
              onSubmit={this.addNew} />
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
