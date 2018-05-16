const router = require('express').Router()
const Sandbox = require('sandbox')
const { Level, Assert } = require('../db/models')

module.exports = router

let sand = new Sandbox();

router.post('/', async (req, res, next) => {
	try {
		const assert = await Assert.findOne({where: {assert: req.body.assert}})
		const level = await Level.findOne({where: {level: req.body.level}})
    	const run = `${level.dataValues.func};${assert.dataValues.func};${req.body.assert}('${req.body.itBlock}',${req.body.sandbox},${req.body.inputs[0] ? req.body.inputs.join(',') : ''});`;
    	console.log(run);
		return sand.run(run, function(output){
			res.json(output.result)
		})
	}
	catch (error) {
		next(error);
	}
})

router.post('/test-generator', async (req, res, next) => {
	const assert = await Assert.findOne({where: {assert: req.body.assert}})
	let run = `${req.body.generator};${assert.dataValues.func};${req.body.assert}('${req.body.itBlock}',${req.body.input},${req.body.inputs[0] ? req.body.inputs.join(',') : ''});`
	console.log(run)
	return sand.run(run, function(output){
		res.json(output.result)
	})

})
