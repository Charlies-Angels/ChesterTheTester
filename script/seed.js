
const db = require('../server/db')
const {User, Level} = require('../server/db/models')

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
  // {
  //   level: 2,
  //   title: `Lift Off!`,
  //   objective: 'Okay ket',
  //   func:
  //   `const launchRocket = () => {
  //     let countDown = [];
  //     let counter = 10;
  //     while (counter > -1) {
  //       countDown.push(counter);
  //       counter--;
  //     }
  //     return countDown;
  //   };
  //   `,
  //   tests: ['strictEqual', 'equal', 'isTrue', 'typeOf', 'isString'],
  //   instructions: `Write a test`,
  //   itBlock: `allSystemsAreGo returns "Ready for liftoff!"`,
  //   testToPass: 1,
  //   buttons: ['launchRocket().length', 'launchRocket', 'launchRocket()'],
  //   solutions: '[ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]',
  //   suggestedTests: ['isFunction,launchRocket', 'isArray,launchRocket()', 'equal, launchRocket(), [10,9,8,7,6,5,4,3,2,1,0]']
  // },
]

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  await Level.bulkCreate(levels);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${levels.length} levels`)
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
