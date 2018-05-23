import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Header from './simplified/header';

class StartGame extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <div className="transition-item start">
        <Header />
        <div className="start-container">
          <div className="intro-block">
            <h2>Meet Chester</h2>
            <h3>He's having a bad day. As Captain of the USS Fullstack, he's supposed to launch into the wild unknown of space today, but it seems that his development team has neglected to do any unit or integration testing for their programs. Testing is important to any program, and especially necessary in space travel. This seems to be a challenge for CHESTER THE TESTER.

            </h3>
            <NavLink to="/level/1">
              <button className="button-blue">GO TO TUTORIAL</button>
            </NavLink>
            <NavLink to="/generator">
              <button className="button-red">GO TO EDITOR</button>
            </NavLink>
          </div>
          <div className="chester">
            <img className="chester-img" src="/img/chester.svg" />
          </div>
          </div>
      </div>
     )
  }
}

export default StartGame;
