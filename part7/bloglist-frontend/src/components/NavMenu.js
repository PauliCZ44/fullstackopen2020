import React from 'react'
import { Link } from 'react-router-dom'

const NavMenu = (props) => {
  const padding = {
    paddingRight: 30,
    color: 'deepskyblue'
  }

  return (
    <>
      <div>
        <Link to="/blogs" style={padding}>
        BLOGS
        </Link>
        <Link to="/users" style={padding}>
        USERS
        </Link>
      </div>
    </>
  )
}

export default NavMenu