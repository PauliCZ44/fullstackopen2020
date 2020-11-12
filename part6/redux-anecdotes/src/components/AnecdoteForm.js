import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { displayMessage, removeMessage } from '../reducers/NotificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = (e) => {
    e.preventDefault()
    dispatch(createAnec(e.target.content.value))
    dispatch(displayMessage(`You created "${e.target.content.value}"` ))
    e.target.content.value = ''
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  return (
    <>
     <h2>Create new:</h2>
      <form onSubmit={(e) => createNew(e)} >
        <div><input name = 'content'/></div>
        <button>Create</button>
      </form>
    </>
  )
}

export default AnecdoteForm