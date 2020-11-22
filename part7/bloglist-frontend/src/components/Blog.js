import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeAndRemoveMessage } from '../reducers/NotificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
//import blogService from '../services/blogs'
import PropTypes from 'prop-types'
//icons
import { HandThumbsUp } from 'react-bootstrap-icons'

const Blog = ({ blog, user, likes }) => {
  const dispatch = useDispatch()
  const [showDetails, setShowDetails] = useState(false)
  //const [likes, setLikes] = useState(likes)
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
      //await blogService.deleteBlog(blogToDelete)
      //setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id)) //filter blogs
      dispatch(deleteBlog(blogToDelete))
      dispatch(makeAndRemoveMessage('Blog was deleted!', 5, false))
    } else {
      dispatch(makeAndRemoveMessage('Blog was NOT deleted!', 5, true))
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
    // await blogServiceUpdate(blogToPut)

    dispatch(likeBlog(blogToPut))
    dispatch(makeAndRemoveMessage(`You liked blog ${blog.title} by ${blog.author}`, 5, false))
    console.log('like given')

    setLikeIsDiabled(true)

    setTimeout(() => {
      setLikeIsDiabled(false)
    }, 30)                           // =========  LIKE SPAM PROTECTION  ==============
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
          className='btn btn-sm btn-danger px-2 px-sm-4 py-1 t_DelBtn'
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
  user: PropTypes.object,
}

/* TEST BUTTONS
      <p>User</p>
      <button onClick = {()=> console.log(user)}>User: </button>
      <p>Blog:</p>
      <button onClick = {()=> console.log(blog)}>BLOG</button>
*/

export default Blog
