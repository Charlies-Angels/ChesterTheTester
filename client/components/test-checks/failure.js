import React from 'react';

const Failure = (props) => (
  <li className="failure">
    <span className="fa-li">
      <i className="fas fa-times-circle" />
    </span>{props.msg}
  </li>
)

export default Failure;
