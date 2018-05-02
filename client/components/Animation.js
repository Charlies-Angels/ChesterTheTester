import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap';


class Animation extends Component {
	constructor() {
		super()
	}

	render() {
		return(
			<Col xs={6} md={4}>Animation</Col>
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

export default connect(mapStateToProps,mapDispatchToProps)(Animation)