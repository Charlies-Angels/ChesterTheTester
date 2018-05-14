import React, {Component} from 'react';
import PrismCode from 'react-prism';
import 'prismjs';

class Describe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assertion: props.assertion || '' };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      assertion: nextProps.assertion,
    });
  }
  render() {
    const { describe, it, actual, input1, input2, passedTests } = this.props;
    return (

      <PrismCode component="pre" className="language-javascript">
        {`describe('${describe}', () => {
          ${passedTests && passedTests.map(element => element)}
    it('${it}', () => {
    assert.${this.state.assertion}(${actual}${input1 ? ',' + input1 : ''}${input2 ? ',' + input2 : ''})
    })
  })`}
      </PrismCode>
    );
  }
}

export default Describe;
