
let initMessage = '-'

export const displayMessage = (data) => {
  console.log('DISPLAING')
  return {
    type: 'display',
    message: data
  }
}

export const removeMessage = () => {
  console.log('REMOVING')
  return {
    type: 'remove',
    message: initMessage
  }
}

// 2 aboce function (actions) are used in one action creator as a series of actions, where 1 is asynchronous.
// more about this at https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559

export const makeAndRemoveMessage = (text = '-', seconds = 3) => {
  let time = seconds * 1000
  return async (dispatch) => {
    dispatch({
      type: 'display',
      message: text
    })
    setTimeout(() => {
      dispatch({
        type: 'remove',
        message: initMessage
      })
    }, time)
  }
}


//dispatch(setNotification(`you voted '${anecdote.content}'`, 10))


const NotificationReducer = (state = initMessage, action) => {
  switch (action.type) {
    case 'display': {
      return action.message
    }
    case 'remove': {
      return action.message
    }
    default: return state
  }
}


export default NotificationReducer
