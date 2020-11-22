import userService  from '../services/users'
import blogService from '../services/blogs'
import loginService from '../services/login'

let initialState = { users: [], loggedUser: '' }

export const initializeUsers =  () => {
  return async (dispatch) =>  {
    const users = await userService.getAllUsers()  //thanks to redux-thunk, function can be used in action creator as a return value of action creator
    dispatch({
      type: 'INIT_USERS',
      users: users
    })
  }
}

export const Login =  (data) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login({ username: data.username, password: data.password })
    blogService.setToken(loggedUser.token) //setting token for user
    dispatch ({
      type: 'LOGIN',
      data: data.username
    })
    console.log('ACTION LOGIN')
    return loggedUser
  }
}

export const Logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const SetFromLocalStorage = (data) => {
  blogService.setToken(data.token)
  return {
    type: 'SET_FROM_LOCAL_STORAGE',
    data: data
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_USERS': {
    return { ...state, users: [...action.users] }
  }
  case 'LOGIN': {
    return { ...state, loggedUser: 'action.data' }
  }
  case 'LOGOUT': {
    return { ...state, loggedUser: '' }
  }
  case 'SET_FROM_LOCAL_STORAGE': {
    return { ...state, loggedUser: action.data }
  }
  default: return state
  }

}

export default userReducer