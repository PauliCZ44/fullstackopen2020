import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/NotificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
  messages: NotificationReducer  //in Notification component, we need to use "useSelector(state => state.messages)" to get this state
})


const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk))
)





export default store
