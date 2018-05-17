/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Level = db.model('Level')

describe('Level routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/level/100', () => {

    beforeEach(() => {
      return Level.create({
        level: 100,
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

    it('GET /api/level', () => {
      return request(app)
        .get('/api/level')
        .expect(200)
        .then(res => {
          expect(res.body).to.an('array')
          expect(res.body[0].level).to.equal(100)
          expect(res.body[0].title).to.equal('test title')
          expect(res.body[0].func).to.be.a('string')
          expect(res.body[0].objective).to.equal('test tests')

          expect(res.body[0].instructions).to.equal(`just test the tests`)
          expect(res.body[0].itBlock).to.equal(`test it`)
          expect(res.body[0].tests).to.be.a('array')
          expect(res.body[0].actual).to.equal(
            'allSystemsAreGo(allSystemCheck)'
          )
          expect(res.body[0].buttons).to.be.a('array')
          expect(res.body[0].testToPass).to.equal(1)
          expect(res.body[0].intro).to.equal(`test INTRO`)
          expect(res.body[0].outro).to.equal(
            `testOUTRO`
          )
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
