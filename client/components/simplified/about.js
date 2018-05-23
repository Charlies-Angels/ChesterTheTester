import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';


class About extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="layout-container transition-item about">
				<Header />
				<div className="layout-body">
					<div className="left-side">
						<div className="test-block">
	            			<h3>About Chester (Source Code)</h3>
	            			<a href="https://github.com/Charlies-Angels/testytester" rel="noopener noreferrer" target="_blank">Chester's Github</a>
	            			<img style={{height: '30%', width: '30%'}} src="/img/chester.svg" />
            			</div>
          			</div>
          			<div className="right-side">
          				<div className="test-block">
	          				<h3>About The Team Behind ChesterTheTester</h3>
	          				<div>
		          				<img style={{height: '25%', width: '25%'}} src="/img/caitlin.png" />
		          				<a href="https://github.com/caitlintrussell" rel="noopener noreferrer" target="_blank">Caitlin's Github</a>
	          				</div>
	          				<div>
		          				<img style={{height: '25%', width: '25%'}} src="/img/richard.png" />
		          				<a href="https://github.com/richardliang" rel="noopener noreferrer" target="_blank">Richard's Github</a>
	          				</div>
	          				<div>
		          				<img style={{height: '25%', width: '25%'}} src="/img/sam.png" />
		          				<a href="https://github.com/thesamkogan" rel="noopener noreferrer" target="_blank">Sam's Github</a>
	          				</div>
	          				<div>
		          				<img style={{height: '25%', width: '25%'}} src="/img/roman.png" />
		          				<a href="https://github.com/romanzalov" rel="noopener noreferrer" target="_blank">Roman's Github</a>
	          				</div>
          				</div>
          			</div>
				</div>
			</div>
		)
	}

}

const mapState = (state) => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapState, mapDispatchToProps)(About);
