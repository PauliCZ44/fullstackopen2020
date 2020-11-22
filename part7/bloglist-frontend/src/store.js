import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import NotificationReducer from './reducers/NotificationReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  notif: NotificationReducer, //in Notification component, we need to use "useSelector(state => state.messages)" to get this state
  users: userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
