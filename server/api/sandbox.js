const router = require('express').Router()
const Sandbox = require('sandbox')

module.exports = router

const launchRocket = `const launchRocket = () => {
		let countDown = [];
		let counter = 10;
		while (counter>-1) {
			countDown.push(counter);
			counter--;
		}
		return countDown;
	}`

let sand = new Sandbox();

router.post('/', (req, res, next) => {
	sand.run(launchRocket + ';' + req.body.sandbox, function(output){
		res.json(output.result)
	})
})
