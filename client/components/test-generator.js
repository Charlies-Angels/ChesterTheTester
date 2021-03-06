import React, {Component} from 'react';
import { connect } from 'react-redux';
import brace from 'brace';
import {postCodeToGenerator, updateCode} from '../store/'
import AceEditor from 'react-ace'
import Describe from './simplified/describe';
import AssertButton from './simplified/assert-button';
import Header from './simplified/header';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night';


class TestGenerator extends Component {
	constructor() {
		super()
		this.state = {
			selectOne: '',
			selected: [],
			inputTest1: '',
			inputTest2: '',
			message: '',
			describe: '',
			error: '',
			success: '',
		}
	}

	handleClickAssert = (method) => {
		this.setState({
			selectOne: method,
			inputTest2: '',
		})
	}

	runTest = async (event) => {
		event.preventDefault();
		const {selectOne, message, inputTest2, inputTest1, selected} = this.state
		const inputs = [inputTest1, inputTest2];
		let invokedFuncArr = this.props.generator.trim().split('\n')
		let invokedFuncStr = invokedFuncArr.pop().replace(/;/g, '')
		let generatorFunc = invokedFuncArr.join('\n')

		const evalAssert = await this.props.postCodeToGenerator({generator: generatorFunc, input: invokedFuncStr, assert: selectOne, itBlock: message, inputs})
		if (evalAssert.sandbox === `'${message}'`){
			let itString =
`
	it('${message}',function(){
		assert.${selectOne}(${inputs[0] ? invokedFuncStr + ',' + inputs.join(',').replace(/,\s*$/, '') : invokedFuncStr})
	})
`
			this.setState({
				selectOne: '',
				message: '',
				error: '',
				success: evalAssert.sandbox,
				selected: [...selected, itString],
				inputTest1: '',
				inputTest2: '',
			})
		}
		else {
			this.setState({
				success: '',
				error: evalAssert.sandbox
			})
		}
	}

	render () {
		if (!this.props.asserts) return <span />
		const {selected, selectOne, message, describe, inputTest1, inputTest2, error, success} = this.state
		const { asserts } = this.props
		const invokedFuncArr = this.props.generator.trim().split('\n')
		const invokedFuncStr = invokedFuncArr[invokedFuncArr.length - 1]
		return (
			<div className="layout-container transition-item generator">
				<Header active="editor" />
				<div className="layout-body">
					<div className="left-side">
						<AceEditor
						    mode="javascript"
						    onChange={(event) => this.props.updateCode(event)}
						    theme="tomorrow_night"
						    readOnly={false}
						    value={this.props.generator}
						    name="ace"
						    height="70vh"
						    width="50vw"
						    editorProps={{$blockScrolling: true}}
                fontSize= "18px"
						/>
						<button
						type="clear"
						name="Clear"
						className="button-red"
						onClick={() => {this.props.updateCode('//Type functions here. Make sure to invoke your function! \n' )}}
						>Clear Editor</button>
						<button
						type="cleartest"
						className="button-red"
						name="ClearTest"
						onClick={() => this.setState({selectOne: '', selected: [], inputTest1: '', inputTest2: '', message: '', describe: ''})}
						>Clear Tests</button>
					</div>

					<div className="right-side">
						<div className="test-block">
						<a href="http://www.chaijs.com/api/assert/" rel="noopener noreferrer" target="_blank">Open Chai Documentation</a>
						<h5>Choose an assertion: </h5>
						<div className="display-assertions">
							{asserts.map(method => (
								selectOne === method.assert ?
								<div key={method.assert} className="assertion">
									<AssertButton active method={method.assert} onClick={() => this.handleClickAssert(method.assert)} />
								</div> :
								<div key={method.assert} className="assertion">
									<AssertButton method={method.assert} onClick={() => this.handleClickAssert(method.assert)} />
								</div>
							))}
						</div>
							<form className="gimme-space" onSubmit={this.runTest}>
								<label>
								    Write a describe message for your tests:
								    <input
								    type="text"
								    name="describe"
                    className="generator-input"
								    onChange={ (event) => this.setState({describe: event.target.value})}
								    />
								</label>
								{selectOne &&
								<div>
								<label>
								    Write an individual It block message for your tests:
								    <input
								    type="text"
								    name="message"
                    className="generator-input"
								    onChange={ (event) => this.setState({message: event.target.value})}
								    />
								</label>
								{asserts.find(el => el.assert === selectOne).args.slice(1).map((arg, i) =>
									(<div key={arg}>
										<label>
										    {arg}
										    <input
										    type="text"
										    value={this.state['inputTest' + (i + 1)]}
                        className="generator-input"
										    name={arg}
										    onChange={ (event) => this.setState({['inputTest' + (i + 1)]: event.target.value})}
										    />
										</label>
									</div>)
									)}
								<input
								className={(!message) ? 'button-inactive' : 'button-blue'}
								type="submit"
								name="Submit"
								disabled={!message}
								/>
								</div>
								}
							</form>
							<div>{error ? error : 'Passed Test!!! ' + success}</div>
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
		generator: state.generator,
		asserts: state.asserts
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		postCodeToGenerator: sandbox => dispatch(postCodeToGenerator(sandbox)),
		updateCode: code => dispatch(updateCode(code))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestGenerator)
