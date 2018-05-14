const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

//const databaseURL= process.env.NODE_ENV === 'production' ? 'postgres://aa1jwzfcfpynafi.ctuvidhvqndl.us-east-1.rds.amazonaws.com:5432' :
const db = new Sequelize(
  process.env.DATABASE_URL || 'aa1jwzfcfpynafi.ctuvidhvqndl.us-east-1.rds.amazonaws.com:5432',
  {
    logging: false
  }
)
module.exports = db
