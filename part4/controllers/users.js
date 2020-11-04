const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const  users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, likes: 1 })  //
  //console.log(users)
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body
  if (body.username === undefined) {
    return res.status(400).json({ error: 'username missing' })
  } else if (body.password === undefined) {
    return res.status(400).json({ error: 'password missing' })
  } else if (body.password.length <= 3) {
    return res.status(400).json({ error: 'password must be at least 3 chars long' })
  }

  try {
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
