import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { assert } from '../test-object';
import { it } from '../../utils/tester';
import levels from '../levels/levels';
import {postCodeToSandbox} from '../../store'

import Header from './header';
import Objective from './objective';
class Layout extends Component {
  constructor(props) {
    super(props);
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
    selectOneArgs.forEach(arg => inputs.push(arg.value))
		// for (let i = 0;i < selectOneArgs.length;i++) {
		// 	inputs.push(event.target[selectOneArgs[i]].value)
    // }

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
    // const {buttons, title} = levels[this.props.match.params.id - 1];
    const {buttons, title} = levels[0];
    return (
      <div className="layout-container">
        <Header active={this.props.level.level} />

      <div className="layout-body">

        <div className="body-left"/>
      <div className="code-block"><Objective title={title} /></div>
      <div className="test-keyboard">{methods.map(method => (
        <button
        key={method}
        className="button-test"
        value={method}
        onClick={this.handleClickAssert}
        >{method}</button>
      ))}
      <hr />
    <div>
      {buttons.map(button => (
        <button
        key={button}
        className="button-test"
        value={button}
        onClick={() => this.setState({input0: button})}
        >{button}</button>
        )
      )}
    </div>
      </div>
      <div className="body-right" />
      </div>
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
        <div>
				<pre>
					<code>
						{
							`
							describe('Writing tests for ${title}', function(){
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
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    level: state.level,
		sandbox: state.sandbox
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		postCodeToSandbox: sandbox => dispatch(postCodeToSandbox(sandbox))
	}
}

export default connect(mapState, null)(Layout)

