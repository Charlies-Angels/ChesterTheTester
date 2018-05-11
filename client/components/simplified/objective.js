import React from 'react';

const Objective = (props) => {
	return (
    <div>
      <h3>{`Level ${props.level}: ${props.title}`}</h3>
      <h4>{props.instructions}</h4>
    </div>
	)
}

export default Objective;
