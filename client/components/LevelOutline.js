import React, {Component} from 'react';
import { connect } from 'react-redux';
import Objective from './Objective'
import {Row} from 'react-bootstrap';
import { assert } from './test-object';
import { it } from '../utils/tester';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';


class LevelOutline extends Component {
	constructor() {
		super()
		this.state = {
			message: '',
			selectOne: '',
			selected: [],
			error: false,
		}
	}

	handleClickAssert = (event) => {
		this.setState({
			selectOne: event.target.value
		})
	}

	runTest = (event) => {
		event.preventDefault();
		console.log(this.state)

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
						{selectOne ? assert[selectOne].args.map(arg =>
							(<div key={arg}>
								<label>
								    {arg}
								    <input
								    type="text"
								    name={arg}
								    onChange={ (event) => this.setState({[event.target.name]: event.target.value})}
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
							describe('Writing tests for launchRocket', function(){
								${selected.map(element => element)}
								it('${message}',function(){
							        assert.${selectOne}(${this.state.actual})
								})
							})
							`
						}
					</code>
				</pre>
				<AceEditor
				    mode="javascript"
				    onChange={(event) => console.log(event)}
				    theme="github"
				    readOnly={true}
				    name="UNIQUE_ID_OF_DIV"
				    editorProps={{$blockScrolling: true}}
				/>
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