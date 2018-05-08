import React from 'react';
import Navbar from './components/nav/navbar';
// import {Navbar} from './components'
import Routes from './routes';
import { Grid } from 'react-bootstrap';
import StartGame from './components/start-game';
import Parse from './components/parse-js/parse';
import Test from './components/test-checks/test';
import {assert} from './components/test-object';

const launchRocket = () => {
	let countDown = [];
	let counter = 10;
	while (counter > -1) {
		countDown.push(counter);
		counter--;
	}
	return countDown;
}
launchRocket();

export const it = (msg) => {
  return (test) => {
    return (...args) => {
      return test.func(msg, ...args)
    }
  }
}
let tests = [];
tests.push(it('launchRocket should be a function')(assert.typeOf)(launchRocket, 'function'))
tests.push(it('launchRocket should not be a string')(assert.isFunction)(launchRocket))
tests.push(it('launchRocket should not be a string')(assert.typeOf)(launchRocket(), 'object'))
tests.push(it('launchRocket should not be a string')(assert.typeOf)(launchRocket(), 'array'))

const App = (props) => {
  return (
    <Grid>
      {/* <Navbar /> */}
      {/* <Routes /> */}
      <Test tests={tests} />
    </Grid>
  )
};

export default App;

