import React from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { makeAndRemoveMessage } from '../reducers/NotificationReducer'



const AnecdoteList = (props) => {
  //console.log("state", props)

  const vote = (anecdote) => {
    //console.log('voting for', anecdote.id)

    let newAnecToPut = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    props.voteAnecdote(newAnecToPut)
    props.makeAndRemoveMessage(`You voted for "${anecdote.content}"`, 3)
  }

  return (
    <>
      {props.anecdotes.map(anecdote =>
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


const mapStateToProps = (state) => {

  let searchInString = (str, subStr) => {   // pomocná funkce // helper function
    //console.log(str, subStr)
    if (str.indexOf(subStr) >= 0) {
      return true;
    } else {
      return false;
    }
  };
  let sortedAnecdotes = state.anecdotes.sort((a, b) => b.votes - a.votes)

  // filtered or  not filtered anecdotes
  if (state.filter === "") {   //když je filter prázný tak nic nedělat
    return { anecdotes: sortedAnecdotes }
  } else {
    return {
      anecdotes: sortedAnecdotes
        .filter((a) =>
          searchInString(a.content.toLowerCase(), state.filter.toLowerCase()))
    }   //jinak vyfiltruj content, který obsahuje znaky z filtru 
  }


  /* This has to return this: 
  return {
     anecdotes: state.anecdotes,
    // NOT THIS line : filterStr: state.filter,//
   }*/
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voteAnecdote, makeAndRemoveMessage }
)(AnecdoteList)

export default ConnectedAnecdoteList