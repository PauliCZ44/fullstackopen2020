import React, { useState, useEffect } from 'react'
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
//import userService from '../services/users'

import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   //states for user management
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messageIsError, setMessageIsError] = useState(false)
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
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    userService.getAllUsers().then( users =>
      setRegisteredUsers(users))
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('Local storage', user.token)
      setUser(user)
      blogService.setToken(user.token)
    }
    else {
      console.log('Local storage empty, you have to login to app')
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
      }, 3300)
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

  /*============= STATISTICS FUNCTIONS =============*/

  const mostLikes = (blogs) => {
    if (!Array.isArray(blogs) || blogs.length === 0 ) {
      return { Author:'none', numberOfBlogs: 0, likes: 0 }
    } else {
      let authorWithMostLikes = {}
      let authorsAndLikes = []
      blogs.forEach(blog => {    //make array of authors and number of blogs
        if (authorsAndLikes.findIndex(el => el.Author === blog.author) === -1) {  //if author is not found, push it to the array
          authorsAndLikes.push({ Author: blog.author, likes: blog.likes, numberOfBlogs: 1 })
        } else {
          // increase number of blogs
          let index = authorsAndLikes.findIndex(auth => auth.Author === blog.author)
          authorsAndLikes[index].likes += blog.likes
          authorsAndLikes[index].numberOfBlogs ++
        }
      })
      let maxLikes = Math.max(...authorsAndLikes.map(b => b.likes), 0)  //find max number of blogs
      authorsAndLikes.forEach( () => {
        let i = authorsAndLikes.findIndex(el => el.likes === maxLikes)
        if (i > -1) {
          authorWithMostLikes = authorsAndLikes[i]
        }
      })
      //console.log('bestOne:', authorWithMostLikes)
      return authorWithMostLikes
    }
  }

  const favoriteBlog = (blogs) => {
    let result = {
      title: '',
      author: '',
      likes: 0
    }
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return result
    } else {
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
  }

  const mostBlogs = (blogs) => {
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return { Author:'none', blogs: 0, likes: 0 }
    } else {
    // vytvořit array of objects s autory a počtem blogů
      let authors = []
      let bestAuthor = {}

      blogs.forEach(blog => {    //make array of authors and number of blogs
        if (authors.findIndex(el => el.Author === blog.author) === -1) {  //if author is not found, push it to the array
          authors.push({ Author: blog.author, blogs: 1, likes: blog.likes })
        } else {
          // increase number of blogs
          let index = authors.findIndex(auth => auth.Author === blog.author)
          authors[index].blogs ++
          authors[index].likes += blog.likes
        }
      })
      let maxBlogs = Math.max(...authors.map(b => b.blogs), 0)  //find max number of blogs
      authors.forEach( () => {
        let i = authors.findIndex(el => el.blogs === maxBlogs)
        if (i > -1) {
          bestAuthor = authors[i]
        }
      })
      //console.log('BestAUth', bestAuthor)
      return bestAuthor
    }
  }

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
      mostBlogs: mostBlogsRes
    })
  }, [blogs])


  /*let testVar = mostLikes([])
  console.log('test var',testVar)
  let testVar2 = mostLikes({})
  console.log('test var2',testVar2)*/

  /*============ STATISTICS FUNCTIONS END =============*/

  // LOGIN CASE //
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

  // REGISTRTION CASE //
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
            username={user.username}
          />
        </div>
        <section className='blogSection'>
          <h3 className="font-weight-bolder">Saved blogs:</h3>
          <div className="line"></div>
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
      <AboutUsers stats = { stats } blogs = {blogs}  registeredUsers = { registeredUsers } />
      <Footer/>

    </main>
  )
}

export default App