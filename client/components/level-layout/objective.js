import React from 'react';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap'
import levels from '../levels/levels'
import brace from 'brace';
import AceEditor from 'react-ace';
import TestSuite from '../test-checks/test';

import 'brace/mode/javascript';
import 'brace/theme/chaos';


const Objective = (props) => {
	return (
    <div>
      <h3>{`Level ${props.level}: ${props.title}`}</h3>
      {props.responses.length ? <TestSuite tests={props.responses} title={props.title} />
      : <TestSuite tests={['Expected Assertion', 'Expected Assertion', 'Expected Assertion']} title={props.title} />
      }
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
