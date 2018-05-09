import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { assert } from '../test-object';
import { it } from '../../utils/tester';
import levels from '../levels/levels';

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
    // const {buttons, title} = levels[this.props.match.params.id - 1];
    const {buttons, title} = levels[0];
    return (
      <div className="layout-container">
        <Header active={this.props.level.level} />
      <div className="layout-body">
      <div className="code-block"><Objective /></div>
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

      </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    level: state.level,
  }
}

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

export default connect(mapState, null)(Layout)

