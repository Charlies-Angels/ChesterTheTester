import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap'
import levels from './levels/levels'
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';


class Objective extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let level = "level" + this.props.match.params.id;

		return(
			<Col xs={6} md={4}>
				<AceEditor
				    mode="javascript"
				    onChange={(event) => console.log(event)}
				    theme="github"
				    readOnly={true}
				    value={levels[level]}
				    name="UNIQUE_ID_OF_DIV"
				    editorProps={{$blockScrolling: true}}
				    width="350px"
				    height="350px"
				/>

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