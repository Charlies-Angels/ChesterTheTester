import React, { Component } from 'react';
import Success from './success';
import Failure from './failure';

class TestSuite extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    // TODO: Should probably receive props that tell how many tests were ran in the suite
    return (
      <div>
        <h3>Tests</h3>
        <h4>{`Writing tests for ${this.props.title}`}</h4>
        <ul className="fa-ul">
          {this.props.tests.map( test => {
            {/* // TODO: Do a different sort of "success" check */}
            return (test.includes('Expected')) ?
              <Failure msg={test} /> :
              <Success msg={test} />
          })}
        </ul>
      </div>
     )
  }
}

export default TestSuite;

