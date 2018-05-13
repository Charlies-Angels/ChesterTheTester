import React from 'react';
import history from '../../history'
const Header = (props) => {
  const levels = Array.from({length: 11}).map((x, i) => i);
  const goBack = () => {
    if (props.active == 0) {
      history.push(`/`)
    }
    else {
      history.push(`/level/${+props.active - 1}/intro`)
    }
  }
  const goToLevel = (level) => {
    history.push(`/level/${level}/intro`)
  }
  const goForward = () => {
    history.push(`/level/${+props.active + 1}/intro`)
  }
  return (
      <div className="layout-header">
        <div className="layout-header__left" onClick={goBack} >{'<<<'}</div>
        <div className="layout-header__title">CHESTER TESTER</div>
        {levels.map(level => (
          props.active == (level) ?
          <div key={level} className="layout-header__levels-active" onClick={() => (goToLevel(level))}>level {level}</div>
          :
          <div key={level} className="layout-header__levels" onClick={() => (goToLevel(level))}>level {level} </div>
          ))}
        <div className="layout-header__right" onClick={goForward}>{'>>>'}</div>
      </div>
  )
}

export default Header;
