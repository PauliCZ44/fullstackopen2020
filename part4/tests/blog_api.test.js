/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')  //import app from app - express app
const helper = require('./test_helper')
const { blogsInDb } = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')



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
  //console.log("log in test", finalBlogs, "initial:", initialBlogs)
  //total number of vlogs is increased by one
  expect(initialBlogs.length).toBe(finalBlogs.length-1)

  //test that on DB is content of new blog
  let titles = finalBlogs.map(blog => blog.title)
  expect(titles).toContain(newBlog.title)
})

test('POST blog with undefined likes has 0 likes and is added', async () => {
  let initialBlogs = await blogsInDb()
  const blogToBePosted =  {
    title: 'Post without likes',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions2.html',
  }

  await api
    .post('/api/blogs')
    .send(blogToBePosted)
    .expect(201)

  let newBlogList = await blogsInDb()  //fetch array of blogs in DB
  let hasZeroLikes = newBlogList[newBlogList.length-1]  //get the newest one
  expect(hasZeroLikes.likes).toBe(0)    // it has 0 likes
  expect(newBlogList.length).toBe(initialBlogs.length+1)
})

test('POST blog with undefined URL is not added', async () => {
  const blogToBePosted =  {
    title: '22Test2TAitle',
    author: 'Robert C. Martin'
  }
  await api
    .post('/api/blogs')
    .send(blogToBePosted)
    .expect(400)
  let finalBlogs = await blogsInDb()
  expect(initialBlogs.length).toBe(finalBlogs.length)
})

test('POST blog with undefined TITLE is not added', async () => {
  const blogToBePosted =  {
    url: 'wwww.12345.com',
    author: 'Another C. Martin'
  }
  await api
    .post('/api/blogs')
    .send(blogToBePosted)
    .expect(400)
  let finalBlogs = await blogsInDb()
  expect(initialBlogs.length).toBe(finalBlogs.length)
})


afterAll(() => {
  mongoose.connection.close()
})