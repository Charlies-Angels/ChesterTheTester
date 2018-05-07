import React, {Component} from 'react';
import { connect } from 'react-redux';
import Objective from './Objective'
import {Row} from 'react-bootstrap';
import { assert } from './test-object';
import { it } from '../utils/tester';

class LevelOutline extends Component {
	constructor() {
		super()
		this.state = {
			input1: '',
			input2: '',
			message: '',
			selectOne: '',
			selected: [],
			error: false
		}
	}

	handleClickAssert = (event) => {
		this.setState({
			selectOne: event.target.value
		})
	}

	runTest = (event) => {
		event.preventDefault();
		const {selectOne, input1, input2, message} = this.state
		const argsSelectOne = assert[selectOne].args;


		let result = it(message)(assert[selectOne])(...argsSelectOne)

		console.log(result)

		let str = ''
		if (result === message) {
			 str =
					`
								it('${message}',function(){
									assert.${selectOne}(${input2},${input1})
								})
					`
			this.setState({
				selectOne: '',
				input1: '',
				input2: '',
				message: '',
				error: false,
				selected: [...this.state.selected, str]
			})
		}
		else {
			this.setState({
				error: true
			})
		}
	}

	render() {
		const methods = Object.keys(assert);

		const {message, input2, input1, selected, selectOne, error} = this.state

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
						{selectOne ? assert[selectOne].args.map(arg =>
						  	(<div key={arg}>
						  		<label>
								    {arg}
								    <input
								    type="text"
								    name={arg}
								    onChange={ (event)=> this.setState({input1: event.target.value})}
								    />
						  		</label>
							</div>)
							) : <span />
						}
					  	<input type="submit" name="Submit" />
					  	{error ? <div>Test Failed Please Try Again</div> : <span /> }
					</form>
				</div>
				<pre>
					<code>
						{
							`
							describe('Writing tests for launchRocket', function(){
								${selected.map(element => element)}
								it('${message}',function(){
							        assert.${selectOne}(${input2},${input1})
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