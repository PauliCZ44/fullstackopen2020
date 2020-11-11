import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, createAnec } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('voting for', anecdote.id)
    dispatch(voteAnecdote(anecdote))
  }

  const createNew = (e) => {
    e.preventDefault()
    console.log('creating')
    console.log(e.target.content.value)
    dispatch(createAnec(e.target.content.value))
    e.target.content.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>Create new:</h2>
      <form onSubmit={(e) => createNew(e)} >
        <div><input name = 'content'/></div>
        <button>Create</button>
      </form>
    </div>
  )
}

export default App