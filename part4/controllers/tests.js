const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.get('/', async (request, response) => {
  response.send('Endpoint for reseting the DB content. Try post to /reset to delete DB content (users and blogs)')
})

module.exports = router
