// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {  //array of blogs
  return 1
}

const totalLikes = (blogs) => {

  if (blogs.length === 0) {
    return 0
  }
  let likesCount = 0

  blogs.forEach(blog => {
    //console.log('Total sum was', likesCount, 'Adding', blog.likes,)   //just for testing
    likesCount += blog.likes
  })

  return likesCount
}

const favoriteBlog = (blogs) => {
  let result = {
    title: '',
    author: '',
    likes: 0
  }
  blogs.forEach(blog => {
    if (blog.likes > result.likes) {
      result = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })
  return result
}

const mostBlogs = (blogs) => {
  // vytvořit array of objects s autory a počtem blogů
  let authors = []
  let bestAuthor = {}

  blogs.forEach(blog => {    //make array of authors and number of blogs
    if (authors.findIndex(el => el.Author === blog.author) === -1) {  //if author is not found, push it to the array
      authors.push({ Author: blog.author, blogs: 1 })
    } else {
      // increase number of blogs
      let index = authors.findIndex(auth => auth.Author === blog.author)
      authors[index].blogs ++
    }
  })

  let maxBlogs = Math.max(...authors.map(b => b.blogs), 0)  //find max number of blogs

  authors.forEach( () => {
    let i = authors.findIndex(el => el.blogs === maxBlogs)
    if (i > -1) {
      bestAuthor = authors[i]
    }
  })
  //console.log(bestAuthor)
  return bestAuthor
}

const mostLikes = (blogs) => {
  let authorWithMostLikes = {}
  let authorsAndLikes = []
  blogs.forEach(blog => {    //make array of authors and number of blogs
    if (authorsAndLikes.findIndex(el => el.Author === blog.author) === -1) {  //if author is not found, push it to the array
      authorsAndLikes.push({ Author: blog.author, likes: blog.likes })
    } else {
      // increase number of blogs
      let index = authorsAndLikes.findIndex(auth => auth.Author === blog.author)
      authorsAndLikes[index].likes += blog.likes
    }
  })

  let maxLikes = Math.max(...authorsAndLikes.map(b => b.likes), 0)  //find max number of blogs

  authorsAndLikes.forEach( () => {
    let i = authorsAndLikes.findIndex(el => el.likes === maxLikes)
    if (i > -1) {
      authorWithMostLikes = authorsAndLikes[i]
    }
  })
  //console.log('bestOne:', authorWithMostLikes)
  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
