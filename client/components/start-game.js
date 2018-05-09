import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class StartGame extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <div className="start-container">
        <div className="start-game">
          <h2>Meet Chester</h2>
          <h4>He's having a bad day. As Captain of the USS Fullstack, he's supposed to launch into the wild unknown of space today, but it seems that his team has neglected to do any of the pre-flight checks. Testing is important to any program, and especially necessary in space travel. This seems to be a challenge for CHESTER THE TESTER.

          </h4>
          <Link to="/level/1">
            <button className="button"> START GAME</button>
          </Link>
        </div>
        <div className="chester">
          <img className="chester-img" src="./img/chester.svg" />
        </div>
      </div>
     )
  }
}

export default StartGame;
