/* global describe beforeEach it */
/* eslint-disable no-unused-expressions */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ClearRun
 from './clear-run'

const adapter = new Adapter()
enzyme.configure({adapter})

const clearForm = () => {
  this.setState({
    selectOne: '',
    input1: '',
    input2: '',
  });
};
const selectOne = 0;
const runTest = () => {

  const input1 = 'ok';
  const input2 = 'ok';
  if (input1 === input2) return true;


}
describe('ClearRun', () => {
  // let clearRun;
  it('renders Clear and Run buttons', () => {
    const wrapper = shallow(<ClearRun selectOne={selectOne} clearForm={clearForm} runTest={runTest} />);
    expect(wrapper.contains(<div className="clear-run" />)).to.exist;  })
  it('has a button', () => {
    const wrapper = shallow(<ClearRun selectOne={selectOne} clearForm={clearForm} runTest={runTest} />);
    wrapper.contains(<button className="button-inactive" />)
  })
})

