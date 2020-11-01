const blogsRouter = require('express').Router()
const { request } = require('express')
const jwt = require('jsonwebtoken')
//const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  //console.log(blogs.map(blog => blog.title))
  response.json(blogs.map(blog => blog.toJSON()))
})


// MY VERSION of CODE //
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  //const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //const decodedToken = jwt.decode(request.token, process.env.SECRET);
  if (!request.token  || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  // let allUsers = await User.find({})             //User.findById(request.body.userId)  -- for simplicity, userId doesnt have to be specified.
  //let user = allUsers[0]
  const blog = new Blog({
    title: body.title,
    author:  body.author,
    url:  body.url,
    likes:  body.likes || 0 ,
    user: user._id
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})


blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if(blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})


blogsRouter.delete('/:id', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'only the creator of the blog can delete blogs' })
  }

  try {
    await blog.remove()
    user.blogs = user.blogs.filter(b => b.id.toString() !== req.params.id.toString())
    await user.save()
    res.status(204).end()
    console.log('blog was deleted')
  } catch(exception) {
    next(exception)
  }
})


blogsRouter.put('/:id', async (req, res, next) => {
  const blogToBeChanged = await Blog.findById(req.params.id)
  //console.log("blogToBeChanged", blogToBeChanged)
  const body = req.body
  //console.log("Body", body)
  const blogToBeSaved = {
    author: body.author ? body.author : blogToBeChanged.author,  //basicly change only what meant to be changed
    title: body.title ? body.title : blogToBeChanged.title,
    url: body.url ? body.url : blogToBeChanged.url,
    likes: body.likes
  }
  try {
    await Blog.findByIdAndUpdate(req.params.id, blogToBeSaved,  { new: true })
    res.sendStatus(200)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter