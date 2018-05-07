import React, {Component} from 'react';
import { connect } from 'react-redux';
import Objective from './Objective'
import {Row} from 'react-bootstrap';
import { assert } from './test-object';
import { it } from '../utils/tester';
import levels from './levels/levels'


class LevelOutline extends Component {
	constructor() {
		super()
		this.state = {
			message: '',
			selectOne: '',
			selected: [],
			error: false,
			input0: '',
			input1: '',
			input2: '',
		}
	}

	handleClickAssert = (event) => {
		this.setState({
			selectOne: event.target.value
		})
	}

	runTest = (event) => {
		event.preventDefault();
		const {selectOne, message} = this.state

		const selectOneArgs = assert[selectOne].args;
		const inputs = [];

		for (let i = 0;i < selectOneArgs.length;i++) {
			inputs.push(event.target[selectOneArgs[i]].value)
		}

		let result = it(message)(assert[selectOne])(...inputs)

		let str = ''
		if (result === message) {
			 str =
					`
								it('${message}',function(){
									assert.${selectOne}(${inputs.join(',')})
								})
					`
			this.setState({
				selectOne: '',
				message: '',
				error: false,
				selected: [...this.state.selected, str],
				input0: '',
				input1: '',
				input2: ''
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
		const {message, selected, selectOne, error} = this.state
		let level = "level" + this.props.match.params.id;

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
					<hr />
					<div>
						{levels[level].buttons.map(button => (
							<button
							key={button}
							value={button}
							onClick={() => this.setState({input0: button})}
							>{button}</button>)
						)}
					</div>
				</Row>
				<div>
					<form onSubmit={this.runTest}>
						<label>
						    Message
						    <input
						    type="text"
						    name="message"
						    onChange={ (event) => this.setState({message: event.target.value})}
						    />
						</label>
						{selectOne ? assert[selectOne].args.map((arg,i) =>
							(<div key={arg}>
								<label>
								    {arg}
								    <input
								    type="text"
								    value={this.state["input"+i]}
								    name={arg}
								    onChange={ (event) => this.setState({["input" + i]: event.target.value})}
								    />
								</label>
							</div>)
							) : <span />
						}
						{selectOne ? <input type="submit" name="Submit" /> : <span /> }
						{error ? <div>Test Failed Please Try Again</div> : <span /> }
					</form>
				</div>
				<pre>
					<code>
						{
							`
							describe('Writing tests for ${levels[level].title}', function(){
								${selected.map(element => element)}
								it('${message}',function(){
							        assert.${selectOne}(${this.state.input0},${this.state.input1}${this.state.input2}})
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