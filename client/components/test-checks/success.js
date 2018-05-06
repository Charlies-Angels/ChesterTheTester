import React from 'react';

const Success = (props) => (
  <li className="success">
    <span className="fa-li">
      <i className="fas fa-check-circle" />
    </span>{props.msg}
  </li>
)

export default Success;
