import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/NotificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'

const reducer =  combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
  messages: NotificationReducer  //in Notification component, we need to use "useSelector(state => state.messages)" to get this state
})


const store = createStore(
  reducer, 
  composeWithDevTools()
  )



anecdoteService.getAll().then(data => 
   //  anec.forEach(a => store.dispatch({ type: 'create', data: a }))   /// this line was used at first, and worked
   store.dispatch(initializeAnecdotes(data))
  )
  

export default store
