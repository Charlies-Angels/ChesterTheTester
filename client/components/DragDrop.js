import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap';

class DragDrop extends Component {
	constructor() {
		super()
	}

	render() {
		return(
			<Col xs={6} md={4}>DragDrop</Col>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(DragDrop)