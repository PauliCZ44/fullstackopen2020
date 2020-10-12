// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {  //array of blogs
  return 1
}

const totalLikes = (blogs) => {

  let likesCount = 0

  blogs.forEach(blog => {
    //console.log('Total sum was', likesCount, 'Adding', blog.likes,)   //just for testing
    likesCount += blog.likes
  })

  return likesCount
}

const favoriteBlog = (blogs) => {
  let result = {
    title: "",
    author: "",
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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
