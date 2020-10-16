const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')  //import app from app - express app
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const { blogsInDb } = require('./test_helper')


const initialBlogs = helper.listWithTwoBlogs

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('API - blogs are returned as json and are 2 (4.8)', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(result.body).toHaveLength(initialBlogs.length)
})

test('ID is not undefined (4.9)', async () => {

  const blogs = await api.get('/api/blogs')
  //console.log(blogs.body)
  blogs.body.map(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('POST is working (4.10)', async () => {
  let initialBlogs = await blogsInDb()

  const newBlog =  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  let finalBlogs = await blogsInDb()
  console.log("log in test", finalBlogs, "initial:", initialBlogs)
  expect(initialBlogs.length).toBe(finalBlogs.length-1)
})


afterAll(() => {
  mongoose.connection.close()
})