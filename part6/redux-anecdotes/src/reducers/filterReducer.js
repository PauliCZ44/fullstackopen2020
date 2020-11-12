
export const addFilter = (data) => {
  return {
    type: 'filter',
    filterStr: data
  }
}


const filterReducer = (state = '', action) => {
  switch (action.type) {
    case '': {
     return state
    }
    case 'filter': {
      return action.filterStr
    }
    default: return state
  }
}

export default filterReducer