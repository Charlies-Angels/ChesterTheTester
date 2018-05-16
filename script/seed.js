
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
    buttons: ['allSystemsCheck'],
    testToPass: 1,
    intro: `Ok cadets, since no one checked the critical functions of the our intergalactic rocket, I guess it's up to us to make sure things are going smoothly. We do unit testing here at Fullstack A-Cat-amy of Space. We test to check validity, make maintenance easier, for documentation, and for better understanding for those will read our code in the future. It looks like I'll have to be the one to teach you the Mocha.js framework and the Chai.js assertion library. Tests should be organized into groups using 'describe' blocks accepting a message and a callback. Individual tests should be the in the second argument of the describe block and start with 'it'. The 'it' block also takes a message as its first parameter and an anonymous function with an assertion as the second. Start by reading the code you're testing and making a game plan for how to test its validity. Let's jump in.`,
    outro: `Congrats, you've written your first Chai assertion! As you might have noticed, you have many options for how to test your code. 'isBoolean', 'isTrue', and 'typeOf' would all pass in these circumstances. But isTrue would be our best bet for this code block. 'isBoolean' and 'typeOf' are too general for these purposes. Try to be as specific as possible. Below are the tests you wrote and results of those assertions. Onto the next!`,
  },
  {
    level: 1,
    title: `All Systems are Go?`,
    func: `const allSystemCheck = true;
    const allSystemsAreGo = (allSystemCheck) => {
  if (allSystemCheck === true) {
    return 'Ready for liftoff!';
  }
  else {
    throw new Error('Systems Check failure!');
  }
};`,
    objective: 'Check that all systems are go!',
    instructions: `Write a test for the function 'allSystemsAreGo' to check that its return value equals what we expect. Note that we must invoke our function inside of the test to check its return value!`,
    itBlock: `allSystemsAreGo returns "Ready for liftoff!"`,
    tests: ['strictEqual', 'equal', 'isTrue', 'typeOf', 'isString'],
    actual: 'allSystemsAreGo(allSystemCheck)',
    buttons: ['allSystemsAreGo(allSystemCheck)'],
    testToPass: 1,
    intro: `Now that all of our systems have been checked, it's time confirm that we're ready for liftoff. On the next level you'll see a function that accepts the variable from last level, 'allSystemCheck', as an argument. allSystemsAreGo() returns a string if true is passed into it, so try to pick an assertion that tests that we are, indeed, ready for liftoff. Ok, go on and test!`,
    outro: `READY FOR LIFTOFF! Purrrr! So now that that work is done, lets prepare to actually blast off into space. You my have noticed that 'equal' and 'strictEqual' perform a very similar check, but 'equal' can evaluate equality with type coersion (like '0' == 0), which is not really necessary in this particular tes4t. Now, let's launch our rocket so we can get on with the real work of space exploration!`,
  },
  {
    level: 2,
    title: `Launch Rocket!`,
    objective: 'launchRocket() completes the countdown to liftoff!',
    func: `const launchRocket = () => {
  const countDown = [];
  let counter = 10;
  while (counter > 0) {
    countDown.push(counter);
    counter--;
  }
  return countDown.concat('Liftoff!');
};`,
    tests: ['equal', 'lengthOf', 'isArray', 'isNumber', 'isFunction', 'include'],
    instructions: `Pass 2 tests to successfully launch the rocket. Notice that launchRocket is a function that returns an array of numbers 10-1 and 'Liftoff!.  In this level, there will be multiple functions/variables you can use in writing your unit tests. The choice is yours...`,
    itBlock: `launchRocket() returns an array of numbers 10 through 1 and 'Liftoff!'`,
    testToPass: 2,
    buttons: ['launchRocket', 'launchRocket()'],
    intro: `Okay great, you can test a function. I don't know if you've ever been part of a catship crew, but it's pretty common in our industry to do a countdown before liftoff. Now that we know that all systems are go, let's make sure our countdown is functioning properly. Our countdown starts at 10 and counts down to 1 and that's a pretty essential step of preparing for liftoff on a catship. We have to make sure we're all on the schedule, ok? Synchronized watches can only get you so far. Let's write 2 passing tests to check launchRocket`,
    outro: `Nice! Wow, SPACE, am I right? It's nice out here, so far away from the high school bullies who doubted I could ever be an astroCat. *ahem* Now,our function only ever returns an array, so 'isArray' will definitely pass, but is that the best you can do? I'd wager that 'lengthOf', 'equal' or 'includes' are our better options for testing what our function specificity returns. But regardless, we've made it! We're floating along in our little tin can and preparing for some hardcore space exploration.`,
  },
  {
    level: 3,
    title: 'Meteor check!',
    objective: `meteorFrequency groups and counts all of the meteors in sensor range`,
    func: `const meteorFrequency = (meteors) => {
  return meteors.reduce((meteorsByType, type) => {
    if (type in meteorsByType) {
      meteorsByType[type]++;
    } else {
      meteorsByType[type] = 1;
    }
    return meteorsByType;
  }, {});
};
    const meteorsInRange = [
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
      'Iron meteor'
    ];
     `,
     tests: ['isObject', 'isOk', 'isArray', 'lengthOf', 'property', 'propertyVal'],
     buttons: ['meteorsInRange', 'meteorFrequency(meteorsInRange)'],
     instructions: `Pass 2 tests to check that the variable 'meteorsInRange' and the function 'meteorFrequency' are working properly! We use Array.prototype.reduce to iterate over the meteorsInRange array to return an object with a unique key name for each type of meteor we encounter and a value for how many we've seen. Cool! We are working with objects now, so you'll see some new assertion types, property and propertyVal.`,
     itBlock: `meteorFrequency should return an object`,
     testToPass: 2,
    intro: `Finally we're flying. This is what it's all about... Now that the catship is airborne, let's do an analysis of our meteor sensors. It looks like there are mostly iron meteors floating around. Let's use tests to make sure our radar is actually storing the meteors in range and then automatically sorting them by type. Iron meteors are way more dense, so we do our best to avoid them. So, before we smash into a wall of iron meteors lets write at least three tests for our meteor analysis`,
    outro: `Look at you, mighty tester! You're really starting to pull your weight on the ship. I'm so pleased to know that our radar is functioning properly and we can navigate space without running into any meteors. The assertion 'property', checks to see if that given value is a property in the object is it is being called upon. 'propertyVal' does a similar, deeper check, searching for a particular key/value pair. In Javacscript, because objects are passed by reference, we have write more precise tests than we do when testing primitives.`
  },
  {
    level: 4,
    title: 'First stop, Superior Station',
    objective: `Testing out the new Catship at Superior Station`,
    func: `class Spacecraft {
  constructor (model, warp, crew) {
    this.model = model;
    this.maxWarp = warp;
    this.currentWarp = 0;
    this.crewSize = crew;
  }
  punchIt () {
    return 'Whoosh!'
  }
  setWarpDrive (newWarp) {
    if (newWarp > this.maxWarp) {
      return \`Warning! $\{newWarp} exceeds max warp. Enter a warp speed less than or equal to $\{this.maxWarp}\`
    }
    else {
      this.currentWarp = newWarp;
      return \`Current warp is set to $\{this.currentWarp}\`
    }
  }
}
    const Catship = new Spacecraft('18.0.2', 4.5, 350)
    Catship.setWarpDrive(5.2)
    Catship.setWarpDrive(4.5)`,
    tests: ['instanceOf', 'equal', 'isNumber', 'isTrue', 'strictEqual'],
    buttons: ['Catship', 'Catship.model', 'Catship.setWarpDrive(4.5)'],
    instructions: `Write 2 tests for 'Catship', a child of the class, 'Spacecraft'. Test the properties on this class to verify that everything is working properly.`,
    testToPass: 2,
    itBlock: `Catship should have access to the properties of its constructor`,
    intro: `Well aren't we lucky? Chicago (where our headquarters are) just contacted us saying that my archrival, Potato, has totally dropped the ball on her mission. No surprises here. Now, we have the best job you can possibly get while deployed on a Fullstack ship, testing out new spacecraft and trying to break them. Let's write some tests to ensure that our new Model 18.0.2 behaves how we want it to.`,
    outro: `Aren't ES6 classes just wonderful? They save you so much time and energy by not having to repeat any code for properties shared across multiple iterations. We did such a good job on this last sub-mission that we've been tasked to test out some other hot new tech on Superior Station. Let's go!`,
  },
  {
    level: 5,
    title: 'Bait and Switch',
    objective: `Taking inventory of projectiles at Superior Station`,
    func: `class Projectile {
  constructor (quantity, type) {
    this.quantity = quantity;
    this.type = type;
  }
  getConstructorName() {
    return this.constructor.name;
  }
}

class Torpedo extends Projectile {
  constructor (quantity, type) {
    super(quantity, type)
  }
}

const spatial = new Torpedo(20, 'Spatial');
const quantum = new Torpedo(15, 'Quantum');
const stunGrenade = new Projectile(150, 'Stun Grenade');
const timeStopper = new Projectile(37, 'Time Stopper');
const photon = new Torpedo(75, 'Photon');
const gravimetric = new Torpedo(5, 'Gravimetric');

const projectileInventory = [spatial, quantum, stunGrenade, photon, timeStopper, gravimetric];

const torpedoInventory = projectileInventory.reduce((total, projectile) => {
  if (projectile.getConstructorName() === 'Torpedo') {
    total += projectile.quantity
  }
  return total;
}, 0)`,
    tests: ['instanceOf', 'equal', 'isNumber', 'property', 'strictEqual'],
    buttons: ['Torpedo', 'torpedoInventory', 'quantum.getConstructorName()', 'spatial'],
    instructions: `Write 3 tests to check that our torpedoInventory workaround function is working properly. `,
    testToPass: 3,
    itBlock: `torpedoInventory should equal 115`,
    intro: `It seems we've been duped. It also seems that my rivalry with Potato will persist because she's set us up. While testing out the newest model of the Catship was an exhilerating experience, the crew at Superior neglected to inform us that it also comes with the task of taking inventory of all of the torpedoes in the station. Potato screwed with the inventory so it includes all projectiles, not just torpedoes. So we're going to reduce over the whole collection to find what we're looking for and count them. And, then, of course, write tests for it.`,
    outro: `Nice job, glad that's over. Let's get out of here before we get wrangled in to doing anymore kitten work! We are grown up astro-cats and really have no business taking inventory on some silly station, we are supposed to explore space. Blastoff again!`,
  },
  {
    level: 10,
    title: 'Classy spacecraft of the 21st century',
    objective: 'Building a new spacecraft using ES6 Classes',
    func: `class Spacecraft {
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
    intro: `Pop Quiz! We're here to test catship operations, obviously. So then, you should know the difference between a Spacecraft, a rocket and a catship. See the ES6 code and check if you know that the return statement would say.`,
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
  console.log(`seeded ${asserts.length} asserts`)
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
