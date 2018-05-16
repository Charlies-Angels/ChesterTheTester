
const db = require('../server/db')
const {User, Level, Assert} = require('../server/db/models')

const asserts = [
{
  assert: 'typeOf',
  func: `const typeOf = (msg, actual, expected) => {
    if (typeof actual === expected) {return msg};
    return (msg + ', Expected ' + actual + ' to be a type of ' + expected);
  };`,
  args: ['actual', 'expected'],
}, {
  assert: 'equal',
  func: `const equal = (msg, actual, expected) => {
    if (actual == expected) {return msg};
    return (msg + ', Expected ' + actual + ' to be equal to ' + expected);
  };`,
  args: ['actual', 'expected'],
}, {
  assert: 'strictEqual',
  func: `const strictEqual = (msg, actual, expected) => {
    if (actual === expected) {return msg};
    return (msg + ', Expected ' + actual + ' to be equal to ' + expected);
  };`,
  args: ['actual', 'expected'],
}, {
  assert: 'isTrue',
  func: `const isTrue = (msg, actual) => {
    if (actual === true) {return msg};
    return (msg + ', Expected ' + actual + ' to be true');
  };`,
  args: ['actual'],
}, {
  assert: 'isFalse',
  func: `const isFalse = (msg, actual) => {
    if (actual === false) {return msg};
    return (msg + ', Expected ' + actual + ' to be false');
  };`,
  args: ['actual'],
}, {
  assert: 'isNull',
  func: `const isNull = (msg, actual) => {
    if (actual === null) {return msg};
    return (msg + ', Expected ' + actual + ' to be null');
  };`,
  args: ['actual'],
}, {
  assert: 'isNotNull',
  func: `const isNotNull = (msg, actual) => {
    if (actual !== null) {return msg};
    return (msg + ', Expected ' + actual + ' to not be null');
  };`,
  args: ['actual'],
}, {
  assert: 'isUndefined',
  func: `const isUndefined = (msg, actual) => {
    if (actual === undefined) {return msg};
    return (msg + ', Expected ' + actual + ' to be undefined');
  };`,
  args: ['actual'],
}, {
  assert: 'isNotUndefined',
  func: `const isNotUndefined = (msg, actual) => {
    if (actual !== undefined) {return msg};
    return (msg + ', Expected ' + actual + ' to not be undefined');
  };`,
  args: ['actual'],
}, {
  assert: 'isArray',
  func: `const isArray = (msg, actual) => {
    if (Array.isArray(actual) === true) {return msg};
    return (msg + ', Expected ' + actual + ' to be an array');
  };`,
  args: ['actual'],
}, {
  assert: 'isObject',
  func: `const isObject = (msg, actual) => {
    if (typeof actual === 'object') {return msg};
    return (msg + ', Expected ' + actual + ' to be an object');
  };`,
  args: ['actual'],
}, {
  assert: 'isFunction',
  func: `const isFunction = (msg, actual) => {
    if (typeof actual === 'function') {return msg};
    return (msg + ', Expected ' + actual + ' to be a function');
  };`,
  args: ['actual'],
}, {
  assert: 'isString',
  func: `const isString = (msg, actual) => {
    if (typeof actual === 'string') {return msg};
    return (msg + ', Expected ' + actual + ' to be a string');
  };`,
  args: ['actual'],
}, {
  assert: 'isNumber',
  func: `const isNumber = (msg, actual) => {
    if (typeof actual === 'number') {return msg};
    return (msg + ', Expected ' + actual + ' to be a number');
  };`,
  args: ['actual'],
}, {
  assert: 'isBoolean',
  func: `const isBoolean = (msg, actual) => {
    if (typeof actual === 'boolean') {return msg};
    return (msg + ', Expected ' + actual + ' to be a boolean');
  };`,
  args: ['actual'],
}, {
  assert: 'operator',
  func: `const operator = (msg, val1, operation, val2) => {
    let checkBool = null;

    switch (operation) {
      case '<':
        checkBool = val1 < val2;
        break;
      case '>':
        checkBool = val1 > val2;
        break;
      case '==':
        checkBool = val1 == val2;
        break;
      case '===':
        checkBool = val1 === val2;
        break;
      case '!=':
        checkBool = val1 != val2;
        break;
      case '!==':
        checkBool = val1 !== val2;
        break;
      default:
        checkBool = false;
    }
    return checkBool ? msg : (msg + ', Expected ' + val1 + ' ' + operation + ' ' + val2 + ' to be true');
  };`,
  args: ['value 1', 'operator', 'value 2'],
}, {
  assert: 'isOk',
  func: `const isOk = (msg, actual) => {
      if (actual) return msg;
      return (msg + ', Expected ' + actual + ' to be equal to be ok (truthy)');
  };`,
  args: ['actual'],
}, {
  assert: 'isNotOk',
  func: `const isNotOk = (msg, actual) => {
      if (!actual) {return msg};
      return (msg + ', Expected ' + actual + ' to be equal to not be ok (falsey)');
  };`,
  args: ['actual'],
}, {
  assert: 'instanceOf',
  func: `const instanceOf = (msg, instance, con) => {
      if (instance instanceof con) return msg;
      return (msg + ', Expected ' + instance + ' to be an instance of ' + con);
  };`,
  args: ['instance', 'con'],
}, {
  assert: 'include',
  func: `const include = (msg, actual, searchTerm) => {
    if (Array.isArray(actual) || typeof actual === 'string') {
      if (actual.includes(searchTerm)) return msg;
    }
    else if (typeof actual === 'object' && actual.hasOwnProperty(searchTerm)) {
      return msg;
    };
    return (msg + ', Expected ' + actual + ' to include ' + searchTerm);
  };`,
  args: ['actual', 'searchTerm'],
}, {
  assert: 'notInclude',
  func: `const notInclude = (msg, actual, searchTerm) => {
    if (Array.isArray(actual) || typeof actual === 'string') {
      if (!actual.includes(searchTerm)) return msg;
    }
    else if (typeof actual === 'object' && !actual.hasOwnProperty(searchTerm)) {
      return msg;
    };
    return (msg + ', Expected ' + actual + ' to not include ' + searchTerm);
  };`,
  args: ['actual', 'searchTerm'],
}, {
  assert: 'match',
  func: `const match = (msg, value, regexp) => {
    if (value.match(regexp)) {
      return msg;
    }
    return (msg + ', Expected ' + value + ' to match ' + regexp);
  };`,
  args: ['value', 'regexp'],
}, {
  assert: 'property',
  func: `const property = (msg, object, prop) => {
    if (object.hasOwnProperty(prop)) {
      return msg;
    }
    return (msg + ', Expected ' + object + ' to have the property ' + prop);
  };`,
  args: ['object', 'property'],
}, {
  assert: 'lengthOf',
  func: `const lengthOf = (msg, actual, len) => {
    if (actual.length === len) {
      return msg;
    }
    return (msg + ', Expected ' + actual + ' to have length of ' + len);
  };`,
  args: ['actual', 'length'],
}, {
  assert: 'propertyVal',
  func: `const propertyVal = (msg, object, property, value) => {
    if (object[property] === value) {
      return msg;
    }
    return (msg + ', Expected ' + object + ' to have a property of ' + property + ', with a value of ' + value);
  };`,
  args: ['object', 'property', 'value'],
}, {
  assert: 'closeTo',
  func: `const closeTo = (msg, actual, expected, delta) => {
    if (actual === expected) return msg;
    else if (actual < expected && actual + delta >= expected) return msg;
    else if (actual > expected && actual + delta <= expected) return msg;
    else return (msg + ', Expected ' + actual + ' to be close to ' + expected);
  };`,
  args: ['actual', 'expected', 'delta'],
}
]

const levels = [
  {
    level: 0,
    title: 'Check All Systems',
    func: `const allSystemsCheck = true;`,
    objective: 'Check all Systems!',
    instructions: `Test the variable, 'allSystemsCheck', to be sure that it returns a boolean. Pick which Mocha assertion you'd like to use on the right side and it will appear in the test code block below. Some assertions require a second input to check your code against. For instance, 'typeoOf' accepts a string of what data type the tested code should return. Write tests until the NEXT LEVEL button lights up.`,
    itBlock: 'allSystemsCheck should be a boolean',
    tests: ['typeOf', 'isBoolean', 'isTrue', 'isFalse', 'isArray'],
    actual: 'allSystemsCheck',
    buttons: ['allSystemsCheck'],
    testToPass: 1,
    intro: `Ok cadets, since no one checked the critical functions of the our intergalactic rocket, I guess it's up to us to make sure things are going smoothly. We do unit testing here at Fullstack A-Cat-amy of Space. We test to check validity, make maintenance easier, for documentation, and for better understanding for those will read our code in the future. It looks like I'll have to be the one to teach you the Mocha.js framework and the Chai.js assertion library. Tests should be organized into groups using 'describe' blocks accepting a message and a callback. Individual tests should be the in the second argument of the describe block and start with 'it'. The 'it' block also takes a message as its first parameter and an anonymous function with an assertion as the second. Start by reading the code you're testing and making a game plan for how to test its validity. Let's jump in.`,
    outro: `You've written your first Chai assertion, congrats! As you might have noticed, you have many options for how to test your code. 'isBoolean', 'isTrue', and 'typeOf' would all pass in these circumstances. But isTrue would be our best bet for this code block. 'isBoolean' and 'typeOf' are too general for these purposes. When we are testing behavior driven events, try to be as specific as possible. Onto the next!`,
  },
  {
    level: 1,
    title: `All Systems are Go?`,
    func: `const allSystemCheck = true;
    const allSystemsAreGo = (allSystemCheck) => {
      if (allSystemCheck) return 'Ready for liftoff!';
      else return 'Definitely not ready for liftoff...'
    };`,
    objective: 'Check that all systems are go!',
    instructions: `Write a test for the function 'allSystemsAreGo' to check that the return value equals what we expect. Note that we must invoke our function to test its return value!`,
    itBlock: `allSystemsAreGo returns "Ready for liftoff!"`,
    tests: ['strictEqual', 'equal', 'isTrue', 'typeOf', 'isString'],
    actual: 'allSystemsAreGo(allSystemCheck)',
    buttons: ['allSystemsAreGo(allSystemCheck)'],
    testToPass: 1,
    intro: `Now that all of our systems have been checked, it's time to check if we're ready for liftoff. On the next level you'll see a function that takes allSystemCheck as a parameter. allSystemsAreGo() returns a string in both cases, so try to pick an assertion that is as specific as possible. Ok, go on and test!`,
    outro: `SOME TEXT LATER OKKKKKK`,
  },
  {
    level: 9,
    title: `Lift Off!`,
    objective: 'Check that the rocket can launch. ',
    func:
    `const launchRocket = () => {
      let countDown = [];
      let counter = 10;
      while (counter > 0) {
        countDown.push(counter);
        counter--;
      }
      return countDown;
    };
    `,
    tests: ['equal', 'lengthOf', 'typeOf', 'isString', 'isArray', 'isNumber', 'isFunction', 'include'],
    instructions: `Pass 3 tests to successfully launch the rocket. In this level, there will be multiple functions/variables you can test against. The choice is yours...`,
    itBlock: `launchRocket() returns an array containing [10,9,8,7,6,5,4,3,2,1]`,
    testToPass: 3,
    buttons: ['launchRocket', 'launchRocket()'],
    intro: `Okay great, you can test a function. I don't know if you've ever been part of a catship crew, but it's pretty common for a catship to countdown before liftoff. Now that we know that all systems are go we can just make sure our countdown works. you'll see that launchRocket is a function that returns and array of numbers 10-0, that's a pretty essential part of catship operation. let's write 5 tests to check launchRocket`,
    outro: `SOME TEXT LATER OKKKKKK`,
  },
  {
    level: 10,
    title: 'Classy spacecraft of the 21st century',
    objective: 'Building a new spacecraft using ES6 Classes',
    func: `
    class Spacecraft {
      fly() {
        return 1;
      }
    }

    class Rocket extends Spacecraft {
      blastOff() {
        return 'blast off';
      }
    }

    class Catship extends Rocket {
      info() {
        if(Catship.prototype.fly()===1){
          return (
            'Time for the Catship to ' + Catship.prototype.blastOff() + '!'
          );
        }
      }
    }
    `,
    tests: ['equal', 'isString', 'isArray', 'isNumber', 'include', 'operator'],
    instructions: 'Pass 5 tests to successfully build the new Spacecraft',
    itBlock: 'info(), fly(), blastOff() tests',
    testToPass: 5,
    buttons: ['Catship.prototype.info()', 'Spacecraft.prototype.fly()', 'Rocket.prototype.blastOff()', 'Catship.prototype.info', 'Spacecraft.prototype.fly', 'Rocket.prototype.blastOff'],
    solutions: 'Catship: it remains true that Catship is an instance of Spacecraft, therefore they fly and blast off!',
    suggestedTests: ['isFunction,Catship.prototype.info', 'isString,Catship.prototype.info()', 'equal,Spacecraft.prototype.fly(),`they fly`'],
    intro: 'Pop Quiz! We\'re here to test catship operations, obviously. So then, you should know the difference between a Spacecraft, a rocket and a catship. See the ES6 code and check if you know that the return statement would say.',
  }
]

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  await Level.bulkCreate(levels);
  await Assert.bulkCreate(asserts);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${levels.length} levels`)
  console.log(`seeded $`)
  console.log(`seeded successfully`)
}

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

console.log('seeding...')
