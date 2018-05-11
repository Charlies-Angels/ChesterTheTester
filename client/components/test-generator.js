import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Row,Col} from 'react-bootstrap';
import brace from 'brace';
import { assert } from './test-object';
import { it } from '../utils/tester';
import {postCodeToGenerator} from '../store/'
import AceEditor from 'react-ace'
import 'brace/mode/java';
import 'brace/theme/monokai';

class TestGenerator extends Component {
	constructor() {
		super()
		this.state = {
			selectOne: '',
			selected: [],
			input: '//Type functions here. Make sure to invoke your function! \n',
			output: '',
			inputTest1: '',
			inputTest2: '',
			message: '',
			describe: ''
		}
	}

	handleClickAssert = (event) => {
		this.setState({
			selectOne: event.target.value
		})
	}

	sendFunctionToSandbox = (event) => {
		event.preventDefault();

		this.props.postCodeToGenerator({input: this.state.input})
		.then(res => {
			this.setState({output: res.sandbox})
		})
	}

	// runTest = (event) => {
	// 	event.preventDefault();
	// 	const {selectOne, message} = this.state

	// 	const selectOneArgs = assert[selectOne].args;
	// 	const inputs = [];

	// 	//not include actual input
	// 	for (let i = 1;i < selectOneArgs.length;i++) {
	// 		inputs.push(event.target[selectOneArgs[i]].value)
	// 	}

	// 	//check for prefixes or postfixes in test objects
	// 	let sandbox = this.state.input0;
	// 	if (assert[selectOne].pre) sandbox = assert[selectOne].pre + sandbox;
	// 	if (assert[selectOne].post) sandbox = sandbox + assert[selectOne].post;

	// 	//post to sandbox and evaluate response. send in appropriate level in req.body as well
	// 	this.props.postCodeToSandbox({sandbox, level: this.props.match.params.id})
	// 	.then(res => {
	// 		//evaluate response using our assert function
	// 		let result = it(message)(assert[selectOne])(res.sandbox, ...inputs)

	// 		//if pass/fail
	// 		if (result === message){
	// 			let str1 =
	// 			`
	// 			        it('${message}',function(){
	// 			            assert.${selectOne}(${inputs.length ? this.state.input0 + ',' + inputs.join(',') : this.state.input0})
	// 			        })
	// 			`
	// 			this.setState({
	// 				selectOne: '',
	// 				message: '',
	// 				error: '',
	// 				selected: [...this.state.selected, str1],
	// 				input0: '',
	// 				input1: '',
	// 				input2: ''
	// 			})
	// 		}
	// 		else {
	// 			this.setState({
	// 				error: res.sandbox
	// 			})
	// 		}
	// 	})
	// }

	render () {
		const methods = Object.keys(assert);
		const {selected, selectOne, input, output, message, describe, inputTest1, inputTest2} = this.state
		const invokedFuncArr = input.split('\n')
		const invokedFuncStr = invokedFuncArr[invokedFuncArr.length-1]
		return (
			<div>
				<Row className="show-grid">
					<Col xs={6} md={4}>
						<AceEditor
						    mode="javascript"
						    onChange={(event) => this.setState({input: event})}
						    theme="monokai"
						    readOnly={false}
						    value={this.state.input}
						    name="ace"
						    editorProps={{$blockScrolling: true}}
						    width="350px"
						    height="350px"
						/>
						<button
						type="submit"
						name="Submit"
						onClick={this.sendFunctionToSandbox}
						>Run function</button>
						<div>Function output: {output}</div>
					</Col>
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
					{selectOne &&
						<form onSubmit={this.runTest}>
						<label>
						    Describe message
						    <input
						    type="text"
						    name="describe"
						    onChange={ (event) => this.setState({describe: event.target.value})}
						    />
						</label>
						<label>
						    It message
						    <input
						    type="text"
						    name="message"
						    onChange={ (event) => this.setState({message: event.target.value})}
						    />
						</label>
						<label>{output}</label>
						{assert[selectOne].args.slice(1).map((arg, i) =>
							(<div key={arg}>
								<label>
								    {arg}
								    <input
								    type="text"
								    value={this.state['inputTest' + (i + 1)]}
								    name={arg}
								    onChange={ (event) => this.setState({['inputTest' + (i + 1)]: event.target.value})}
								    />
								</label>
							</div>)
							)}
						<input type="submit" name="Submit" />
						</form>
						}
				</div>
				<pre>
					<code>
							{ `
							describe('Writing tests for ${describe}', function(){
								${selected.map(element => element)}
								it('${message}',function(){
							        assert.${selectOne}(${invokedFuncStr}${inputTest1 ? ',' + inputTest1 : ''}${inputTest2 ? ',' + inputTest2 : ''})
								})
							})
							` }
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
		postCodeToGenerator: sandbox => dispatch(postCodeToGenerator(sandbox)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(TestGenerator)