import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayMessage, removeMessage } from '../reducers/NotificationReducer'
const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('voting for', anecdote.id)
    dispatch(voteAnecdote(anecdote))
    dispatch(displayMessage(`You voted for "${anecdote.content}"` ))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  let anecdotes = useSelector(state => state.anecdotes)

  return (
    <>
    {anecdotes.map(anecdote =>
        <section key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            Has <strong>{anecdote.votes}</strong> votes.
            <button onClick={() => vote(anecdote)}>Vote for more!</button>
          </div>
        </section>
      )}
    </>
  )
}

export default AnecdoteList