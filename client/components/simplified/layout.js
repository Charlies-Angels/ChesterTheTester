import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header';
import Objective from './objective';
import Editor from './editor';
import Describe from './describe';
import { assert } from '../test-object';
import { it } from '../../utils/tester';
import PrismCode from 'react-prism';
import 'prismjs';

import { postCodeToSandbox, getLevelsThunk, setLevel } from '../../store';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOne: '',
      input1: '',
      input2: '',
    };
  }
  handleClickAssert = (e, method) => {
    e.preventDefault();
    this.setState({
      selectOne: method,
    });
  };
  componentDidMount() {
    // CHANGE BELOW TO REQ PARAMS IN REUSABLE VERSION
    this.props.setLevelOnLoad(0);
    this.props.getLevelsThunk();
  }

  clearForm = () => {
    this.setState({
      selectOne: '',
      input1: '',
      input2: '',
    });
  };

  // runTest = event => {
  //   event.preventDefault();
  //   // const { it, actual, selectOne } = this.state;

  //   // const { selectOne, message } = this.state;
  //   const inputs = [this.state.input1];

  //   let sandbox = this.state.actual;
  //   if (assert[selectOne].pre) sandbox = assert[selectOne].pre + sandbox;
  //   if (assert[selectOne].post) sandbox = sandbox + assert[selectOne].post;

  //   this.props
  //     .postCodeToSandbox({ sandbox, level: this.props.match.params.id })
  //     .then(res => {

  //       let result = it(message)(assert[selectOne])(res.sandbox, ...inputs);

  //       this.setState({
  //         responses: [...this.state.responses, result]
  //       })
  //       console.log(this.state.responses)

  //       if (result === message) {
  //         let str = `
  // it('${message}',function(){
  //   assert.${selectOne}(${
  //           inputs[0]
  //             ? this.state.actual + ',' + inputs.join(',')
  //             : this.state.actual
  //         })
  // })
  //       `;
  //         this.setState({
  //           tests: [...this.state.tests, str],
  //         });

  //       }
  //       this.clearForm();
  //     });
  // };
  render() {
    if (!this.props.levels.length) return <span />;
    // CHANGE LEVEL ID TO Req params
    const level = this.props.levels.find(lev => lev.id === Number(1));

    const { func, objective, it, tests, actual } = level;
    const { selectOne, input1 } = this.state;
    return (
      <div className="layout-container">
        <Header active={0} />
        <div className="layout-body">
          <div className="body-left" />
          <div className="code-block">
            <Objective level={0} message={level.it} title={level.title} />
            <Editor func={func} />
            <div className="display-assertions">
              <div className="assertion">
                <h4>Select One:</h4>
              </div>
              {tests.map(method => (
                  selectOne === method ?
                  <div className="assertion">
                  <button
                    key={method}
                    className="button-blue-active"
                    value={method}
                    onClick={e => this.handleClickAssert(e, method)}
                  >
                    {method}
                  </button>
                  </div>:
                  <div className="assertion">
                  <button
                    key={method}
                    className="button-blue"
                    value={method}
                    onClick={e => this.handleClickAssert(e, method)}
                  >
                    {method}
                  </button>
                  </div>
              ))}
              <div className="assertion">
                {selectOne && assert[selectOne].args.length &&
                <div>
                  <div className="assertion">
                    <h4>Input:</h4>
                  </div>
                  {assert[selectOne].args.slice(1).map((arg, i) => (
                      <input
                        className="input-yellow-sm"
                        placeholder="the expected output"
                        type="text"
                        value={this.state['input' + (i + 1)]}
                        name={arg}
                        onChange={event =>
                          this.setState({
                            ['input' + (i + 1)]: event.target.value,
                          })
                        }
                      />
                  ))}
                  </div>}
              </div>
            </div>

            <PrismCode component="pre" className="language-javascript">
              {`
describe('${objective}', function(){

  it('${it}',function(){
  assert.${selectOne}(${actual}${input1 ? ',' + input1 : ''})
  })
})
`}
            </PrismCode>
            <div className="send-test">
              <div className="clear">
                <button className="button-blue" onClick={this.clearForm}>
                  Clear
                </button>
              </div>
              <div className="sandbox-send">
                <button className="button-red">Run Test!</button>
              </div>
            </div>
          </div>
          <div className="chester-level">
            <img src="/img/chester.svg" />
          </div>
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
