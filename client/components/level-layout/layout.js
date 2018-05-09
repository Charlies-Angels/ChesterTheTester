import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { assert } from '../test-object';
import { it } from '../../utils/tester';
import levels from '../levels/levels';
import Objective from './objective';

class Layout extends Component {
  render() {
    const methods = Object.keys(assert);
    return (
      <div className="layout-container">
        <Header active={this.props.level.level} />
      <div className="layout-body">
      </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    level: state.level,
  }
}

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }
