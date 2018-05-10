import React, { Component } from 'react';
import { connect } from 'react-redux';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/chaos';
import Header from './header';
import Objective from './objective';
import Editor from './editor';
import { assert } from '../test-object';
import { it } from '../../utils/tester';

import { postCodeToSandbox, getLevelsThunk, setLevel } from '../../store';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      selectOne: '',
      selected: [],
      error: '',
      actual: '',
      input1: '',
      input2: '',
      tests: [],
      responses: [],
    };
  }
  handleClickAssert = (e, method) => {
    e.preventDefault();
    this.setState({
      selectOne: method,
    });
  };
  componentDidMount() {
    this.props.setLevelOnLoad(this.props.match.params.id);
    this.props.getLevelsThunk();
  }

  clearForm = () => {
    this.setState({
      selectOne: '',
      message: '',
      error: '',
      selected: [],
      actual: '',
      input1: '',
      input2: '',
    });
  };

  runTest = event => {
    event.preventDefault();
    const { selectOne, message } = this.state;
    const inputs = [this.state.input1];

    let sandbox = this.state.actual;
    if (assert[selectOne].pre) sandbox = assert[selectOne].pre + sandbox;
    if (assert[selectOne].post) sandbox = sandbox + assert[selectOne].post;

    this.props
      .postCodeToSandbox({ sandbox, level: this.props.match.params.id })
      .then(res => {

        let result = it(message)(assert[selectOne])(res.sandbox, ...inputs);

        this.setState({
          responses: [...this.state.responses, result]
        })
        console.log(this.state.responses)

        if (result === message) {
          let str = `
  it('${message}',function(){
    assert.${selectOne}(${
            inputs[0]
              ? this.state.actual + ',' + inputs.join(',')
              : this.state.actual
          })
  })
        `;
          this.setState({
            tests: [...this.state.tests, str],
          });

        }
        this.clearForm();
      });
  };
  render() {
    const methods = Object.keys(assert);
    const {
      message,
      selected,
      actual,
      input1,
      input2,
      selectOne,
      error,
    } = this.state;

    if (!this.props.levels.length) return <span />;
    const level = this.props.levels.find(
      lev => lev.id === Number(this.props.match.params.id)
    );
    return (
      <div className="layout-container">
        <Header active={+this.props.match.params.id} />
        <div className="layout-body">
          <div className="body-left" />
          <div className="code-block">
            <Objective
              level={this.props.match.params.id}
              message={this.state.message}
              title={level.title}
              responses={this.state.responses}
            />
            <Editor func={level.function} />
          </div>
          <div className="test-keyboard">
            <div className="gimme-space">
              What are you testing? <br />
              {level.buttons.map(button => (
                <button
                  key={button}
                  className="button-red"
                  value={button}
                  onClick={() => this.setState({ actual: button })}
                >
                  {button}
                </button>
              ))}
            </div>
            <div className="gimme-space">
              Test Assertions<br />
              {methods.map(method => (
                <button
                  key={method}
                  className="button-blue"
                  value={method}
                  onClick={e => this.handleClickAssert(e, method)}
                >
                  {method}
                </button>
              ))}
            </div>
            <div className="gimme-space">
              Describe the Test<br />
              <input
                className="input-yellow-l"
                placeholder="write a message explaining what you're testing"
                value={this.state.message}
                type="text"
                name="message"
                onChange={event =>
                  this.setState({ message: event.target.value })
                }
              />
            </div>
            {selectOne &&
              assert[selectOne].args.slice(1).map((arg, i) => (
                <div key={arg} className="gimme-space">
                  {`${arg[0].toUpperCase()}${arg.slice(1).toLowerCase()}:`}
                  <br />
                  <input
                    className="input-yellow-sm"
                    placeholder="the expected output"
                    type="text"
                    value={this.state['input' + (i + 1)]}
                    name={arg}
                    onChange={event =>
                      this.setState({ ['input' + (i + 1)]: event.target.value })
                    }
                  />
                </div>
              ))}
            <div className="send-test">
              <div className="clear">
                <button className="button-blue" onClick={this.clearForm}>
                  Clear
                </button>
              </div>
              <div className="sandbox-send">
                <button className="button-red" onClick={this.runTest}>
                  Test it!
                </button>
              </div>
            </div>

            {level && (
              <div className="gimme-space">
                <AceEditor
                  mode="javascript"
                  onChange={event => console.log(event)}
                  theme="chaos"
                  height="150px"
                  readOnly={true}
                  value={`describe('Writing tests for ${
                    level.title
                  }', function(){${selected.map(element => element)}
  it('${message}',function(){
        assert.${selectOne}(${actual}${input1 ? ',' + input1 : ''}${
                    input2 ? ',' + input2 : ''
                  })
  })
})`}
                  name="UNIQUE_ID_OF_DIV"
                  editorProps={{ $blockScrolling: true }}
                  highlightActiveLine={false}
                  highlightGutterLine={false}
                  setOptions={{ cursorStyle: 'thin' }}
                />
              </div>
            )}
          </div>
          <div className="body-right" />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    level: state.level,
    levels: state.levels,
    sandbox: state.sandbox,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postCodeToSandbox: sandbox => dispatch(postCodeToSandbox(sandbox)),
    getLevelsThunk: () => dispatch(getLevelsThunk()),
    setLevelOnLoad: level => dispatch(setLevel(level)),
  };
};

export default connect(mapState, mapDispatchToProps)(Layout);
