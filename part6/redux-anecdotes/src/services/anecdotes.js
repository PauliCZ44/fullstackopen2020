import axios from 'axios'

let baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  let AllAnecdotes = await axios.get(baseURL)
  //console.log(AllAnecdotes.data)
  return AllAnecdotes.data
}

const createNew = async (dataLoad) => {
  let dataAsObject = {
    content: dataLoad,
    votes: 0
  }
  let newAnec = await axios.post(baseURL, dataAsObject)
  return newAnec.data
}


//export default { getAll }
export default { getAll, createNew }