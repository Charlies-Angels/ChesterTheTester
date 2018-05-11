import React from 'react';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap'
import levels from '../levels/levels'
import brace from 'brace';
import AceEditor from 'react-ace';
import PrismCode from 'react-prism';
import 'prismjs';

import 'brace/mode/javascript';
import 'brace/theme/chaos';

const Editor = (props) => {
  const func = props.func;
	return (
    <PrismCode component="pre" className="language-javascript">
      {`/*** Code that we're testing ***/

  ${func}`}</PrismCode>
	)
}

export default Editor;
