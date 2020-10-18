const jwt = require('jsonwebtoken')  //web tokens library
const bcrypt = require('bcrypt')      //encrypting passwords
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {  //api/login/ with req where is user and his password
  const body = request.body

  const user = await User.findOne({ username: body.username })  //search user in DB
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)  //compare passs wit bcrypt

  if (!(user && passwordCorrect)) {     //if user is not send (found)or passoword is not correct
    return response.status(401).json({  //401 = unauthorized
      error: 'invalid username or password'
    })
  }

  //password is correct and user is send and found
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)  //generate token

  response
    .status(200)  //200 = OK
    .send({ token, username: user.username, name: user.name })  // token is send
})

module.exports = loginRouter