// const Sequelize = require('sequelize')
// var db = new Sequelize('chestertester', 'chestertester', 'chestertester', {
//   host: 'chestertester.ctuvidhvqndl.us-east-1.rds.amazonaws.com',
//   port: 5432,
//   logging: console.log,
//   maxConcurrentQueries: 100,
//   dialect: 'postgres',
//   dialectOptions: {
//       ssl:'Amazon RDS'
//   },
//   pool: { maxConnections: 5, maxIdleTime: 30},
//   language: 'en'
// })
// module.exports = db

const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)
module.exports = db
