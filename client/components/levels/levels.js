//Pure JS tests

const level1 = {
	objective: `
	const launchRocket = () => {
		let countDown = [];
		let counter = 10;
		while (counter>-1) {
			countDown.push(counter);
			counter--;
		}
		return countDown;
	}
	launchRocket();
	`,
	fn: () => {
		let countDown = [];
		let counter = 10;
		while (counter>-1) {
			countDown.push(counter);
			counter--;
		}
		return countDown;
	},
	title: 'launchRocket()',
	buttons: ['launchRocket().length', 'launchRocket']
}

const level1Test = `
describe('return an array of numbers counting down from 10', () => {
	let result = launchRocket();

	it('launchRocket should be a function', () => {
		expect(launchRocket).to.be.a('function');
	});

	it('launchRocket should return an array', () => {
		expect(result).to.be.a('array')
	});

	it('returns an array with a length of 11', () => {
		expect(result).to.have.lengthOf(11)
	});
});
`

const level2 = `
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
`


const level2Test = `
describe('Rocket class', () => {
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
`

export default {
	level1,
	level2
}

