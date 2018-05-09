import React from 'react';

const Header = (props) => {
  const levels = Array.from({length: 10}).map((x, i) => i);
  return (
      <div className="layout-header">
        <div className="layout-header__left">{'<<<'}</div>
        <div className="layout-header__title">CHESTER TESTER</div>
        {levels.map(level => (
          props.active === (level + 1) ?
          <div key={level} className="layout-header__levels-active">level {level + 1}</div> :
          <div key={level} className="layout-header__levels">level {level + 1}</div>))}
        <div className="layout-header__right">{'>>>'}</div>
      </div>
  )
}

export default Header;
