const router = require('express').Router()
const Sandbox = require('sandbox')

module.exports = router

const levels = [{
	level: 1,
	fn: `
		const launchRocket = () => {
			let countDown = [];
			let counter = 10;
			while (counter>-1) {
				countDown.push(counter);
				counter--;
			}
			return countDown;
		}
	`,
},{
	level: 2,
	fn: `
		function mtrFrequency(meteorsInRange) {
			const mtrAnalysis = meteorsInRange.reduce(function (meteorsInRange, type) {
				if (type in meteorsInRange) {
					meteorsInRange[type]++;
				}
				else {
					meteorsInRange[type] = 1;
				}
				return meteorsInRange;
			}, {});
			return mtrAnalysis;
		}
	`,
},{
	level: 3,
	fn: `
		const swap = (array, i, j) => {
			let temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}

		function spaceSort(array) {
			let swaps = 0;
			for (let i = 0; i < array.length - 1; i++) {
				if (array[i] > array[i + 1]) {
					swap(array, i, i + 1);
					swaps++;
				}
			}

			if (swaps > 0) {
				return spaceSort(array);
			}
			return array;
		}
	`,
}
]

let sand = new Sandbox();

router.post('/', (req, res, next) => {
	sand.run(levels[req.body.level].fn + ';' + req.body.sandbox, function(output){
		res.json(output.result)
	})
})
