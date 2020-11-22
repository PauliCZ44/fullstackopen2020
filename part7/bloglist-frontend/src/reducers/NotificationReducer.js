let initMessage = {
  message: '',
  error: false
}


let timeOutID

export const displayMessage = (data, id, error) => {
  console.log('DISPLAING')
  return {
    type: 'DISPLAY',
    message: data,
    error: error,
    id,
  }
}

export const removeMessage = (id) => {
  console.log('REMOVING')
  return {
    type: 'REMOVE',
    message: initMessage.message,
    error: false,
    id,
  }
}

// 2 aboce function (actions) are used in one action creator as a series of actions, where 1 is asynchronous.
// more about this at https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559

export const makeAndRemoveMessage = (text = '-', seconds = 3, error = false) => {
  let time = seconds * 1000
  clearTimeout(timeOutID) //This does the trick
  return async (dispatch) => {
    dispatch({
      type: 'DISPLAY',
      message: text,
      error: error
    })
    timeOutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE',
        message: initMessage.message,
        error: false
      })
    }, time)
  }
}

/* NOT IMPLEMENTED
export const displayAndRemove =(text = '-', seconds = 3) => {
  return async (dispatch) => {
  dispatch({
    type: 'DISPLAYANDREMOVE',
    message: text,
    expire: +new Date() + seconds*1000 })
  }
}
*/
//dispatch(setNotification(`you voted '${anecdote.content}'`, 10))

const NotificationReducer = (state = initMessage, action) => {
  switch (action.type) {
  case 'DISPLAY': {
    return { ...state,
      message: action.message,
      error: action.error,
    }
  }
  case 'REMOVE': {
    return { ...state,
      message: action.message,
      error: false
    }
  }
  default:
    return state
  }
}

export default NotificationReducer
