import React from 'react'
import Navbar from './components/nav/navbar'
// import {Navbar} from './components'
import Routes from './routes'
import {Grid} from 'react-bootstrap'
import Success from './components/test-checks/success';
import { assert } from './components/test-object';

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
      return test(msg, ...args)
    }
  }
}
// console.log(assert.typeOf.func)
let test = it('launchRocket should be a function')(assert.typeOf.func)(launchRocket, 'function')
console.log(test);

const App = () => {
  return (
    <Grid>
      <Navbar />
      <Routes />
      <Success msg={test}/>
    </Grid>
  )
}

export default App
