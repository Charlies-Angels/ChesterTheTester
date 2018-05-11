import React from 'react';
import { connect } from 'react-redux';

import TestSuite from '../test-checks/test';



const Objective = (props) => {
	return (
    <div>
      <h3>{`Level ${props.level}: ${props.title}`}</h3>
      <h4> Test the variable, 'allSystemsGo', to be sure that it returns a boolean. Choose a type of Mocha assertion to use on the right side. Note: some assertions require a second variable to be filled in.</h4>
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
