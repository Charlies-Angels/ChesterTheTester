import React, {Component} from 'react';
import { connect } from 'react-redux';
import Objective from './Objective'
import Animation from './Animation';
import DragDrop from './DragDrop';
import {Row} from 'react-bootstrap';
import { assert } from './test-object';

class LevelOutline extends Component {
	constructor() {
		super()
		this.state = {
			expected: "",
			actual: "",
			message: "",
			selectOne: "",
			selected: []
		}
	}

	handleClickAssert = (event) => {
		const {message, actual, expected, selected, selectOne} = this.state
		this.setState({
			selectOne: event.target.value
		})


		console.log(selectOne)
		console.log(assert[event.target.value](message,[actual,expected]))
	}
	
	runTest = (event) => {
		event.preventDefault();




		this.setState({
			selected: [...this.state.selected, event.target.value]
		})
		

	}

	render() {
		const methods = Object.keys(assert);
		const {message, actual, expected, selected, selectOne} = this.state
		console.log(assert["propertyVal"])
		return (
			<div>
				<Row className="show-grid">
					<Objective {...this.props} />
					<div>
						{methods.map(method => (
							<button 
							key={method}
							value={method}
							onClick={this.handleClickAssert}
							>{method}</button>
						))}
					</div>
				</Row>
				<div>
					<form onSubmit={this.runTest}>
						<label>
						    Message
						    <input 
						    type="text" 
						    name="message"
						    onChange={ (event)=> this.setState({message: event.target.value})}
						    />
						</label>
						{selectOne ? 
						  	(<div>
						  		<label>
								    Input 1
								    <input 
								    type="text" 
								    name="input1"
								    onChange={ (event)=> this.setState({expected: event.target.value})}
								    />
						  		</label>
							  	<label>
							    	Input 2
								    <input 
								    type="text" 
								    name="input2" 
								    onChange={ (event) => this.setState({actual: event.target.value})}
								    />
							  	</label>
							</div>) : null				
						}
					  	<input type="submit" name="Submit" />
					</form>
				</div>
				<pre>
					<code>
						{
							`
							describe('Writing tests for launchRocket', function(){ 
							  it('${message}',function(){
							    assert.${selectOne}(${actual},${expected})
							  })
							})
							`
						}
					</code>
				</pre>
			</div>
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