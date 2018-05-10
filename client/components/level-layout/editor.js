import React from 'react';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap'
import levels from '../levels/levels'
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/chaos';

const Editor = (props) => {
  const func = props.func;
	return (
			<AceEditor
			    mode="javascript"
			    onChange={(event) => console.log(event)}
			    theme="chaos"
          height="250px"
			    readOnly={true}
			    value={func}
			    name="UNIQUE_ID_OF_DIV"
			    editorProps={{$blockScrolling: true}}
          highlightActiveLine={false}
          highlightGutterLine={false}
          setOptions={{cursorStyle: 'thin'}}
			/>
	)
}

export default Editor;
