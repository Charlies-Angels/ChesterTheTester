import React from 'react';

const AssertButton = (props) => {
  return props.active ?
    <button
      className="button-blue-active" // active class on click
      value={props.method}
      onClick={props.onClick} >
      {props.method}
    </button>
    :
    <button
      className="button-blue"
      value={props.method}
      onClick={props.onClick} >
      {props.method}
    </button>
}

export default AssertButton;
