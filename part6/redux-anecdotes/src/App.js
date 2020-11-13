import React,  {useEffect}  from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
        // anecdoteService.getAll().then(data =>  dispatch(initializeAnecdotes(data))   // data = anecdotes   /// second solution, asnyc operation was moved to action creator
        // anec.forEach(a => store.dispatch({ type: 'create', data: a }))   /// this line was used at first, and worked in store.js. Refactored to app.js
    dispatch(initializeAnecdotes())  
  }, [dispatch]);
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterForm />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App