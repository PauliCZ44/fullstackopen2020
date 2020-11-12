
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
