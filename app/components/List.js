import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

export default class List extends Component {
	render() {
		let items = this.props.data.map(item => {
			return <ListGroupItem key={item._id}><Link to={`/${this.props.linkTo}/${item._id}`} query={{name: item.name}}>{item.name}</Link></ListGroupItem>;
		});
		return (
			<ListGroup>
        {items}
      </ListGroup>
		);
	}
}