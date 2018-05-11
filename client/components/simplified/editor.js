import React from 'react';
import PrismCode from 'react-prism';
import ScrollArea from 'react-scrollbar';
import 'prismjs';


const Editor = (props) => {
  const func = props.func;
	return (
    <ScrollArea
            speed={0.8}
            className="func-block"
            horizontal={false}
            >
              <h4>Code to Test:</h4>
    <PrismCode component="pre" className="language-javascript">
      {`${func}`}</PrismCode>
  </ScrollArea>
	)
}

export default Editor;
