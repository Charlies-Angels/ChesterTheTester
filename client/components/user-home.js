import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  return (
    <div>
      <Link to="/level/1">Level 1</Link>
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
