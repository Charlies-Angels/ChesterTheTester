const Sequelize = require('sequelize')
const db = require('../db')

const Assert = db.define('Assert', {
	assert: {
		type: Sequelize.STRING,
		allowNull: false
	},
    func: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    args: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },
})

module.exports = Assert
