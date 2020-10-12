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


module.exports = {
  dummy,
  totalLikes
}
