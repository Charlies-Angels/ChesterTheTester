import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {StartGame} from './components'
import {me, getLevelsThunk, getAssertsThunk} from './store'
import Level from './components/simplified/layout';
import Intro from './components/simplified/intro';
import About from './components/simplified/about'
import TestGenerator from './components/test-generator'
import PageTransition from 'react-router-page-transition';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Route
        render={({ location }) => (
        <PageTransition timeout={500}>
          <Switch>
            <Route path="/level/:id/tutorial" component={Level} />
            <Route path="/level/:id" component={Intro} />
            <Route path="/generator" component={TestGenerator} />
            <Route path="/about" component={About} />
            <Route component={StartGame} />
          </Switch>
        </PageTransition>
        )}
      />
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(getLevelsThunk());
      dispatch(getAssertsThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}


        // <Route path="/login" component={Login} />
        // <Route path="/signup" component={Signup} />
        // <Route path="/level/:id/intro" component={Intro} />
        // <Route path="/level/:id/start" component={Level} />
        // <Route path="/home" component={UserHome} />
        // <Route exact path="/" component={StartGame} />
        // <Route path="/generator" component={TestGenerator} />
        // {/* Displays our Login component as a fallback */}
        // <Route path="/level/:id/" component={Intro} />
        // <Route component={StartGame} />
