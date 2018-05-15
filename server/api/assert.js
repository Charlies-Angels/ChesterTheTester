const router = require('express').Router()
const { Assert } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
    Assert.findOne({
        where: { id: req.params.id },
    })
        .then(assert => res.json(assert))
        .catch(next)
})

router.get('/', (req, res, next) => {
    Assert.findAll()
        .then(assert => res.json(assert))
        .catch(next)
})
