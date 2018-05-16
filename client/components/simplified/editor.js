import React from 'react';
import PrismCode from 'react-prism';
import ScrollArea from 'react-scrollbar';
import 'prismjs';


const Editor = (props) => {
  const {func, codeBlock} = props;
	return (
    <div className="func-block">
      <h4>`Code block:</h4>
      <PrismCode component="pre" className="language-javascript">
        {`${func}`}</PrismCode>
    </div>
	)
}

export default Editor;
