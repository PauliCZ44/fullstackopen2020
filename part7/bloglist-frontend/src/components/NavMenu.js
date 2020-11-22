import React from 'react'
import { Link } from 'react-router-dom'

const NavMenu = (props) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <>
      <Link to="/blogs" style={padding}>
        BLOGS
      </Link>
      <Link to="/users" style={padding}>
        USERS
      </Link>
    </>
  )
}

export default NavMenu