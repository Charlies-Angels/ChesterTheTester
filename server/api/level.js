const router = require('express').Router()
const { Level } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
    Level.findOne({
        where: { level: req.params.id },
    })
        .then(level => res.json(level))
        .catch(next)
})

router.get('/', (req, res, next) => {
    Level.findAll()
        .then(level => res.json(level))
        .catch(next)
})