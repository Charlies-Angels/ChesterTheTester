import React, {Component} from 'react';
import Success from '../test-checks/success';
import Failure from '../test-checks/failure';

class TestRunner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testResponse: [] };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.testResponse && nextProps.testResponse !== this.props.testResponse) {
      this.setState({
        testResponse: [...this.state.testResponse, nextProps.testResponse]
      });
    }
  }
  render() {
    const { objective, it } = this.props;
    const { testResponse } = this.state;
    return (
      <div>
        <h4>Test Output:</h4>
        <div className="inner-block">
        <h6>{objective}</h6>
        <ul className="fa-ul">
          { testResponse.length ?
          testResponse.map(response => (
            response.includes('Expected') ?
              <Failure msg={response} /> :
              <Success msg={response} />
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
