/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')  //import app from app - express app
const helper = require('./test_helper')
const { usersInDB } = require('./test_helper')

const api = supertest(app)

const User = require('../models/user')

const initUsers = helper.listWithTwoUsers

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(initUsers[0])
  await userObject.save()

  userObject = new User(initUsers[1])
  await userObject.save()
})


describe('POST methods for users', () => {
  test('POST is working - saving a user', async () => {

    let initUsers = await usersInDB()

    const newUser =  {
      username: 'RandomUserName',
      name: 'RandomName',
      password: 'SekretPassss'
    }
    await api
      .post('/api/users')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhdWxpQ1o0NCIsImlkIjoiNWY4YWYzYTkyZmNiZjEwYWRjNzBmYzIyIiwiaWF0IjoxNjAzMDA2OTU5fQ.-4etKkWRBf50XKtFhcw5UC4zo3XAJssk-RUQGJlpD5U')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let finalUsers = await usersInDB()
    expect(initUsers.length).toBe(finalUsers.length-1)

    //test that on DB is content of new blog
    let usernames = finalUsers.map(blog => blog.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST user without username or password wont save', async () => {
    let initUsers = await usersInDB()
    const newUser =  {
      name: 'RandomName',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    let finalUsers = await usersInDB()
    expect(initUsers.length).toBe(finalUsers.length)
    expect(result.body.error).toContain('missing')
  })

  test('POST user with username that is not unique wont save him', async () => {
    let initUsers = await usersInDB()
    const newUser =  {
      username: 'TestUserName',
      name: 'RandomName',
      password: 'sekretpass'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    let finalUsers = await usersInDB()
    expect(initUsers.length).toBe(finalUsers.length)
    expect(result.body.error).toContain('`username` to be unique')
  })

})

afterAll(() => {
  mongoose.connection.close()
})