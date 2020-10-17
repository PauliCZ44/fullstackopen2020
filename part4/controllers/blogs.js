const blogsRouter = require('express').Router()
//const { response } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  //response.json(blogs)
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const blog2 = new Blog({
    title: request.body.title,
    author:  request.body.author,
    url:  request.body.url,
    likes:  request.body.likes || 0
  })
  try {
    const savedBlog = await blog2.save()
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
  try {
    await Blog.findByIdAndRemove(req.params.id)
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
    author: body.author ? body.author : blogToBeChanged.author,
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