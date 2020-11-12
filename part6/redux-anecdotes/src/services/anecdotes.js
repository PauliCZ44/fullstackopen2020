import axios from 'axios'

let baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  let AllAnecdotes = await axios.get(baseURL)
  console.log(AllAnecdotes.data)
  return AllAnecdotes.data
}

//export default { getAll }
export default { getAll }