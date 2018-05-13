import React, {Component} from 'react';
import Success from '../test-checks/success';
import Failure from '../test-checks/failure';

class TestRunner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testResponse: props.testResponse,
      passing: false
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.testResponse.length !== prevState.testResponse.length) {
      if (nextProps.testResponse.length >= nextProps.testToPass) {
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
    const { objective, it } = this.props;
    const { passing, testResponse } = this.state;
    return (
      <div>
        <div className="output-container">
          <div className="test-output">
            <h4>Test Output:</h4>
          </div>
          <div className="level-up">
            <button disabled={!passing} className={passing ? 'button-blue-lg' : 'button-inactive-lg'} >NEXT LEVEL</button>
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
