import React, {Component} from 'react';
import PrismCode from 'react-prism';
import 'prismjs';

class Describe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assertion: props.assertion
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.assertion !== prevState.assertion ?
      {assertion: nextProps.assertion} : null
  }
  render() {
    const { describe, it, actual, input1, input2, passedTests } = this.props;
    console.log(passedTests)
    return (

      <PrismCode component="pre" className="language-javascript">
        {`describe('${describe}', () => {
          ${(passedTests && passedTests.length) ? passedTests.map(element => element) : '' }
    it('${it}', () => {
    assert.${this.state.assertion}(${actual}${input1 ? ',' + input1 : ''}${input2 ? ',' + input2 : ''})
    })
  })`}
      </PrismCode>
    );
  }
}

export default Describe;
