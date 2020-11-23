import React from 'react'
import {
  Link,
  useRouteMatch
} from 'react-router-dom'

const SingleUserView = (props) => {
  const match = useRouteMatch('/users/:id')
  console.log('match:', match)
  const user = match
    ? props.registeredUsers.find((ur) => ur.id === match.params.id)
    : null
  console.log(user)

  if (!user) {
    return (<div><Link to = "/">Bo back to main page</Link></div>)
  }

  let usersToRender = props.registeredUsers
    .filter(u => u.id === user.id)
    .map( user => {
      let likeOfUser = user.blogs.reduce((accum, blog) => accum + blog.likes, 0)
      let url = `/users/${user.id}`
      return (
        <p key={user.id}> (<em>{user.blogs.length}</em> blogs; <em>{likeOfUser}</em> total likes) </p>
      )
    })

  let blogsToRender = user.blogs.map(bl => {
    return (
      <li key = {bl.id }> <strong> {bl.title}</strong> by {bl.author} with {bl.likes} likes.</li>
    )
  })


  return(
    <>
      <div className="container">
        <h3 className = "text-center">{user.username}</h3>
        <div className='mt-3'>
          <ul className = 'mt-2 text-center'>
            {usersToRender}
          </ul>
          <h5>List of blogs of this user</h5>
          <ul>
            {blogsToRender}
          </ul>
          <Link to = "/users">Bo back to page with all users</Link>
        </div>
      </div>
    </>
  )
}

export default SingleUserView