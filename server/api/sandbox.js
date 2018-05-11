const router = require('express').Router()
const Sandbox = require('sandbox')
const { Level } = require('../db/models')

module.exports = router

let sand = new Sandbox();

router.post('/', (req, res, next) => {
  console.log(req.body.sandbox);
	Level.findOne({where: {level: req.body.level}})
	.then(response => {
		sand.run(response.func + ';' + req.body.sandbox, function(output){
      console.log(output)
			res.json(output.result)
		})
	})

})
