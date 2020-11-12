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

  let searchInString = (str, subStr) => {   // pomocná funkce // helper function
    //console.log(str, subStr)
    if (str.indexOf(subStr) >= 0) {
      return true;
    } else {
      return false;
    }
  };

  let filterStr = useSelector(state => state.filter)

  // filtered or  not filtered anecdotes
  let anecdotesToRender = useSelector(state => {
    if (state.filter === "") {   //když je filter prázný tak nic nedělat
        return state.anecdotes
    } else {
      return state.anecdotes.filter((a) =>
      searchInString(a.content.toLowerCase(), filterStr.toLowerCase()))   //jinak vyfiltruj content, který obsahuje znaky z filtru 
    }
  })

  return (
    <>
    {anecdotesToRender.map(anecdote =>
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