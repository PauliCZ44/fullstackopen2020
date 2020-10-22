import axios from 'axios'
const baseUrl = '/api/blogs'
// eslint-disable-next-line
let token = null

function setToken(newToken) {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken }