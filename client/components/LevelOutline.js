import React, {Component} from 'react';
import { connect } from 'react-redux';
import Objective from './Objective'
import Animation from './Animation';
import DragDrop from './DragDrop';
import {Row, Col, Grid} from 'react-bootstrap';

class LevelOutline extends Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			
			<Row className="show-grid">
				<Animation />
				<Objective />
				<DragDrop />
			</Row>
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

export default connect(mapStateToProps,mapDispatchToProps)(LevelOutline)