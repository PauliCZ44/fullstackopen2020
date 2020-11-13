
let initMessage = '-'
let timeOutID

export const displayMessage = (data, id) => {
  console.log('DISPLAING')
  return {
    type: 'DISPLAY',
    message: data,
    id
  }
}

export const removeMessage = (id) => {
  console.log('REMOVING')
  return {
    type: 'REMOVE',
    message: initMessage,
    id
  }
}

// 2 aboce function (actions) are used in one action creator as a series of actions, where 1 is asynchronous.
// more about this at https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559

export const makeAndRemoveMessage = (text = '-', seconds = 3) => {
  let time = seconds * 1000
  clearTimeout(timeOutID)   //This does the trick
  return async (dispatch) => {
    dispatch({
      type: 'DISPLAY',
      message: text
    })
    timeOutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE',
        message: initMessage,
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
      return action.message
    }
    case 'REMOVE': {
      return action.message
    }
    default: return state
  }
}


export default NotificationReducer
