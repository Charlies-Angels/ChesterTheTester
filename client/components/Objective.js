import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap'

class Objective extends Component {
	constructor() {
		super()
	}

	render() {
		return(
			<Col xs={6} md={4}>
				<pre><code>
					{
						`
						const launchRocket = () => {
						  let countDown = [];
						  let counter = 10;
						  while (counter>-1) {
						    countDown.push(counter);
						    counter--;
						  } 
						  return countDown;
						 }
						 launchRocket();
						`
					}
				</code></pre>
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