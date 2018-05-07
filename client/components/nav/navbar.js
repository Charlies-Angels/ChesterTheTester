import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { progress: 25 };
  }
  render() {
    return (
      <div>
        <div className="nav">
          <div className="nav__title">
            <h2>Chester Tester</h2>
          </div>
          <div className="nav__statusBar">
            <div className="nav__meter">
              <span className="nav__meter-25" />
              {/* HERE Do a state check on progress to change the classname */}
            </div>
          </div>
          <div className="nav__levelName">
            <h2>Level One: Liftoff</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
