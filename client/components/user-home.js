import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { assert } from './test-object'
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <Link to="/level/1">Level 1</Link>
      <h1>{assert.closeTo(5, 6, 1)}</h1>

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
