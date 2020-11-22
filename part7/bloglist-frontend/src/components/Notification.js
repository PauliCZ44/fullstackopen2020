import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ screen }) => {
  const rMessage = useSelector(state => state.notif.message)
  const rError = useSelector(state => state.notif.error)
  const succesStyle = {
    color: 'green',
    borderLeft: 'solid 3px #008000bb',
  }
  const errorStyle = {
    color: 'red',
    borderLeft: 'solid 3px rgb(255, 0, 0)',
  }


  let classStyle
  if (screen === 'login') {
    classStyle = 'login-notif'
  } else {
    classStyle = 'add-blog-notif'
  }


  if (rMessage === null) {
    return null
  } else  {
    return (
      <div className= {classStyle} style={rError ? errorStyle : succesStyle } id = 'messageComp'>
        {rMessage}
      </div>
    )
  }
}

export default Notification