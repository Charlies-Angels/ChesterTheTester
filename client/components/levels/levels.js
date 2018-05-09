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
		if (allSystemCheck) return 'Ready for liftoff!';
	};

  allSystemsAreGo(allSystemCheck);
		`,

	buttons: ['allSystemCheck', 'allSystemsAreGo()'],
	solutions: 'Ready for liftoff!',
	suggestedTests: ['isBoolean,allSystemCheck', 'strictEqual,allSystemsAreGo(),Ready for liftoff!']
},
	{
	level: 2,
	title: `Lift Off!`,
	objective: 'Great, you wrote a test. can you write a second test? I suggest comparing the functions you see on the right side of the page with the assertions on the left. there are a lot of options for both. Next you\'ll see a function that takes allSystemCheck as a parameter. That means you can test the function as a variable which would pass a test check if the test was "isFunction". The instanciated function would return a different fail that same test. allSystemsAreGo() actually returns a string. So "isString", "isOK", and "isNotNull" are all options to check the existance and type of the return from allSystemsAreGo(), while "typeOf" and "equal" require you to input an expected value. Find what you expect to return from the instantiated function. Ok, go on and test!',

	function: `
	const allSystemCheck = true;
	const allSystemsAreGo = (allSystemCheck) => {
		if (allSystemCheck) return 'Ready for liftoff!';
	};

  allSystemsAreGo(allSystemCheck);
		`,

	buttons: ['allSystemCheck', 'allSystemsAreGo()'],
	solutions: 'Ready for liftoff!',
	suggestedTests: ['isBoolean,allSystemCheck', 'strictEqual,allSystemsAreGo(),Ready for liftoff!']
},
{
	level: 3,
	title: `Lift Off!`,
	objective: 'Okay great, you can test a function. I don\'t know if you\'ve ever been part of a catship crew, but it\'s pretty common for a catship to countdown before liftoff. Now that we know that all systems are go we can just make sure our countdown works. you\'ll see that launchRocket is a function that returns and array of numbers 10-0, that\'s a pretty essential part of catship operation. let\'s write 3 tests to check launchRocket',
	function:
	`const launchRocket = () => {
		let countDown = [];
		let counter = 10;
		while (counter > -1) {
			countDown.push(counter);
			counter--;
		}
		return countDown;
	};
	launchRocket();`,
	buttons: ['launchRocket().length', 'launchRocket'],
	solutions: '[ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]',
	suggestedTests: ['isFunction,launchRocket', 'isArray,launchRocket()', 'equal, launchRocket(), [10,9,8,7,6,5,4,3,2,1,0]']
},
{
	level: 4,
	objective: 'Finally we\'re flying. This is what it\'s all about... Now that the catship is airborn, lets do an analysis of our meteor radar. It looks like there are a mostly iron meteors floating around. Lets use tests to make sure our radar is actually storing the meteors in range and then automaticaly sorting them by type. Iron meteors are way more dense, so we do our best to avoid them. So before we smash into a wall of iron meteors lets write at least three tests for our meteor analysis',
	function:
	`function mtrFrequency(meteorsInRange) {
		const mtrAnalysis = meteorsInRange.reduce(function(meteorsInRange, type) {
			if (type in meteorsInRange) {
				meteorsInRange[type]++;
			} else {
				meteorsInRange[type] = 1;
			}
			return meteorsInRange;
		}, {});
		return mtrAnalysis;
	}

	var meteors = [
		'Iron meteor',
		'Iron meteor',
		'Stone meteor',
		'Stone meteor',
		'Stoney-iron meteor',
		'Stone meteor',
		'Stone meteor',
		'Stoney-iron meteor',
		'Iron meteor',
		'Undetermined meteor',
		'Iron meteor',
		'Iron meteor',
	];

	mtrFrequency(meteors);
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
	objective: 'Time for my favorite task of the day,searching the galaxy for inhabitable exoplanets. This catship uses a sensor that populates new "goldi-locks" planet into an "exoplanet" array. Then the catship\'s onboard computer uses an advanced technique to rapidly find the planet most likely to be life sustaining before the sort is even complete. lets write at least three tests to make sure this system is in tip top shape. ',
	function: `
	const swap = (array, i, j) => {
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	};

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

	let exoplanets = [5324246, 234444, 3111000, 4344, 8234566, 734321, 1124560];
	planetSort();
	`,
	buttons: ['planetSort', 'planetSort(exoplanets)', 'planetSort',
	'planetSort(meteors)', 'exoplanets', 'exoplanets()' ],
	solutions: '[ 4344, 234444, 734321, 1124560, 3111000, 5324246, 8234566 ]',
	suggestedTests: ['isFunction,planetSort', 'isArray,exoplanets', 'isDefined,launchRocket(exoplanets), isNotNull,exoplanets']
},
{
level: 6,
objective: 'Pop Quiz! We\'re here to test catship operations, obviously. So then, you should know the difference between a Spacecraft, a rocket and a catship. See the ES6 code and se if you know that the return statement would say.',
function: `
class Spacecraft {
	fly() {
		return 'they fly';
	}
}

class Rocket extends Spacecraft {
	blastOff() {
		return 'blast off';
	}
}

class Catship extends Rocket {
	info() {
		return (
			'catship: it remains ' +
			(Catship.prototype instanceof Rocket) +
			' that Catship is an instance of Spacecraft, therefore ' +
			Catship.prototype.fly() +
			' and ' +
			Catship.prototype.blastOff() +
			'!'
		);
	}
}

console.log(Catship.prototype.info());

`
},
{
level: 7,
objective: 'So time dilation is an actual pain, ugh. Last time a new trainee was allowed to set up tests for asynchronous controls the whole ship moved forward in time 1 week... that was the week of my birthday, my anniversary and mother\'s day... it changed my life for the worse. don\'t make me miss my birthday. Testing asynchronously is possible. just find the async button to  ',
function: `setTimeout(() => {
		for (var x = 1; x <= 3; x++) alert(x) }, 1000);`
	}
]

export default levels;
