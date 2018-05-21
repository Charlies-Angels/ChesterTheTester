import React from 'react';
import history from '../../history'
const Header = (props) => {
  const levels = Array.from({length: 7}).map((_, i) => i + 1);
  // what is link to prev, next and reference those in each link instead of these functions
  const goBack = () => {
    if (props.active == 1) history.push(`/`)
    else if (history.location.pathname === '/generator') history.push(`/level/7`)
    else history.push(`/level/${+props.active - 1}`)
  }
  const goToLevel = (level) => {
    history.push(`/level/${level}`)
  }
  const goToEditor = () => {
    history.push(`/generator`)
  }
  const goForward = () => {
    if (props.active == 7) goToEditor();
    else if (history.location.pathname === '/') history.push(`/level/1`)
    else history.push(`/level/${+props.active + 1}`)
  }
  return (
      <div className="layout-header">
        <div className="layout-header__left" onClick={goBack} >{'<<<'}</div>
        <div className="layout-header__title">CHESTER TESTER</div>
        {levels.map(level => (
          props.active == (level) ?
          <div key={level} className="layout-header__levels-active" onClick={() => (goToLevel(level))}>level {level}</div>
          :
          <div key={level} className="layout-header__levels" onClick={() => (goToLevel(level))}>level {level}</div>
          ))}
          <div className={history.location.pathname === '/generator' ? 'layout-header__levels-active' : 'layout-header__levels'}
            onClick={() => goToEditor()}>editor</div>
        <div className='layout-header__right' onClick={goForward}>{'>>>'}</div>
      </div>
  )
}

export default Header;
