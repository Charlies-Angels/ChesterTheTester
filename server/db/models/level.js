const Sequelize = require('sequelize')
const db = require('../db')

const Level = db.define('Level', {
    level: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    objective: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    func: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    buttons: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
    },
    solutions: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    itBlock: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    instructions: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    tests: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    actual: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    testToPass: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
})

module.exports = Level
