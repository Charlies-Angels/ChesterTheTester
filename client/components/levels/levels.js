import { isBoolean } from 'util';
import { isAbsolute } from 'path';

//Pure JS tests

const levels = [
{
	level: 1,
	title: `All sytems!`,
	objective: 'Ok cadets, since no one checked the critical functions of the our intergalactic rocket, I guess it\'s up to us to make sure thing are going smoothly. We do unit testing here at Fullstack A-Cat-amy of Space, that means making many small tests to tests each part of our code. We tests to check validity, make maintenance easier, for documentation, for better understanding, and for conscidering business logic which means you should check edge cases and any possible use scenarios. I\'ll have to be the one to teach you the mocha.js framework and the chai.js assertions, ugh. Tests should be organized into groups using \'describe\' blocks accepting a message and a callback, then \'beforeEach\' can be added to set up common code, but we wont worry about that for now. Individual tests should be the in the second argument of the describe block and start with \'it\', \'it\' also takes a message as its first parameter and an anonymous function with an assertion as the second. Lets jump in. we\'ll start by writing a simple test to test the "all systems are go" function of the ship. You\'ll see the test assertions on the right and the functions on the left. Start by observing the type of variables and functions available to test. allSystemCheck is a variable that stores a boolean, we can select the "isBoolean" assertion. Then choose the allSystemCheck input. you\'ll see that the tests become filled with your choices. Ok, time to write that first test.',

	function: `
	const allSystemCheck = true;
	const allSystemsAreGo = (allSystemCheck) => {
		if (allSystemCheck) return 'Ready for liftoff!'
		}; `,

	buttons: ['allSystemCheck', 'allSystemsAreGo(allSystemCheck)'],
	solutions: 'Ready for liftoff!',
	suggestedTests: ['isBoolean,allSystemCheck', 'strictEqual,allSystemsAreGo(),Ready for liftoff!']
},
	{
	level: 2,
	title: `Lift Off!`,
	objective: 'Great, you wrote a test. can you write a second test? I suggest comparing the functions you see on the right side of the page with the assertions on the left. there are a lot of options for both. Next you\'ll see a function that takes allSystemCheck as a parameter. That means you can test the function as a variable which would pass a test check if the test was "isFunction". The instanciated function would return a different fail that same test. allSystemsAreGo() actually returns a string. So "isString", "isOK", and "isNotNull" are all options to check the existance and type of the return from allSystemsAreGo(), while "typeOf" and "equal" require you to input an expected value. Find what you expect to return from the instantiated function. Ok, go on and test!',

	function: `
	const allSystemCheck = true
	const allSystemsAreGo = (allSystemCheck) => {
		if (allSystemCheck) return 'Ready for liftoff!'
		`,

	buttons: ['allSystemCheck', 'allSystemsAreGo()'],
	solutions: 'Ready for liftoff!',
	suggestedTests: ['isBoolean,allSystemCheck', 'strictEqual,allSystemsAreGo(),Ready for liftoff!']
},
{
	level: 3,
	title: `Lift Off!`,
	objective: 'Okay great, you can test a function. I don\'t know if you\'ve ever been part of a Cat Ship crew, but it\'s pretty common for a Cat Ship to countdown before liftoff. Now that we know that all systems are go we can just make sure our countdown works. you\'ll see that launchRocket is a function that returns and array of numbers 10-0, that\'s a pretty essential part of Cat Ship operation. let\'s write 3 tests to check launchRocket',
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
	buttons: ['launchRocket().length', 'launchRocket'],
	solutions: '[ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]',
	suggestedTests: ['isFunction,launchRocket', 'isArray,launchRocket()', 'equal, launchRocket(), [10,9,8,7,6,5,4,3,2,1,0]']
},
{
	level: 4,
	objective: 'Finally we\'re flying. This is what it\'s all about... Now that the Cat ship is airborn, lets do an analysis of our meteor radar. It looks like there are a mostly iron meteors floating around. Lets use tests to make sure our radar is actually storing the meteors in range and then automaticaly sorting them by type. Iron meteors are way more dense, so we do our best to avoid them. So before we smash into a wall of iron meteors lets write at least three tests for our meteor analysis',
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

	 mtrFrequency(meteors)
	 `,
	 buttons: ['mtrFrequency', 'meteors', 'mtrFrequency(meteors)' ],
	 solutions:
	 `{
	 'Iron meteor': 5,
	 'Stone meteor': 4,
	 'Stoney-iron meteor': 2,
	 'Undetermined meteor': 1
		}`,
	 suggestedTests: ['isFunction,mtrFrequency', 'isObject,mtrFrequency()', 'isUndefined, launchRocket(), [10,9,8,7,6,5,4,3,2,1,0]']
},
{
	level: 5,
	objective: 'STORY',
	function: `
	const swap = (array, i, j) => {
		let temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}

	function planetSort(array) {
		let swaps = 0;
		for (let i = 0; i < array.length - 1; i++) {
			if (array[i] > array[i + 1]) {
				swap(array, i, i + 1);
				swaps++;
			}
		}

		if (swaps > 0) {
			return planetSort(array);
		}
		return array;
	}

	let exoplanets = [5324246, 234444, 3111000, 4344, 8234566, 734321, 1124560]
	planetSort()`,
	buttons: ['planetSort', 'planetSort(exoplanets)', 'planetSort',
	'planetSort(meteors)', 'exoplanets', 'exoplanets()' ],
	solutions: '[ 4344, 234444, 734321, 1124560, 3111000, 5324246, 8234566 ]',
	suggestedTests: ['isFunction,mtrFrequency', 'isArray,mtrFrequency()', 'isUndefined, launchRocket(), [10,9,8,7,6,5,4,3,2,1,0]']
},
{
level: 6,
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
	CatShip.info = () =>{
	return 'catShip: it remains ' + (CatShip.prototype instanceof Rocket) + ' that catShip is an instance of Spacecraft, therefore '+ CatShip.prototype.fly() + ' and ' + CatShip.prototype.blastOff()} + '!';
};
`
},
{
level: 6,
objective: 'STORY',
function: `setTimeout(() => {

		for (var x = 1; x <= 3; x++) alert(x) }, 1000);`
	}
]

export default levels;
