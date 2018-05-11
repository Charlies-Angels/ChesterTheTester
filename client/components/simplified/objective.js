import React from 'react';
import { connect } from 'react-redux';

import TestSuite from '../test-checks/test';



const Objective = (props) => {
	return (
    <div>
      <h3>{`Level ${props.level}: ${props.title}`}</h3>
      <h4>{props.instructions}</h4>
    </div>
	)
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Objective)
