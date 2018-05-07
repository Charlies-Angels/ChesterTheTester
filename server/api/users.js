const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['userId', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/user/:id', (req, res, next) => {
  User.findOne( {where: {userId: req.params.id},
    attributes: [['firstName', 'lastName', 'email', 'maximumScore']]
  })
    .then(userId => res.json(userId))
    .catch(next)
})
