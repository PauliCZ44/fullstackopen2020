import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
//icons
import { HandThumbsUp } from 'react-bootstrap-icons'

const Blog = ({ blog, blogs, setBlogs, makeMessage, user, blogServiceUpdate }) => {

  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [likeIsDisabled, setLikeIsDiabled] = useState(false)
  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
    console.log('toggle details')
  }

  const handleDeleteBlog = async (e) => {
    console.log('deleting blog')
    e.preventDefault()
    let blogToDelete = blog
    if (window.confirm(`Do you really want to delete "${blogToDelete.title}" from your phonebook?`)) {
      await blogService.deleteBlog(blogToDelete)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id)) //filter blogs
      makeMessage('Blog was deleted!')
    } else {
      makeMessage('Blog was not deleted', true)
    }
  }

  const sendPut = async (e) => {
    e.preventDefault()
    //setLikeIsDiabled(true)  //this will break the test for likes
    let blogToPut = {
      id: blog.id,
      user: blog.user,
      author: blog.author,
      likes: likes + 1,
      title: blog.title,
      url: blog.url
    }
    await blogServiceUpdate(blogToPut)
    console.log('like given')
    setLikes(likes + 1)
    setLikeIsDiabled(true)

    let allBlogs = await blogService.getAll()
    setBlogs(allBlogs)

    setTimeout(() => {
      setLikeIsDiabled(false)
    }, 3000)                           // =========  LIKE SPAM PROTECTION  ==============
    //let res = await blogService.put(blogToPut)   // ->> moved to app.js
  }

  const details = () => (
    <div className = 't_detailsDiv'>
      <p className='mb-1'>URL: <a href={blog.url}>{blog.url}</a></p>
      <p className='mb-1 t_likesCount'>Likes: {likes}
        <button
          onClick={sendPut}
          className="btn btn-sm btn-secondary py-0 px-3 ml-4 font-weight-bold t_LikeBtn"
          disabled={likeIsDisabled}>
          Like
          < HandThumbsUp size={18} className='ml-1  font-weight-bold'/>
        </button>
      </p>
      <p className='mb-1'>User: {blog.user.username}</p>
      { blog.user.username === user.username || typeof blog.user  === 'string'  //pokud je přihlášený uživatel stejný jako uživatel co vytvořil blog
        ? <button
          className='btn btn-sm btn-danger px-2 px-sm-4 py-1'
          onClick={handleDeleteBlog}>
          DELETE
        </button>
        : <p>You can not delete this blog. This was created by {blog.user.username}</p>
      }
    </div>
  )


  return (
    <div className="border-left border-top  bg-white rounded my-4 blogHeader">
      <div className="bigLeftBorder border-dark ml-0 pl-2 py-2">
        <div className='d-flex'>
          <h5 className='py-1 mb-2'>{blog.title} <span className='text-muted'> by {blog.author} </span></h5>
          <button
            className='btn btn-sm btn-info px-2 px-sm-4 py-1 ml-auto mr-1 mr-sm-3 align-self-center t_DetailsBtn'
            onClick={toggleShowDetails}>
            {showDetails ? 'Hide details' :  'Show details'}
          </button>
        </div>

        {showDetails ? details() : null}


      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array,
  setBlogs:PropTypes.func,
  makeMessage: PropTypes.func,
  user: PropTypes.object,
}

/* TEST BUTTONS
      <p>User</p>
      <button onClick = {()=> console.log(user)}>User: </button>
      <p>Blog:</p>
      <button onClick = {()=> console.log(blog)}>BLOG</button>
*/

export default Blog
