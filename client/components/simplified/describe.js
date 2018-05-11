import React, {Component} from 'react';
import { connect } from 'react-redux';

import ScrollArea from 'react-scrollbar';
import PrismCode from 'react-prism';
import 'prismjs';

import 'brace/mode/javascript';
import 'brace/theme/chaos';

class Describe extends Component {
  constructor(props) {
    super(props);
    this.state = { assertion: props.assertion || '' };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      assertion: nextProps.assertion,
    });
  }
  render() {
    const { describe, it, actual, input1 } = this.props;
    return (
        <ScrollArea
            speed={0.8}
            className="test-block"
            horizontal={false}
            >
              <h4>Test Code:</h4>
      <PrismCode component="pre" className="language-javascript">
        {`describe('${describe}', () => {
    it('${it}', () => {
    assert.${this.state.assertion}(${actual}${input1 ? ',' + input1 : ''})
    })
  })`}
      </PrismCode>
      </ScrollArea>
    );
  }
}

export default Describe;
