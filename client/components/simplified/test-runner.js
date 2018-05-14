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
    const checkPassing = (tests) => {
      return tests.some( (test) => {
        return test.indexOf('Expected') === -1
      })
    }
    if (nextProps.testResponse.length !== prevState.testResponse.length) {
      if (nextProps.testResponse.length >= nextProps.testToPass && checkPassing(nextProps.testResponse)) {
        return {
          testResponse: nextProps.testResponse,
          passing: true,
        };
      }
      else return { testResponse: nextProps.testResponse }
      }
    else return {}
  }

  render() {
    const { objective, it, completeLevel } = this.props;
    const { passing, testResponse } = this.state;
    return (
      <div>
        <div className="output-container">
          <div className="test-output">
            <h4>Test Output:</h4>
          </div>
          <div className="level-up">
            <NextLevel passing={passing} />
          </div>
        </div>
        <div className="inner-block">
          <h6>{objective}</h6><br />
          <ul className="fa-ul">
            { testResponse.length ?
            testResponse.map(response => (
              response.includes('Expected') ?
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
