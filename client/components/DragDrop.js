import React, {Component} from 'react';
import { connect } from 'react-redux';

class DragDrop extends Component {
	constructor() {
		super()
	}

	render() {
		return(
			<div></div>
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