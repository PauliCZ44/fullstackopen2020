//import React, { useState, useEffect } from 'react'
import React from 'react'

import Togglable from './Togglable'

const AboutUsers = (props) => {


  let usersToRender = props.registeredUsers.map( user =>
    <li key={user.id}> {user.username } ({user.blogs.length} blogs) </li>)

  let filteredUsersToRender = props.registeredUsers.filter( user => user.blogs.length !== 0).map( user =>
    <li key={user.id}> {user.username } ({user.blogs.length} blogs) </li>)
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