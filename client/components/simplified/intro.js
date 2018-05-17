import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import ScrollArea from 'react-scrollbar';
import history from '../../history'
import { setLevel } from '../../store';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount() {
    if (this.props.level.level !== +this.props.match.params.id) {
      this.props.setLevelOnLoad(+this.props.match.params.id);
    }
  }
  goToLevel = (level) => {
    history.push(`/level/${level}/tutorial`)
  }
  render() {
    if (!this.props.levels.length) return <span />
    const thisLevel = this.props.levels.find(lev => lev.level === Number(this.props.match.params.id));
    const levelId = this.props.match.params.id
    return (
      <div className="transition-item intro">
        <Header active={levelId} />
        <div className="start-container">
          <ScrollArea
            speed={0.8}
            className="intro-block"
            horizontal={false}
            verticalScrollbarStyle={{backgroundColor: '#ffbb33'}}
            >
            <div className="output-container">
            <div className="test-output">
            <h2>{`Level ${levelId}: ${thisLevel.title}`}</h2>
            </div>
            <div className="level-up">
              <button className="button-blue" onClick={() => this.goToLevel(this.props.match.params.id)}>START LEVEL</button>
            </div>
            </div>
            <h3>{thisLevel.intro}</h3>

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
const mapDispatch = dispatch => ({
  setLevelOnLoad: level => dispatch(setLevel(level)),
});

export default connect(mapState, mapDispatch)(Intro);
