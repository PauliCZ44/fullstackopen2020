import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/NotificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer =  combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
  messages: NotificationReducer  //in Notification component, we need to use "useSelector(state => state.messages)" to get this state
})


const store = createStore(
  reducer, 
  composeWithDevTools()
  )



  

export default store
