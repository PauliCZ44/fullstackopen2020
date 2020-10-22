import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   //states for user management
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON){
    const user = JSON.parse(loggedUserJSON)
    console.log("Local storage",user.token)
    setUser(user)
    blogService.setToken(user.token)
    }
    else {
      console.log("Local storage empty, you have to login")
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
    console.log("try blovk´´ck start")
    const loggedUser = await loginService.login({ username, password, })
    console.log("try block 2nd")
    blogService.setToken(loggedUser.token)  //setting token for user
      setUser(loggedUser)
      console.log("Logged user:", loggedUser)
      setUsername('')
      setPassword('')
      //setErrorMessage('Logged in')
      console.log("logged in")

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
    } catch (exception) {
     console.log('Wrong credentials')
     console.log(exception)
    }
  }

  const handleLogout = () => {
    console.log("logging out")
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }



  if ( user === null) {
    return (
      <>
       <div className="container">
         <h1 className="text-center my-5">BLOGS APP</h1>
        <h5  className="text-center m-4">Log in to application please</h5>
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          setUsername = {setUsername} 
          password = {password} 
          setPassword = {setPassword}
        />
      </div>
      </>
    )
  }
    return (
      <>
      <div className="bg-black pt-5 pb-2 mb-5">
        <h1 className="text-center text-light">BLOGS APP</h1>
      <div className="container">
        <p className="text-right text-white-50">Logged as {user.username}. Welcome back!
           <button 
           onClick = {handleLogout}
           className="btn btn-dark btn-sm px-4 ml-4 logout-btn">
             Log Out
            </button>
        </p>
      </div>
      </div>
        <div className="container">
        <BlogForm setBlogs = {setBlogs} blogs={blogs}/>
        <h3>Current saved blogs:</h3>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <p>{user.name}</p>
        <p>{user.token}</p>
      </div>
      </>
    )
  }

export default App