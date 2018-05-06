import React from 'react';

const Failure = (props) => (
  <li className="failure">
    <span className="fa-li">
      <i className="fas fa-times-circle" />
    </span>{props.msg[0]} , {props.msg[1]}
  </li>
)

export default Failure;
