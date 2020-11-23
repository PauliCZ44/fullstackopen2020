import React from 'react'
import { Link } from 'react-router-dom'

let AllUsersDetails = (props) => {
  return(
    <>
      <section className='container'>
        <h2 className = 'text-center'>HERE ARE ALL USERS RENDERED</h2>
        <ul className = 'mt-5'>
          {props.registeredUsers.map(u => {
            let url =`/users/${u.id}`
            return (
              <li key={u.id}> <Link  to={url}> {u.username} </Link> with {u.blogs.length} blogs </li>
            )
          })}
        </ul>
        <h5 className = 'mt-5'>Author with most likes is:</h5>
        <ul className = 'mt-3'>
          <li><strong>{props.stats.mostLikesUser}</strong> with {props.stats.mostLikes} likes total, on his/her <em>{props.stats.mostLikesNumberOfBlogs}</em> blogs.
           That is, on average { (Math.round(props.stats.mostLikedBlogLikes / props.stats.mostLikesNumberOfBlogs * 1000))/1000} likes per blog.</li>
        </ul>
        <h5 className = 'mt-5'>The most liked blog is:</h5>
        <ul className = 'mt-3'>
          <li><strong>&quot;{props.stats.mostLikedBlogTitle}&quot;</strong> <em>by {props.stats.mostlikedBlogUser}</em> with {props.stats.mostLikedBlogLikes} likes.</li>
        </ul>
        <h5 className = 'mt-5'>Author with most blogs is:</h5>
        <ul className = 'mt-3'>
          <li><strong>&quot;{props.stats.mostBlogs.Author}&quot;</strong> with totaly <em>{props.stats.mostBlogs.blogs}</em> blogs.
           On all of his blogs he has <em>{props.stats.mostBlogs.likes}</em> likes.
           That is, on average { (Math.round(props.stats.mostBlogs.likes / props.stats.mostBlogs.blogs * 1000))/1000} likes per blog.</li>
        </ul>
      </section>
    </>
  )
}

export default AllUsersDetails