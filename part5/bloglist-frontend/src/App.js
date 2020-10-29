import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import registerService from './services/register'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   //states for user management
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [name, setName] = useState('Pavel S2')
  const [message, setMessage] = useState('')
  const [messageIsError, setMessageIsError] = useState(false)
  const [addNewVisible, setAddNewVisible] = useState(false)
  const [registration, setRegistration] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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

  // eslint-disable-next-line no-unused-vars
  const hideWhenVisible = { display: addNewVisible ? 'none' : '' }
  const showWhenVisible = { display: addNewVisible ? '' : 'none' }

  const makeMessage = (messageRec, error) => {
    let msgExisted

    if (message) {
      msgExisted = true
    } else {
      msgExisted = false
    }

    if (error) { setMessageIsError(true) }
    setMessage(messageRec)
    if(msgExisted){
      setTimeout(() => {

        if (error) { setMessageIsError(true) }

        setMessage(messageRec)
        setTimeout(() => {
          setMessage(null)
          setMessageIsError(false)
        }, 3000)
      }, 2300)
    }
    setTimeout(() => {
      if (!msgExisted) {
        setMessage(null)
        setMessageIsError(false)
      }
    }, 3000)
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

  const switchToRegister = (event) => {
    event.preventDefault()
    setPassword('')
    setRegistration(!registration)
  }

  const handleCreateAccount = (event) => {
    event.preventDefault()
    console.log('Try to create an account')
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

  if (user === null && registration === false) {
    return (
      <>
        <div className='container'>
          <h1 className='text-center my-5'>BLOGS APP</h1>
          <h5 className='text-center m-4'>Log in to application please</h5>
          <div className='wrapNotif'>
            <Notification message= { message } error = { messageIsError } screen = { 'login' } />
          </div>
          <LoginForm
            handleLogin = { handleLogin }
            username = { username }
            setUsername = { setUsername }
            password = { password }
            setPassword = { setPassword }
            switchToRegister = {switchToRegister}
          />
        </div>
      </>
    )
  }

  if (user === null && registration === true ) {
    return (
      <>
        <div className='container'>
          <h1 className='text-center my-5'>BLOGS APP</h1>
          <h5 className='text-center m-4'>Register to application</h5>
          <div className='wrapNotif'>
            <Notification message={message} error={messageIsError} screen={'login'} />
          </div>
          <RegistrationForm
            username = { username }
            setUsername = { setUsername }
            password = { password }
            setPassword = { setPassword }
            passwordConfirm = { passwordConfirm }
            setName = { setName }
            name = { name }
            setPasswordConfirm = { setPasswordConfirm }
            handleCreateAccount = { handleCreateAccount }
            switchToRegister = { switchToRegister }
            makeMessage = { makeMessage }
            registerService = { registerService.register }
          />
        </div>
      </>
    )
  }

  return (
    <main>
      <header className='bg-black pt-5 pb-2 mb-5'>
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
      </header>
      <section className='container appWrapper'>
        <div className='wrapNotif'>
          <Notification message={message} error={messageIsError} screen={'blogList'} />
        </div>
        <button
          onClick={toggleAddNewBlog}
          className='btn btn-block btn-dark addBlog-card p-3 my-3 mb-5 addBlog-Btn'
          /*</div>{/* style={hideWhenVisible}}*/
        >
          CREATE A NEW BLOG
        </button>
        <div style={showWhenVisible}>
          <BlogForm
            setBlogs={setBlogs}
            blogs={blogs}
            makeMessage={makeMessage}
            toggleAddNewBlog={toggleAddNewBlog}
            user={user}
            blogServiceCreate={blogService.create}
            blogServiceGetOne = {blogService.getOne}
          />
        </div>
        <section className='blogSection'>
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
        </section>
      </section>
      <footer className='text-center text-white-50 mt-5 footer'>Made by Pavel Stastny @2020</footer>
    </main>
  )
}

export default App