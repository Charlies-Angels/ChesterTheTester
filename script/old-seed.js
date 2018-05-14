
const db = require('../server/db')
const {User, Level} = require('../server/db/models')

const levels = [
  {
    level: 0,
    title: 'Check All Systems',
    func: `const allSystemsCheck = true;`,
    objective: 'Check that all systems are go!',
    buttons: ['allSystemsCheck'],
    instructions: `Test the variable, 'allSystemsCheck', to be sure that it returns a boolean. Pick which Mocha assertion you'd like to use on the right side. It will appear in the code block below. Some assertions require a second input to check your code against. For instance, 'typeoOf' accepts a string of what data type the tested code should return. `,
    itBlock: 'allSystemsCheck should be a boolean',
    tests: ['typeOf', 'isBoolean', 'isTrue', 'isFalse', 'isArray'],
    actual: 'allSystemsCheck',
    testToPass: 1,
  },
{
  level: 1,
  title: `All Systems are Go?`,
  func: `const allSystemCheck = true;
  const allSystemsAreGo = (allSystemCheck) => {
    if (allSystemCheck) return 'Ready for liftoff!';
    else return 'Definitely not ready for liftoff...'
  };`,
  objective: `Okay, now that all of our systems have been checked, it's time to check if we're ready for liftoff. Write two tests for the function 'allSystemsGo', one that checks if the return value is a string, and another to check that that value equals we expect. Note that we must invoke our function to test its return value!`,
  buttons: ['allSystemsAreGo(allSystemCheck)'],
  itBlock: [`allSystemsAreGo returns a string`, `allSystemsAreGo returns 'Ready for liftoff!'`],
  tests: ['strictEqual', 'equal', 'isTrue', 'typeOf', 'isString'],
  actual: 'allSystemsAreGo(allSystemCheck)',
  testToPass: 2,
},
  {
  level: 2,
  title: `All systems are go, ready for liftoff!`,
  objective: 'Great, you wrote a test. can you write a second test? I suggest comparing the functions you see on the right side of the page with the assertions on the left. there are a lot of options for both. Next you\'ll see a function that takes allSystemCheck as a parameter. That means you can test the function as a variable which would pass a test check if the test was "isFunction". The instanciated function would return a different fail that same test. allSystemsAreGo() actually returns a string. So "isString", "isOK", and "isNotNull" are all options to check the existence and type of the return from allSystemsAreGo(), while "typeOf" and "equal" require you to input an expected value. Find what you expect to return from the instantiated function. Ok, go on and test!',

  func: `
  const allSystemCheck = true;
  const allSystemsAreGo = (allSystemCheck) => {
    if (allSystemCheck) return 'Ready for liftoff!';
  };
    `,

  buttons: ['allSystemCheck', 'allSystemsAreGo(allSystemCheck)'],
  solutions: 'Ready for liftoff!',
  suggestedTests: ['isBoolean,allSystemCheck', 'strictEqual,allSystemsAreGo(),Ready for liftoff!']
},
{
  level: 3,
  title: `Lift Off!`,
  objective: 'Okay great, you can test a function. I don\'t know if you\'ve ever been part of a catship crew, but it\'s pretty common for a catship to countdown before liftoff. Now that we know that all systems are go we can just make sure our countdown works. you\'ll see that launchRocket is a function that returns and array of numbers 10-0, that\'s a pretty essential part of catship operation. let\'s write 3 tests to check launchRocket',
  func:
  `const launchRocket = () => {
    let countDown = [];
    let counter = 10;
    while (counter > -1) {
      countDown.push(counter);
      counter--;
    }
    return countDown;
  };
  `,
  buttons: ['launchRocket().length', 'launchRocket', 'launchRocket()'],
  solutions: '[ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]',
  suggestedTests: ['isFunction,launchRocket', 'isArray,launchRocket()', 'equal, launchRocket(), [10,9,8,7,6,5,4,3,2,1,0]']
},
{
  level: 4,
  title: 'Meteor check!',
  objective: 'Finally we\'re flying. This is what it\'s all about... Now that the catship is airborne, let\'s do an analysis of our meteor radar. It looks like there are mostly iron meteors floating around. Let\'s use tests to make sure our radar is actually storing the meteors in range and then automatically sorting them by type. Iron meteors are way more dense, so we do our best to avoid them. So, before we smash into a wall of iron meteors lets write at least three tests for our meteor analysis',
  func:
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
   `,
   buttons: ['mtrFrequency', 'meteors', 'mtrFrequency(meteors)' ],
   solutions:
   `{
   'Iron meteor': 5,
   'Stone meteor': 4,
   'Stoney-iron meteor': 2,
   'Undetermined meteor': 1
    }`,
   suggestedTests: ['isFunction,mtrFrequency', 'isObject,mtrFrequency()', 'equals, launchRocket(), [10,9,8,7,6,5,4,3,2,1,0]']
},
{
  level: 5,
  title: 'Sorting to find life!',
  objective: 'Time for my favorite task of the day,searching the galaxy for inhabitable exoplanets. This catship uses a sensor that populates new "goldi-locks" planet into an "exoplanet" array. Then the catship\'s onboard computer uses an advanced technique to rapidly find the planet most likely to be life sustaining before the sort is even complete. let\'s write at least three tests to make sure this system is in tip top shape. ',
  func: `
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
  `,
  buttons: ['planetSort', 'planetSort(exoplanets)', 'planetSort',
  'planetSort(meteors)', 'exoplanets', 'exoplanets()' ],
  solutions: '[ 4344, 234444, 734321, 1124560, 3111000, 5324246, 8234566 ]',
  suggestedTests: ['isFunction,planetSort', 'isArray,exoplanets', 'isDefined,launchRocket(exoplanets), isNotNull,exoplanets']
},
{
level: 6,
title: 'Classy spacecraft of the 21st century',
objective: 'Pop Quiz! We\'re here to test catship operations, obviously. So then, you should know the difference between a Spacecraft, a rocket and a catship. See the ES6 code and check if you know that the return statement would say.',
func: `
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
      'Catship: it remains ' +
      (Catship.prototype instanceof Rocket) +
      ' that Catship is an instance of Spacecraft, therefore ' +
      Catship.prototype.fly() +
      ' and ' +
      Catship.prototype.blastOff() +
      '!'
    );
  }
}
`,
buttons: ['Catship.prototype.info()', 'Spacecraft.prototype.fly()', 'Rocket.prototype.blastOff()', 'Catship.prototype.info', 'Spacecraft.prototype.fly', 'Rocket.prototype.blastOff'],

solutions: 'Catship: it remains true that Catship is an instance of Spacecraft, therefore they fly and blast off!',
suggestedTests: ['isFunction,Catship.prototype.info', 'isString,Catship.prototype.info()', 'equal,Spacecraft.prototype.fly(),`they fly`']
},
// {
// level: 7,
// title: 'All I want for my birthday is my family back',
// objective: 'So time dilation is an actual pain, ugh. Last time a new trainee was allowed to set up tests for asynchronous controls the whole ship moved forward in time 1 month... that was the month of my birthday, my anniversary and mother\'s day... it changed my life for the worse. don\'t make me miss my birthday. Testing asynchronously is possible. just find the async button to activate the async test. Notice that it wraps the second parameter of the "it" block in a "async" call and passes in "done" as a callback. done is also instantiated in the try and the catch blocks.',
// function: `setTimeout(() => {
//     for (var x = 1; x <= 3; x++) alert(x) }, 1000);
//   }
//   `,
// buttons: ['']

// }
]

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Level.bulkCreate(levels);

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
