/*============= STATISTICS FUNCTIONS =============*/

export const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return { Author: 'none', numberOfBlogs: 0, likes: 0 }
  } else {
    let authorWithMostLikes = {}
    let authorsAndLikes = []
    blogs.forEach((blog) => {
      //make array of authors and number of blogs
      if (authorsAndLikes.findIndex((el) => el.Author === blog.author) === -1) {
        //if author is not found, push it to the array
        authorsAndLikes.push({
          Author: blog.author,
          likes: blog.likes,
          numberOfBlogs: 1,
        })
      } else {
        // increase number of blogs
        let index = authorsAndLikes.findIndex(
          (auth) => auth.Author === blog.author
        )
        authorsAndLikes[index].likes += blog.likes
        authorsAndLikes[index].numberOfBlogs++
      }
    })
    let maxLikes = Math.max(...authorsAndLikes.map((b) => b.likes), 0) //find max number of blogs
    authorsAndLikes.forEach(() => {
      let i = authorsAndLikes.findIndex((el) => el.likes === maxLikes)
      if (i > -1) {
        authorWithMostLikes = authorsAndLikes[i]
      }
    })
    //console.log('bestOne:', authorWithMostLikes)
    return authorWithMostLikes
  }
}

export const favoriteBlog = (blogs) => {
  let result = {
    title: '',
    author: '',
    likes: 0,
  }
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return result
  } else {
    blogs.forEach((blog) => {
      if (blog.likes > result.likes) {
        result = {
          title: blog.title,
          author: blog.author,
          likes: blog.likes,
        }
      }
    })
    return result
  }
}

export const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return { Author: 'none', blogs: 0, likes: 0 }
  } else {
    // vytvořit array of objects s autory a počtem blogů
    let authors = []
    let bestAuthor = {}

    blogs.forEach((blog) => {
      //make array of authors and number of blogs
      if (authors.findIndex((el) => el.Author === blog.author) === -1) {
        //if author is not found, push it to the array
        authors.push({ Author: blog.author, blogs: 1, likes: blog.likes })
      } else {
        // increase number of blogs
        let index = authors.findIndex((auth) => auth.Author === blog.author)
        authors[index].blogs++
        authors[index].likes += blog.likes
      }
    })
    let maxBlogs = Math.max(...authors.map((b) => b.blogs), 0) //find max number of blogs
    authors.forEach(() => {
      let i = authors.findIndex((el) => el.blogs === maxBlogs)
      if (i > -1) {
        bestAuthor = authors[i]
      }
    })
    //console.log('BestAUth', bestAuthor)
    return bestAuthor
  }
}
