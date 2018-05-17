/* global describe beforeEach it */

import {assert, expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {UserHome} from './user-home'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('UserHome', () => {
//   let userHome

//   beforeEach(() => {
//     userHome = shallow(<UserHome email={'cody@email.com'} />)
//   })

//   it('renders the email in an h3', () => {
//     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
//   })
// })


//Starting Tests for Capstone
const launchRocket = () => {
	let countDown = [];
	let counter = 10;
	while (counter > -1) {
		countDown.push(counter);
		counter--;
	} return countDown;
}

launchRocket();


//test

describe('return an array of numbers counting down from 10', () => {
	let result = launchRocket();

	it('launchRocket should be a function', () => {
		assert.isFunction(launchRocket);
	});

	it('launchRocket should return an array', () => {
		expect(result).to.be.a('array')
	});

	it('returns an array with a length of 11', () => {
		expect(result).to.have.lengthOf(11)
	});
});

class Rocket {
	constructor(height, width, capacity) {
		this.height = height;
		this.width = width;
		this.capacity = capacity;
	}

	area = () => {
		return this.height * this.width;
	}
}

describe('', () => {
	let testRocket = new Rocket(10, 5, 100);

	it('Rocket should have a height, width, and capacity', () => {
		expect(testRocket.height).to.equal(10);
		expect(testRocket.width).to.equal(5);
		expect(testRocket.capacity).to.equal(100);
	});

	it('Rocket should have area', () => {
		expect(testRocket.area()).to.equal(50);
	});
});

