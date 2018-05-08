//Pure JS tests
const levels = [
	{
	level: 1,
	title: `Lift Off!`,
	objective: `Ok cadets, since no one checked the critical functions of the our intergalactic rocket, I guess it's up to us to make sure thing are going smoothly. We do unit testing here at Fullstack A-Cat-amy of Space, that means making many small tests to tests each part of our code.  `,

	function:
	`const launchRocket = () => {
		let countDown = [];
		let counter = 10;
		while (counter>-1) {
			countDown.push(counter);
			counter--;
		}
		return countDown;
	}
	launchRocket();`,
	suggestedTests: [
		{test: 'typeof', actual: 'launchRocket', expected: 'function'},
		{test: 'isFunction', actual: 'launchRocket'},
		{test: 'isArray', actual: 'launchRocket()'},
	]
},
{
	level: 2,
	objective: 'STORY',
	function:
	`function mtrFrequency(meteorsInRange) {
		const mtrAnalysis = meteorsInRange.reduce(function (meteorsInRange, type) {
		 if (type in meteorsInRange) {
			 meteorsInRange[type]++;
		 }
		 else {
			 meteorsInRange[type] = 1;
		 }
		 return meteorsInRange;
	 }, {});
	 return mtrAnalysis;}


	 var meteors = ["Iron meteor", "Iron meteor", "Stone meteor", "Stone meteor", "Stoney-iron meteor", "Stone meteor", "Stone meteor", "Stoney-iron meteor", "Iron meteor", "Undetermined meteor", "Iron meteor", "Iron meteor"];
	 `
},
{
	level: 3,
	objective: 'STORY',
	function: `
		const swap = (array, i, j) => {
		let temp = array[i]
		array[i] = array[j]
		array[j] = temp
		}

		function spaceSort(array) {
				let swaps = 0;
				for (let i = 0; i < array.length - 1; i++) {
						if (array[i] > array[i + 1]) {
								swap(array, i, i + 1);
								swaps++;
						}
				}

				if (swaps > 0) {
						return spaceSort(array);
				}
				return array;
			}


		spaceSort([5, 2, 3, 4, 8, 7, 10])`
},
{
level: 4,
objective: 'STORY',
function: `
let Spacecraft = function(){};
Spacecraft.prototype.fly = function(){
	return 'they fly';
};

let Rocket = function(){};
Rocket.prototype = Object.create(Spacecraft.prototype);      //Rocket inherits from Spacecraft
Rocket.prototype.blastOff = function(){
	return 'blast off';
};

let CatShip = function(){};
CatShip.prototype = Object.create(Rocket.prototype)
	CatShip.info = ()=>{
	return 'catShip: it remains ' + (CatShip.prototype instanceof Rocket) + ' that catShip is an instance of Spacecraft, therefore '+ CatShip.prototype.fly() + ' and ' + CatShip.prototype.blastOff()} + '!';
};

console.log(CatShip.info())`
},
{
level: 5,
objective: 'STORY',
function: `setTimeout(() => {
		for (var x = 1; x <= 3; x++) alert(x) }, 1000);`
}
]

// const level1 = `
// const launchRocket = () => {
// 	let countDown = [];
// 	let counter = 10;
// 	while (counter>-1) {
// 		countDown.push(counter);
// 		counter--;
// 	}
// 	return countDown;
// }
// launchRocket();
// `

// // const level1Test = `
// // describe('return an array of numbers counting down from 10', () => {
// // 	let result = launchRocket();

// // 	it('launchRocket should be a function', () => {
// // 		expect(launchRocket).to.be.a('function');
// // 	});

// // 	it('launchRocket should return an array', () => {
// // 		expect(result).to.be.a('array')
// // 	});

// // 	it('returns an array with a length of 11', () => {
// // 		expect(result).to.have.lengthOf(11)
// // 	});
// // });
// `

// const level2 = `
// class Rocket {
// 	constructor(height, width, capacity) {
// 		this.height = height;
// 		this.width = width;
// 		this.capacity = capacity;
// 	}

// 	area = () => {
// 		return this.height * this.width;
// 	}
// }
// `


// const level2Test = `
// describe('Rocket class', () => {
// 	let testRocket = new Rocket(10, 5, 100);

// 	it('Rocket should have a height, width, and capacity', () => {
// 		expect(testRocket.height).to.equal(10);
// 		expect(testRocket.width).to.equal(5);
// 		expect(testRocket.capacity).to.equal(100);
// 	});

// 	it('Rocket should have area', () => {
// 		expect(testRocket.area()).to.equal(50);
// 	});
// });


// /*
// Unit Test: Testing the pure code to verify you're getting what you expected.
// Integration test: Testing to make sure an external  DB/network, api, ect. are working
// End to end testing: testing to make sure whole app will run and is ready for user use
// */

