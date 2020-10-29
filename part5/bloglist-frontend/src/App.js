import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   //states for user management
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageIsError, setMessageIsError] = useState(false)
  const [addNewVisible, setAddNewVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  /*let testBlogs = [
    {title: 'Test',
    author: 'AA',
    url: 'XX',
    likes: 1,
    user: {
    username: 'PauliCZ44',
    name: 'Pavel Happy',
    id: '5f8af3a92fcbf10adc70fc22'
    },
    id: '5f91bb74b3a6e83998b9aa59'
    }]
  */


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('Local storage', user.token)
      setUser(user)
      blogService.setToken(user.token)
    }
    else {
      console.log('Local storage empty, you have to login')
    }
  }, [])

  const toggleAddNewBlog = () => {
    setAddNewVisible(!addNewVisible)
    console.log(addNewVisible)
  }

  const hideWhenVisible = { display: addNewVisible ? 'none' : '' }
  const showWhenVisible = { display: addNewVisible ? '' : 'none' }

  const makeMessage = (message, error) => {
    if (error) {
      setMessageIsError(true)
    }
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setMessageIsError(false)
    }, 2300)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password, })
      blogService.setToken(loggedUser.token)  //setting token for user
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      makeMessage('You were logged in')
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
    } catch (exception) {
      console.log(exception)
      makeMessage('Wrong credentials', true)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    makeMessage('You were logged out', true)
  }

  const blogServiceUpdate = (blog) => {
    blogService.put(blog)
      .then(() => {
        makeMessage(`you liked "${blog.title}" by ${blog.author}`)
      })
      .catch(err => {
        setMessage('error updating likes', true)
        console.error(err)
      })
  }

  if (user === null) {
    return (
      <>
        <div className='container'>
          <h1 className='text-center my-5'>BLOGS APP</h1>
          <h5 className='text-center m-4'>Log in to application please</h5>
          <div className='wrapNotif'>
            <Notification message={message} error={messageIsError} screen={'login'} />
          </div>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </>
    )
  }
  return (
    <>
      <div className='bg-black pt-5 pb-2 mb-5'>
        <h1 className='text-center text-light'>BLOGS APP</h1>
        <div className='container'>
          <p className='text-right text-white-50'>Logged as {user.username}. Welcome back!
            <button
              onClick={handleLogout}
              className='btn btn-dark btn-sm px-4 ml-4 logout-btn'>
              Log Out
            </button>
          </p>
        </div>
      </div>
      <div className='container'>
        <div className='wrapNotif'>
          <Notification message={message} error={messageIsError} screen={'blogList'} />
        </div>
        <button
          onClick={toggleAddNewBlog}
          className='btn btn-block btn-dark addBlog-card p-3 my-3 mb-5 addBlog-Btn'

         >
          CREATE A NEW BLOG
        </button>
        <div style={showWhenVisible}>
          <BlogForm setBlogs={setBlogs} blogs={blogs} makeMessage={makeMessage} toggleAddNewBlog={toggleAddNewBlog} showWhenVisible={showWhenVisible} user={user} />
        </div>
        <div className='blogSection'>
          <h3>Current saved blogs:</h3>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                setBlogs={setBlogs}
                blogs={blogs}
                makeMessage={makeMessage}
                blogServiceUpdate = {blogServiceUpdate}
              />
            )}
        </div>
      </div>
      <footer className='text-center bg-black text-white-50 mt-5 pt-3 pb-2'>Made by Pavel Stastny @2020</footer>
    </>
  )
}

export default App