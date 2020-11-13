import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { makeAndRemoveMessage } from '../reducers/NotificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = async (e) => {
    e.preventDefault()
    let valueFromInput = e.target.content.value
    if (valueFromInput.length < 5) {
      dispatch(makeAndRemoveMessage(`"${valueFromInput}" is not valid. Too short. Minimum legth is 5 characters`, 5))
    } else {
      e.target.content.value = ''
      dispatch(createAnec(valueFromInput))  // or dispatch(createAnec(value))
      dispatch(makeAndRemoveMessage(`You created "${valueFromInput}"`, 5))

    }
  }

  return (
    <>
      <h2>Create new:</h2>
      <form onSubmit={(e) => createNew(e)} >
        <div><input name='content' /></div>
        <button>Create</button>
      </form>
    </>
  )
}

export default AnecdoteForm