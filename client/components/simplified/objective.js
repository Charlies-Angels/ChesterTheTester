import React from 'react';

const Objective = (props) => {
	return (
    <div>
      <h2>{`Level ${props.level}: ${props.title}`}</h2>
      <h3>{props.instructions}</h3>
    </div>
	)
}

export default Objective;
