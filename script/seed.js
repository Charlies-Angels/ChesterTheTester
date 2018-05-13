
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
