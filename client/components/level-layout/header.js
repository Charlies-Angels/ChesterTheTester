import React from 'react';
import {NavLink} from 'react-router-dom'
import history from '../../history'
const Header = (props) => {
  const levels = Array.from({length: 10}).map((x, i) => i);
  console.log(history)
  const goBack = () => {
    history.goBack();
  }
  const goToLevel = (level) => {
    history.push(`/level/${level + 1}`)
  }
  const goForward = () => {
    history.push(`/level/${+props.active + 1}`)
  }
  return (
      <div className="layout-header">
        <div className="layout-header__left" onClick={goBack} >{'<<<'}</div>
        <div className="layout-header__title">CHESTER TESTER</div>
        {levels.map(level => (
          props.active == (level + 1) ?
          <div key={level} className="layout-header__levels-active" onClick={() => (goToLevel(level))}>level {level + 1}</div>
          :
          <div key={level} className="layout-header__levels" onClick={() => (goToLevel(level))}>level {level + 1} </div>
          ))}
        <div className="layout-header__right" onClick={goForward}>{'>>>'}</div>
      </div>
  )
}

export default Header;
