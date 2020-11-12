import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { displayMessage, removeMessage } from '../reducers/NotificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = async (e) => {
    e.preventDefault()
    let value = e.target.content.value
    if (value.length < 5) {
      dispatch(displayMessage(`"${value}" is not valid. Too short. Minimum legth is 5 characters` ))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    } else {
      e.target.content.value = ''
      await anecdoteService.createNew(value)
      dispatch(createAnec(value))
      dispatch(displayMessage(`You created "${value}"` ))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }
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