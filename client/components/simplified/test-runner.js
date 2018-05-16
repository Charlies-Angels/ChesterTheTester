import React, {Component} from 'react';
import Success from '../test-checks/success';
import Failure from '../test-checks/failure';
import NextLevel from './next-level'

class TestRunner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testResponse: props.testResponse,
      passing: false
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.testResponse)
    const checkPassing = (tests) => {
      return tests.some( (test) => {
        return test === `'${nextProps.it}'`
      })
    }
    if (nextProps.testResponse.length !== prevState.testResponse.length) {
      return (nextProps.testResponse.length >= nextProps.testToPass
        && checkPassing(nextProps.testResponse)) ?
        {testResponse: nextProps.testResponse, passing: true } :
        { testResponse: nextProps.testResponse }
      }
    else { return null }
  }

  render() {
    const { objective, it, testBlocks, outro } = this.props;
    const { passing, testResponse } = this.state;
    console.log(it);
    return (
      <div>
        <div className="output-container">
          <div className="test-output">
            <h4>Test Output:</h4>
          </div>
          <div className="level-up">
            <NextLevel passing={passing} testOutputs={testResponse} testBlocks={testBlocks} outro={outro}/>
          </div>
        </div>
        <div className="inner-block">
          <h6>{objective}</h6><br />
          <ul className="fa-ul">
            { testResponse.length ?
            testResponse.map(response => (
              response !== `'${this.props.it}'` ?
                <Failure msg={response} key={Math.random() * 40} /> :
                <Success msg={response} key={Math.random() * 20} />
            ))
            :
            <Failure msg={it} />
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default TestRunner;
