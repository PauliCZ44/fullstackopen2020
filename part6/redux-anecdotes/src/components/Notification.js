import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.messages)
  //const expire = useSelector(state => state.messages)//  https://stackoverflow.com/a/47503479  not implemented. I decided to use clearTimeout
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification