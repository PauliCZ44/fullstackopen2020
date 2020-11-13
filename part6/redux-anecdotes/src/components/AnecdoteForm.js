import React from 'react'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { makeAndRemoveMessage } from '../reducers/NotificationReducer'

const AnecdoteForm = (props) => {

  const createNew = async (e) => {
    e.preventDefault()
    let valueFromInput = e.target.content.value
    if (valueFromInput.length < 5) {
      props.makeAndRemoveMessage(`"${valueFromInput}" is not valid. Too short. Minimum legth is 5 characters`, 5)
    } else {
      e.target.content.value = ''
      props.createAnec(valueFromInput)  // or dispatch(createAnec(value))
      props.makeAndRemoveMessage(`You created "${valueFromInput}"`, 5)

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

export default connect(null, { createAnec, makeAndRemoveMessage })(AnecdoteForm)