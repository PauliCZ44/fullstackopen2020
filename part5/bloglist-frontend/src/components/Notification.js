import React from 'react'

const Notification = ({ message, error, screen }) => {
  const succesStyle = {
    color: 'green',
    borderLeft: 'solid 3px #008000bb',
  }
  const errorStyle = {
    color: 'red',
    borderLeft: 'solid 3px #FF0000bb',
  }


  let classStyle
  if (screen === 'login') {
    classStyle = 'login-notif'
  } else {
    classStyle = 'add-blog-notif'
  }


  if (message === null) {
    return null
  } else  {
    return (
      <div className= {classStyle} style={error ? errorStyle : succesStyle }>
        {message}
      </div>
    )
  }
}

export default Notification