const router = require('express').Router()
const Sandbox = require('sandbox')
const { Level } = require('../db/models')

module.exports = router

let sand = new Sandbox();

router.post('/', (req, res, next) => {
	Level.findById(req.body.level)
	.then(result => {
		sand.run(result['function'] + ';' + req.body.sandbox, function(output){
			res.json(output.result)
		})
	})
})

router.post('/test-generator', (req, res, next) => {
	sand.run(req.body.input, function(output){
		res.json(output.result)
	})
})
