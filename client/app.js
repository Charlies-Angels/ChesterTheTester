import React from 'react'
import Navbar from './components/nav/navbar'
// import {Navbar} from './components'
import Routes from './routes'
import {Grid} from 'react-bootstrap'
import Test from './components/test-checks/test';

const App = () => {
  return (
    <Grid>
      <Navbar />
      <Routes />
    </Grid>
  )
}

export default App
