import React from 'react';
import Navbar from './components/nav/navbar';
// import {Navbar} from './components'
import Routes from './routes';
import { Grid } from 'react-bootstrap';
import StartGame from './components/start-game';


const App = (props) => {
  return (
    <Grid>
      <Navbar />
      <Routes />
    </Grid>
  )
};

export default App;

