import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import ScrollArea from 'react-scrollbar';
import history from '../../history'

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  goToLevel = (level) => {
    history.push(`/level/${level}/start`)
  }
  render() {
    if (!this.props.levels.length) return <span />
    const thisLevel = this.props.levels.find(lev => lev.level === Number(this.props.match.params.id));
    const levelId = this.props.match.params.id
    return (
      <div>
        <Header active={levelId} />
        <div className="start-container">
          <ScrollArea
            speed={0.8}
            className="intro-block"
            horizontal={false}
            >
            <h2>{`Level ${levelId}: ${thisLevel.title}`}</h2>
            <h6>{thisLevel.intro}</h6>
              <button className="button-blue" onClick={() => this.goToLevel(this.props.match.params.id)}>START LEVEL</button>
            </ScrollArea>
          <div className="chester">
            <img className="chester-img" src="/img/chester.svg" />
          </div>
          </div>
      </div>
     )
  }
}

const mapState = state => ({
  level: state.level,
  levels: state.levels,
});

export default connect(mapState, null)(Intro);
