/* global describe beforeEach it */
/* eslint-disable no-unused-expressions */


import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Objective
 from './objective'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Objective', () => {
  // let clearRun;
  it('renders an objective', () => {
    const wrapper = shallow(<Objective />);
    expect(wrapper.contains(<div className="objective" />)).to.exist;
  })
})

