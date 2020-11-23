//import React, { useState, useEffect } from 'react'
import React from 'react'
//import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'

const AboutUsers = (props) => {


  let usersToRender = props.registeredUsers
    .sort((a, b) => b.blogs.length - a.blogs.length)
    .map( user => {
      let likeOfUser = user.blogs.reduce((accum, blog) => accum + blog.likes, 0)
      let url = `/users/${user.id}`
      return (
        <p key={user.id}> <Link to={url}>{user.username }</Link> (<em>{user.blogs.length}</em> blogs; <em>{likeOfUser}</em> total likes) </p>
      )
    })

  let filteredUsersToRender = props.registeredUsers
    .filter( user => user.blogs.length !== 0)
    .sort((a, b) => b.blogs.length - a.blogs.length)
    .map( user => {
      let likeOfUser = user.blogs.reduce((accum, blog) => accum + blog.likes, 0)
      return (
        <li key={user.id}> <strong>{user.username }</strong> (<em>{user.blogs.length}</em> blogs; <em>{likeOfUser}</em> total likes) </li>
      )
    })
  //console.log('Author com, stats::', props.stats)
  return (
    <div className='container grid-stats-area mt-3'>
      <div className=  'grid-stats-a'>
        <Togglable buttonLabel="Info about registered users and blogs:">
          <ul className = 'mt-2'>
            {usersToRender}
          </ul>
        </Togglable>
      </div>
      <div className=  'grid-stats-b'>
        <Togglable buttonLabel="Users with at least one blog:">
          <ul className = 'mt-2'>
            {filteredUsersToRender}
          </ul>
        </Togglable>
      </div>
      <div className=  'grid-stats-c'>
        <Togglable buttonLabel="additional info:">
          <h5 className = 'mt-2'>Author with most likes is:</h5>
          <ul>
            <li><strong>{props.stats.mostLikesUser}</strong> with {props.stats.mostLikes} likes total, on his/her <em>{props.stats.mostLikesNumberOfBlogs}</em> blogs.
           That is, on average { (Math.round(props.stats.mostLikedBlogLikes / props.stats.mostLikesNumberOfBlogs * 1000))/1000} likes per blog.</li>
          </ul>
          <h5>The most liked blog is:</h5>
          <ul>
            <li><strong>&quot;{props.stats.mostLikedBlogTitle}&quot;</strong> <em>by {props.stats.mostlikedBlogUser}</em> with {props.stats.mostLikedBlogLikes} likes.</li>
          </ul>
          <h5>Author with most blogs is:</h5>
          <ul>
            <li><strong>&quot;{props.stats.mostBlogs.Author}&quot;</strong> with totaly <em>{props.stats.mostBlogs.blogs}</em> blogs.
           On all of his blogs he has <em>{props.stats.mostBlogs.likes}</em> likes.
           That is, on average { (Math.round(props.stats.mostBlogs.likes / props.stats.mostBlogs.blogs * 1000))/1000} likes per blog.</li>
          </ul>
        </Togglable>
      </div>
    </div>
  )
}

export default AboutUsers