import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import levels from '../levels/levels';
import brace from 'brace';
import AceEditor from 'react-ace';
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
      <PrismCode component="pre" className="language-javascript">
        {`/*** Test that we're writing ***/

  describe('${describe}', () => {
    it('${it}', () => {
    assert.${this.state.assertion}(${actual}${input1 ? ',' + input1 : ''})
    })
  })`}
      </PrismCode>
    );
  }
}

export default Describe;
