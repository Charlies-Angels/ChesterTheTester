import React from 'react'
import Navbar from './components/nav/navbar'
// import {Navbar} from './components'
import Routes from './routes'
import {Grid} from 'react-bootstrap'
// import {TestEditor} from './components/blockly/dev-index'


const App = (props) => {
  return (
    <Grid>
      <Navbar />
      <Routes />
    </Grid>
  )
}

export default App
