import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SingleBlogView = (props) => {

  const match = useRouteMatch('/blogs/:id')
  console.log('match:', match)
  const blog = match
    ? props.blogs.find((bl) => bl.id === match.params.id)
    : null
  console.log(blog)

  if (!blog) {
    return (<p>Error</p>)
  }

  return(
    <>
      <div className="container">
        <h2 className="text-center">{blog.title}</h2>
        <div className='mt-3'>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <p>Aded by: {blog.user.username}</p>
        </div>
        <Link to = "/blogs">Bo back to page with all blogs</Link>
      </div>
    </>
  )
}

export default SingleBlogView