import React, {Component} from 'react';
import { connect } from 'react-redux';
import Objective from './Objective'
import {Row} from 'react-bootstrap';
import { assert } from './test-object';
import { it } from '../utils/tester';
import levels from './levels/levels'
import {postCodeToSandbox} from '../store/sandbox'


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

		//not include actual input
		for (let i = 1;i < selectOneArgs.length;i++) {
			inputs.push(event.target[selectOneArgs[i]].value)
		}

		//check for prefixes or postfixes in test objects
		let sandbox = this.state.input0;
		if (assert[selectOne].pre) sandbox = assert[selectOne].pre + sandbox;
		if (assert[selectOne].post) sandbox = sandbox + assert[selectOne].post;

		//post to sandbox and evaluate response. send in appropriate level in req.body as well
		this.props.postCodeToSandbox({sandbox, level: this.props.match.params.id-1})
		.then(res => {
			//evaluate response using our assert function
			let result = it(message)(assert[selectOne])(res.sandbox, ...inputs)

			//if pass/fail
			if (result === message){
				let str1 =
				`
				        it('${message}',function(){
				            assert.${selectOne}(${inputs.length ? this.state.input0 + ',' + inputs.join(',') : this.state.input0})
				        })
				`
				this.setState({
					selectOne: '',
					message: '',
					error: false,
					selected: [...this.state.selected, str1],
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
		})
	}

	render() {
		const methods = Object.keys(assert);
		const {message, selected, selectOne, error} = this.state
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
						{levels[this.props.match.params.id - 1].buttons.map(button => (
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
						{selectOne ? (<label>
						    Message
						    <input
						    type="text"
						    name="message"
						    onChange={ (event) => this.setState({message: event.target.value})}
						    />
						</label>)
						: <span />}
						{selectOne ? assert[selectOne].args.map((arg, i) =>
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
							describe('Writing tests for ${levels[this.props.match.params.id-1].title}', function(){
								${selected.map(element => element)}
								it('${message}',function(){
							        assert.${selectOne}(${this.state.input0}${this.state.input1 ? ',' + this.state.input1 : ''}${this.state.input2 ? ',' + this.state.input2 : ''})
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
		sandbox: state.sandbox
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		postCodeToSandbox: sandbox => dispatch(postCodeToSandbox(sandbox))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(LevelOutline)