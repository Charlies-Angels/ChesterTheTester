/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Sandbox = require('sandbox')
const { Level } = require('../db/models')

describe('Sandbox routing', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/sandbox/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Level.create({
        level: 101,
        title: `test title`,
        func: `
        const testFunc = () => {
          return 'test';
        }
        `,
        objective: 'test tests',
        instructions: `just test the tests`,
        itBlock: `test it`,
        tests: ['strictEqual', 'test'],
        actual: 'allSystemsAreGo(allSystemCheck)',
        buttons: ['test 1', 'test 2'],
        testToPass: 1,
        intro: `test INTRO`,
        outro: `testOUTRO`,
      })
    })

    xit('GET /api/sandbox', () => {
      return request(app)
        .post('/api/sandbox')
        .expect(200)
        .then(res => {
          expect(res.body).to.be('string')
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
