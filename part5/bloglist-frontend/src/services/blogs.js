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

const create = async (blogToBeSaved) => {
  console.log("token:", token)
  const config = {headers: { Authorization: token}}
  const response = await axios.post(baseUrl, blogToBeSaved, config)
  console.log("token:", token)
  return response.data
}

export default { getAll, setToken, create }