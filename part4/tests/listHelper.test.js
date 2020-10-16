/* eslint-disable no-undef */
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('dummy test', () => {
  test('dummy test returns always 1', () => {
    const blogs = []
    expect(listHelper.dummy(blogs)).toBe(1)
  })

})

describe('total likes test', () => {

  test('when list is empty - zero', () => {
    const result = listHelper.totalLikes(helper.listWithoutBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs', () => {
    expect(listHelper.totalLikes(helper.listWithManyBlogs)).toBe(36)
  })

})

describe('favorite blog test', () => {

  test('when list is empty - zero', () => {
    const result = listHelper.favoriteBlog(helper.listWithoutBlogs)
    expect(result.likes).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    let result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result.likes).toBe(5)
  })

  test('when list has many blogs', () => {
    mostLikes = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    let result = listHelper.favoriteBlog(helper.listWithManyBlogs)
    expect(result.likes).toBe(12)
    expect(result).toEqual(mostLikes)
  })

})

describe('Author with MOST BLOGS test', () => {

  test('when list is empty - empty object', () => {
    let result = listHelper.mostBlogs(helper.listWithoutBlogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog - 1 blog', () => {
    let result = listHelper.mostBlogs(helper.listWithOneBlog)
    let bestAuthor = {
      Author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(result.blogs).toBe(1)
    expect(result).toEqual(bestAuthor)
  })

  test('when list has many blogs', () => {
    let bestAuthor = {
      Author: 'Robert C. Martin',
      blogs: 3
    }
    let result = listHelper.mostBlogs(helper.listWithManyBlogs)
    expect(result.blogs).toBe(3)
    expect(result).toEqual(bestAuthor)
  })

})



describe('Author with most likes', () => {

  test('when list is empty - empty object', () => {
    let result = listHelper.mostLikes(helper.listWithoutBlogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog - 1 blog', () => {
    let result = listHelper.mostLikes(helper.listWithOneBlog)
    let bestAuthor = {
      Author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result.likes).toBe(5)
    expect(result).toEqual(bestAuthor)
  })

  test('when list has many blogs', () => {
    let bestAuthor = {
      Author: 'Edsger W. Dijkstra',
      likes: 17
    }
    let result = listHelper.mostLikes(helper.listWithManyBlogs)
    expect(result.likes).toBe(17)
    expect(result).toEqual(bestAuthor)
  })

})