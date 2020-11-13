import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject).sort((a, b) => b.votes-a.votes)

// MAIN REDUCER
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'initialAnecdotes': {
      return action.data
    }
    case 'vote': {
      const anecToVote = state.find(a => a.id === action.id)
      console.log(anecToVote)
      anecToVote.votes += 1
      return state.map(anecdote => anecdote.id === action.id ? anecToVote : anecdote).sort((a, b) => b.votes-a.votes)   // projdi state a  pokud najdes anecdote se stejným ID tak ji nahraď anecToChange jinak vlož původní anecdote
      //find anecdotes by id nd increase vote by 1
    }
    case 'create': {
      const anecToAdd = {
        content: action.data.content,
        id: action.data.id,
        votes: action.data.votes
      }
      return [...state, anecToAdd]
    }
    default: return state
  }
}


//ACTION CREATOR 1
export const voteAnecdote = (anecdote) => {
  console.log("VOTE ANEC ACTION")
  return {
    type: 'vote',
    id: anecdote.id
  }
  }

//ACTION CREATOR 2
export const createAnec = (content) => {
  console.log("CREATE ANEC ACTION")
  return async (dispatch) => {
  const result = await anecdoteService.createNew(content)
  dispatch({
    type: 'create',
    data: result
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) =>  {
    const anecdotes = await anecdoteService.getAll()  //thanks to redux-thunk, function can be used in action creator as a return value of action creator
    dispatch({    
      type: 'initialAnecdotes',
      data: anecdotes
    })
  }
}

export default anecdoteReducer