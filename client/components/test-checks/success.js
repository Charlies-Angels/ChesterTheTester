import React, { Component } from 'react';

class Success extends Component {
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
        <h4>HELLO THERE I WILL DESCRIBE SOMETHING</h4>
        <ul className="fa-ul">
        <li className="success"><span className="fa-li"><i className="fas fa-check-square" /></span>{this.props.msg}</li>
        </ul>
      </div>
     )
  }
}

export default Success;
