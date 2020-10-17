const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const  users = await User.find({})
  console.log(users)
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    let savedUser = await newUser.save()
    res.status(201).json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})


module.exports = usersRouter
