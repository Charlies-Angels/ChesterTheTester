const Sequelize = require('sequelize')
const db = require('../db')

const Level = db.define('Level', {
    level: {
        type: Sequelize.STRING,
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
    function: {
        type: Sequelize.STRING,
        allowNull: false
    },
    buttons: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },
    solutions: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Level
