import React from 'react'
const Blog = ({ blog }) => (
  <div className="border-left border-top  bg-white rounded my-4 blogHeader">
  <div className="bigLeftBorder border-dark ml-0 pl-2 py-2">
    <h5>{blog.title} </h5>
      <p className="text-muted m-2" ><em>by: </em> {blog.author} </p>
  </div>
  </div>
)

export default Blog
