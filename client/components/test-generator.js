import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Row,Col} from 'react-bootstrap';
import brace from 'brace';
import { assert } from './test-object';
import { it } from '../utils/tester';
import {postCodeToGenerator, updateCode} from '../store/'
import AceEditor from 'react-ace'
import Describe from './simplified/describe';
import AssertButton from './simplified/assert-button';
import Header from './simplified/header';
import 'brace/mode/java';
import 'brace/theme/monokai';
import PrismCode from 'react-prism'
import ScrollArea from 'react-scrollbar';


class TestGenerator extends Component {
	constructor() {
		super()
		this.state = {
			selectOne: '',
			selected: [],
			output: '',
			inputTest1: '',
			inputTest2: '',
			message: '',
			describe: ''
		}
	}

	handleClickAssert = (method) => {
		this.setState({
			selectOne: method
		})
	}

	sendFunctionToSandbox = (event) => {
		event.preventDefault();

		this.props.postCodeToGenerator({input: this.props.generator})
		.then(res => {
			this.setState({output: res.sandbox})
		})
	}

	runTest = (event) => {
		event.preventDefault();
		const {selectOne, message, output} = this.state

		const selectOneArgs = assert[selectOne].args;
		const inputs = [];

		//not include actual input
		for (let i = 1;i < selectOneArgs.length;i++) {
			inputs.push(event.target[selectOneArgs[i]].value)
		}

		let sandbox = output;
		if (assert[selectOne].pre) sandbox = assert[selectOne].pre + sandbox;
		if (assert[selectOne].post) sandbox = sandbox + assert[selectOne].post;

		this.props.postCodeToGenerator({input: sandbox})
		.then(res => {
			//evaluate response using our assert function
			let result = it(message)(assert[selectOne])(res.sandbox, ...inputs)

			//if pass/fail
			if (result === message){
				const invokedFuncArr = this.props.generator.split('\n')
				const invokedFuncStr = invokedFuncArr[invokedFuncArr.length - 1]
				let str1 =
	`
	it('${message}',function(){
		assert.${selectOne}(${inputs.length ? invokedFuncStr + ',' + inputs.join(',') : invokedFuncStr})
	})
	`
				this.setState({
					selectOne: '',
					message: '',
					error: '',
					selected: [...this.state.selected, str1],
					inputTest1: '',
					inputTest2: '',
				})
			}
			else {
				this.setState({
					error: result
				})
			}
		})
	}

	render () {
		const methods = Object.keys(assert);
		const {selected, selectOne, output, message, describe, inputTest1, inputTest2} = this.state
		const invokedFuncArr = this.props.generator.split('\n')
		const invokedFuncStr = invokedFuncArr[invokedFuncArr.length - 1]
		return (
			<div className="layout-container">
				<Header />
				<div className="layout-body">
					<div className="left-side">
						<AceEditor
						    mode="javascript"
						    onChange={(event) => this.props.updateCode(event)}
						    theme="monokai"
						    readOnly={false}
						    value={this.props.generator}
						    name="ace"
						    height="350px"
						    width="350px"
						    editorProps={{$blockScrolling: true}}
						    style={{position: 'relative'}}	    
						/>
						<button
						type="clear"
						name="Clear"
						className="button-red"
						onClick={() => {this.props.updateCode('//Type functions here. Make sure to invoke your function! \n')}}
						>Clear Editor</button>
						<button
						type="cleartest"
						className="button-red"
						name="ClearTest"
						onClick={() => this.setState({selectOne: '', selected: [], output: '', inputTest1: '', inputTest2: '', message: '', describe: ''})}
						>Clear Tests</button>
						<button
						type="submit"
						className="button-blue"
						name="Submit"
						onClick={this.sendFunctionToSandbox}
						>Run function</button>
						<h5>Function output: {output}</h5>
					</div>
				</div>
				<div>
					<div className="right-side">
						<div className="test-block">
						<h5>Choose an assertion: </h5>
							<div className="display-assertions">
								{methods.map(method => (
									selectOne === method ?
									<div key={method} className="assertion">
										<AssertButton active method={method} onClick={() => this.handleClickAssert(method)} />
									</div> :
									<div key={method} className="assertion">
										<AssertButton method={method} onClick={() => this.handleClickAssert(method)} />
									</div>
								))}
							</div>
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
									<input
									type="submit"
									name="Submit"
									/>
								</form>
							}
							<Describe describe={describe} passedTests={selected} assertion={selectOne} actual={invokedFuncStr} input1={inputTest1} input2={inputTest2} it={message} />
						</div>
					</div>
				</div>
			</div>
			)
	}

}

const mapStateToProps = (state) => {
	return {
		generator: state.generator
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		postCodeToGenerator: sandbox => dispatch(postCodeToGenerator(sandbox)),
		updateCode: code => dispatch(updateCode(code))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(TestGenerator)