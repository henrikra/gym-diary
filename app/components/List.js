import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

const List = ({ data, linkTo }) => {
	const items = data.map(item => {
		return (
			<ListGroupItem key={item._id}>
				<Link to={`/${linkTo}/${item._id}`} query={{name: item.name}}>{item.name}</Link>
			</ListGroupItem>
		);
	});
	return (
		<ListGroup>
      {items}
    </ListGroup>
	);
}

export default List;