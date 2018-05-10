import React, {Component} from 'react';
import { connect } from 'react-redux';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/chaos';

import Header from './header';
import Objective from './objective';
import { assert } from '../test-object';
import { it } from '../../utils/tester';
import levels from '../levels/levels';
import {postCodeToSandbox} from '../../store'

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
			selectOne: '',
			selected: [],
			error: false,
			actual: '',
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
				actual: '',
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
    const {message, selected, actual, selectOne, error} = this.state
    // const {buttons, title} = levels[this.props.match.params.id - 1];
    const {buttons, title} = levels[0];
    const codeSnippet = `
describe('Writing tests for ${title}', function(){
  ${selected.map(element => element)}
  it('${message}',function(){
        assert.${selectOne}(${this.state.actual}${this.state.input1 ? ',' + this.state.input1 : ''}${this.state.input2 ? ',' + this.state.input2 : ''})
  })
})
`
    return (
      <div className="layout-container">
        <Header active={this.props.level.level} />
      <div className="layout-body">

        <div className="body-left"/>
      <div className="code-block">
        <Objective title={title} />
      </div>
      <div className="test-keyboard">
        <div>
      What are you testing? <br />
      {buttons.map(button => (
        <button
        key={button}
        className="button-red"
        value={button}
        onClick={() => this.setState({actual: button})}
        >{button}</button>
        )
      )}
      </div>
      <div>
        Test Functions<br />
      {methods.map(method => (
        <button
        key={method}
        className="button-blue"
        value={method}
        onClick={this.handleClickAssert}
        >{method}</button>
      ))}
      </div>
      Describe the Test<br />
        <input
        className="button-yellow"
        type="text"
        name="message"
        onChange={ (event) => this.setState({message: event.target.value})}
        />

      {actual && selectOne &&
    assert[selectOne].args.slice(1).map((arg, i) => (
      <div key={arg}>
            {`${arg[0].toUpperCase()}${arg.slice(1).toLowerCase()}:`}<br />
            <input
            className="button-red"
            type="text"
            value={this.state['input' + i]}
            name={arg}
            onChange={ (event) => this.setState({['input' + i]: event.target.value})}
            />
      </div>))}

        <AceEditor
			    mode="javascript"
			    onChange={(event) => console.log(event)}
			    theme="chaos"
          height="150px"
			    readOnly={true}
			    value={codeSnippet}
			    name="UNIQUE_ID_OF_DIV"
			    editorProps={{$blockScrolling: true}}
          highlightActiveLine={false}
          highlightGutterLine={false}
          setOptions={{cursorStyle: 'thin'}}
			/>
      </div>
      <div className="body-right" />
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

