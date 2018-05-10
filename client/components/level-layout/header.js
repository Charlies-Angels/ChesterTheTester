import React from 'react';
import {NavLink} from 'react-router-dom'
import history from '../../history'
const Header = (props) => {
  const levels = Array.from({length: 10}).map((x, i) => i);
  return (
      <div className="layout-header">
        <div className="layout-header__left"><a href={`/level/${props.active-1}`}>{'<<<'}</a></div>
        <div className="layout-header__title">CHESTER TESTER</div>
        {levels.map(level => (
          props.active == (level + 1) ?
          // <NavLink key={level} to = {`/level/${level+1}`}>
          <div key={level} className="layout-header__levels-active"> <a href={`/level/${level+1}`}>level {level + 1}</a></div> 
          // </NavLink>
          :
          // <NavLink key={level} to = {`/level/${level+1}`}>
          <div key={level} className="layout-header__levels"><a href={`/level/${level+1}`}>level {level + 1}</a></div>
          // </NavLink>
          ))}
        <div className="layout-header__right"><a href={`/level/${props.active+1}`}>{'>>>'}</a></div>
      </div>
  )
}

export default Header;
