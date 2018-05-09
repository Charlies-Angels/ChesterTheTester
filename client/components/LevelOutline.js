import React, {Component} from 'react';
import { connect } from 'react-redux';
import Objective from './Objective'
import {Row,Col} from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';
import { assert } from './test-object';
import { it } from '../utils/tester';
import levels from './levels/levels'
import {postCodeToSandbox, getLevelsThunk} from '../store/'


class LevelOutline extends Component {
	constructor() {
		super()
		this.state = {
			message: '',
			selectOne: '',
			selected: [],
			error: '',
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

	componentDidMount() {
		this.props.getLevelsThunk()
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
		this.props.postCodeToSandbox({sandbox, level: this.props.match.params.id})
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
					error: '',
					selected: [...this.state.selected, str1],
					input0: '',
					input1: '',
					input2: ''
				})
			}
			else {
				this.setState({
					error: res.sandbox
				})
			}
		})
	}

	render () {
		const methods = Object.keys(assert);
		const {message, selected, selectOne, error} = this.state
		const level = this.props.levels.find(lev => lev.id === Number(this.props.match.params.id));

		return (
			<div>
				<Row className="show-grid">
					<Col xs={6} md={4}>
						{level ? <AceEditor
						    mode="javascript"
						    onChange={(event) => console.log(event)}
						    theme="github"
						    readOnly={true}
						    value={level.function}
						    name="UNIQUE_ID_OF_DIV"
						    editorProps={{$blockScrolling: true}}
						    width="350px"
						    height="350px"
						/> : <span />
						}
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
					<hr />
					<div>
						{level ? level.buttons.map(button => (
							<button
							key={button}
							value={button}
							onClick={() => this.setState({input0: button})}
							>{button}</button>)
						) : <span />}
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
								    value={this.state['input' + i]}
								    name={arg}
								    onChange={ (event) => this.setState({['input' + i]: event.target.value})}
								    />
								</label>
							</div>)
							) : <span />
						}
						{selectOne ? <input type="submit" name="Submit" /> : <span /> }
						{error ? <div>{error}</div> : <span /> }
					</form>
				</div>
				<pre>
					<code>
						{level ?
							`
							describe('Writing tests for ${level.title}', function(){
								${selected.map(element => element)}
								it('${message}',function(){
							        assert.${selectOne}(${this.state.input0}${this.state.input1 ? ',' + this.state.input1 : ''}${this.state.input2 ? ',' + this.state.input2 : ''})
								})
							})
							` : null
						}
					</code>
				</pre>
			</div>
			)
	}

}

const mapStateToProps = (state) => {
	return {
		sandbox: state.sandbox,
		levels: state.levels
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		postCodeToSandbox: sandbox => dispatch(postCodeToSandbox(sandbox)),
		getLevelsThunk: () => dispatch(getLevelsThunk())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(LevelOutline)