import React, { useState, useEffect } from 'react'
import { mostLikes, favoriteBlog, mostBlogs } from './helper/statistics'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AboutUsers from './components/AboutUsers'
import blogService from './services/blogs'
import loginService from './services/login'
import registerService from './services/register'
import Footer from './components/Footer'
import userService from './services/users'

import { useSelector, useDispatch } from 'react-redux'
import { makeAndRemoveMessage } from './reducers/NotificationReducer'
import { initBlogs } from './reducers/blogReducer'

//import userService from '../services/users'

import './App.css'

const App = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('') //states for user management
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [name, setName] = useState('')
  const [addNewVisible, setAddNewVisible] = useState(false)
  const [registration, setRegistration] = useState(false)
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [stats, setStats] = useState({
    mostLikes: 0,
    mostLikesUser: '',
    mostLikedBlogTitle: '',
    mostlikedBlogUser: '',
    mostLikedBlogLikes: 0,
    mostBlogs: '',
    mostLikesNumberOfBlogs: 0,
  })

  useEffect(() => {
    dispatch(initBlogs())
    console.log('blog should init')
  }, [dispatch])

  let blogs = useSelector(state => {
    return state.blogs.blogs
  })

  console.log('rBlogs', blogs)

  useEffect(() => {
    //blogService.getAll().then((blogs) => setBlogs(blogs))
    userService.getAllUsers().then((users) => setRegisteredUsers(users))
  }, [])
  /*
  useEffect(() => {
    userService.getAllUsers().then((users) => setRegisteredUsers(users))
  }, [blogs])  //why is there blogs ?*/

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log('Local storage', user.token)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      console.log('Local storage empty, you have to login to app')
    }
  }, [])

  const toggleAddNewBlog = () => {
    setAddNewVisible(!addNewVisible)
    //console.log(addNewVisible)
  }

  // eslint-disable-next-line no-unused-vars
  const hideWhenVisible = { display: addNewVisible ? 'none' : '' }
  const showWhenVisible = { display: addNewVisible ? '' : 'none' }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      blogService.setToken(loggedUser.token) //setting token for user
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      dispatch(makeAndRemoveMessage('You were logged in', 5))
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(loggedUser)
      )
    } catch (exception) {
      console.log(exception)
      dispatch(makeAndRemoveMessage('Wrong credentials', 5, true))
    }
  }

  const switchToRegister = (event) => {
    event.preventDefault()
    setPassword('')
    setRegistration(!registration)
  }

  const handleLogout = () => {
    console.log('logging out')
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(makeAndRemoveMessage('You were logged out', 5, true))

  }

  /*
  const blogServiceUpdate = (blog) => {
    blogService
      .put(blog)
      .then(() => {
        console.log('blog liked')
        //makeMessage(`you liked "${blog.title}" by ${blog.author}`) -- moved to blog.js
      })
      .catch((err) => {
        dispatch(makeAndRemoveMessage('error updating likes', 5, true))
        console.error(err)
      })
  }*/

  /*============= STATISTICS  =============*/

  useEffect(() => {
    let mostLikesRes = mostLikes(blogs)
    let favoriteBlogRes = favoriteBlog(blogs)
    let mostBlogsRes = mostBlogs(blogs)
    setStats({
      mostLikes: mostLikesRes.likes,
      mostLikesUser: mostLikesRes.Author,
      mostLikesNumberOfBlogs: mostLikesRes.numberOfBlogs,
      mostLikedBlogTitle: favoriteBlogRes.title,
      mostlikedBlogUser: favoriteBlogRes.author,
      mostLikedBlogLikes: favoriteBlogRes.likes,
      mostBlogs: mostBlogsRes,
    })
  }, [blogs])

  /*let testVar = mostLikes([])
  console.log('test var',testVar)
  let testVar2 = mostLikes({})
  console.log('test var2',testVar2)*/

  /*============ STATISTICS END =============*/

  // LOGIN CASE //
  if (user === null && registration === false) {
    return (
      <>
        <div className='container'>
          <h1 className='text-center my-5'>BLOGS APP</h1>
          <h5 className='text-center m-4'>Log in to application please</h5>
          <div className='wrapNotif'>
            <Notification

              screen={'login'}
            />
          </div>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            switchToRegister={switchToRegister}
          />
        </div>
      </>
    )
  }

  // REGISTRTION CASE //
  if (user === null && registration === true) {
    return (
      <>
        <div className='container'>
          <h1 className='text-center my-5'>BLOGS APP</h1>
          <h5 className='text-center m-4'>Register to application</h5>
          <div className='wrapNotif'>
            <Notification

              screen={'login'}
            />
          </div>
          <RegistrationForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            passwordConfirm={passwordConfirm}
            setName={setName}
            name={name}
            setPasswordConfirm={setPasswordConfirm}
            switchToRegister={switchToRegister}
            registerService={registerService.register}
          />
        </div>
      </>
    )
  }

  // MAIN APP SCREEN
  return (
    <main>
      <header className='bg-black pt-5 pb-2 mb-5'>
        <h1 className='text-center text-light'>BLOGS APP</h1>
        <div className='container'>
          <p className='text-right text-white-50'>
            Logged as {user.username}. Welcome back!
            <button
              onClick={handleLogout}
              className='btn btn-dark btn-sm px-4 ml-4 logout-btn'
            >
              Log Out
            </button>
          </p>
        </div>
      </header>
      <section className='container appWrapper'>
        <div className='wrapNotif'>
          <Notification

            screen={'blogList'}
          />
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
            //setBlogs={setBlogs}
            blogs={blogs}
            toggleAddNewBlog={toggleAddNewBlog}
            user={user}
            blogServiceCreate={blogService.create}
            blogServiceGetOne={blogService.getOne}
            username={user.username}
          />
        </div>
        <section className='blogSection'>
          <h3 className='font-weight-bolder'>Saved blogs:</h3>
          <div className='line'></div>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                likes={blog.likes}
              />
            ))}
        </section>
      </section>
      <AboutUsers
        stats={stats}
        blogs={blogs}
        registeredUsers={registeredUsers}
      />
      <Footer />
    </main>
  )
}

export default App