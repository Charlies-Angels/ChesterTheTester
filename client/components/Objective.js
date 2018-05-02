import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap'
import levels from './levels/levels'

class Objective extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let level = "level" + this.props.match.params.id;

		return(
			<Col xs={6} md={4}>
				<pre>
					<code>
						{levels[level]}
					</code>
				</pre>
			</Col>
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

export default connect(mapStateToProps,mapDispatchToProps)(Objective)