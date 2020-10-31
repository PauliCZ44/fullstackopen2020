import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className='btn btn-md btn-light btn-block py-2 px-3 border border-dark logout-btn'>Show {props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility} className='btn btn-light py-2 px-3 btn-block logout-btn'>Hide {props.buttonLabel}</button>
        {props.children}
      </div>
    </div>
  )
}

export default Togglable
