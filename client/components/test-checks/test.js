import React, { Component } from 'react';
import Success from './success';
import Failure from './failure';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    // TODO: Should probably receive props that tell how many tests were ran in the suite
    // TODO: Should receive 'describe' block as props
    return (
      <div>
        <h3>Test(s) Passed</h3>
        <h4>Describe block: {/* this.props.describe*/}</h4>
        <ul className="fa-ul">
          {this.props.tests.map( test => {
            return (Array.isArray(test)) ?
              <Failure msg={test} /> :
              <Success msg={test} />
          })}
        </ul>
      </div>
     )
  }
}

export default Test;


// const launchRocket = () => {
// 	let countDown = [];
// 	let counter = 10;
// 	while (counter > -1) {
// 		countDown.push(counter);
// 		counter--;
// 	}
// 	return countDown;
// }
// launchRocket();

// export const it = (msg) => {
//   return (test) => {
//     return (...args) => {
//       return test(msg, ...args)
//     }
//   }
// }
// // console.log(assert.typeOf.func)
// let test = it('launchRocket should be a function')(assert.typeOf.func)(launchRocket, 'function')
// console.log(test);
