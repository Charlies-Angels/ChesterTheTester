import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Objective from './objective';
import Editor from './editor';
import Describe from './describe';
import AssertButton from './assert-button';
import ClearRun from './clear-run';
import TestRunner from './test-runner';
import { assert } from '../test-object';
import { it } from '../../utils/tester';
import { postCodeToSandbox, setLevel, completeLevel } from '../../store';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOne: '',
      input1: '',
      input2: '',
      testResponse: [],
      ranTests: [],
      actual: this.props.level.actual || '',
    };
  }
  componentDidMount() {
    if (this.props.level.level !== +this.props.match.params.id) {
      this.props.setLevelOnLoad(+this.props.match.params.id);
    }
  }

  handleClickAssert = (method) => {
    this.setState({
      selectOne: method,
    });
  };

  clearForm = () => {
    this.setState({
      selectOne: '',
      input1: '',
      input2: '',
      actual: this.props.level.actual || ''
    });
  };

  runTest = () => {
    const { selectOne, input1, input2, ranTests, testResponse, actual } = this.state;
    const inputs = [input1, input2];
    // const level = this.props.levels.find(lev => lev.level === Number(this.props.match.params.id));
    const { itBlock } = this.props.level;

    this.props.postCodeToSandbox({ sandbox: actual, level: this.props.match.params.id, itBlock, assert: selectOne, inputs })
      .then(res => {
        let str = `it('${itBlock}',function(){
    assert.${selectOne}(${inputs[0] ? actual + ',' + inputs.join(',') : actual
  })
})`;
        this.setState({
          testResponse: [...testResponse, res.sandbox],
          ranTests: [...ranTests, str],
        })
        console.log(res.sandbox, itBlock)
        if (res.sandbox === `'${itBlock}'`) {
          this.clearForm();
        }
      })
      .catch(err => {
        console.log(err);
    })
  }

  render() {
    if (!this.props.level) return <span />
    if (!this.props.asserts) return <span />
    const { level, func, objective, instructions, itBlock, tests, title, testToPass, buttons, outro } = this.props.level;
    const { asserts } = this.props
    const { selectOne, input1, input2, testResponse, actual, ranTests } = this.state;

    console.log(asserts)

    return (
      <div className="layout-container">
        <Header active={level} />
        <div className="layout-body">

          <div className="left-side">
            <Objective level={level} title={title} instructions={instructions} />
            <Editor func={func} codeBlock={actual} />
          </div>

          <div className="right-side">
            <div className="test-block">
            <TestRunner objective={objective} it={itBlock} testResponse={testResponse} testToPass={testToPass} testBlocks={ranTests} outro={outro} />
              <div className="send-test">
                <h4>Test Code Block:</h4>
                <div className="clear-send">
                  <ClearRun selectOne={selectOne} runTest={this.runTest} clearForm={this.clearForm} />
                </div>
            </div>

              <Describe describe={objective} assertion={selectOne} actual={actual} input1={input1} input2={input2} it={itBlock} />
              { !this.props.level.actual &&
                <div>
                  <h5>Choose the function/variable you will be testing against: </h5>
                  {/* add multiple function buttons */}
                  {buttons.map(button => (
                      <button
                      className="button-red"
                      key={button}
                      value={button}
                      onClick={() => this.setState({
                        actual: button
                      })}
                      >{button}</button>)
                      )
                  }
                </div>
              }
              <h5>Choose an assertion: </h5>
              <div className="display-assertions">
              {tests.map(method => (
                  selectOne === method ?
                  <div className="assertion" key={method}>
                    <AssertButton active method={method} onClick={() => this.handleClickAssert(method)} />
                  </div> :
                  <div className="assertion" key={method}>
                  <AssertButton method={method} onClick={() => this.handleClickAssert(method)} />
                  </div>
              ))}
              </div>
              { selectOne && asserts.find(el => el.assert === selectOne).args.length > 1 &&
              <div>
                <h5>Add input for expected value: </h5>
                <div className="display-inputs">
                {asserts.find(el => el.assert === selectOne).args.slice(1).map((arg, i) => (
                  <input
                    key={arg}
                    autoFocus={i === 0}
                    className="expect-input"
                    placeholder="expected value..."
                    type="text"
                    value={this.state['input' + (i + 1)]}
                    name={arg}
                    onChange={event =>
                      this.setState({
                        ['input' + (i + 1)]: event.target.value,
                      })
                    } />
                  ))}
                  </div>
                </div>
              }
              </div>
          </div>

      </div>
    </div>
    );
  }
}

const mapState = (state, ownProps) => {
  const current = state.levels.find(lev => lev.level === Number(ownProps.match.params.id));

  return {
    level: current,
    sandbox: state.sandbox,
    asserts: state.asserts
  }
}

const mapDispatchToProps = dispatch => ({
    postCodeToSandbox: sandbox => dispatch(postCodeToSandbox(sandbox)),
    setLevelOnLoad: level => dispatch(setLevel(level)),
    completeLevelOnClick: () => dispatch(completeLevel()),
});

export default connect(mapState, mapDispatchToProps)(Layout);
