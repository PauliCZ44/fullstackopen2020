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
  // console.log('token:', token)
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blogToBeSaved, config)
  console.log(response.data)
  return response.data
}

const deleteBlog = async (blogToBeDeleted) => {
  //console.log('token:', token)
  const config = { headers: { Authorization: token } }
  let url = baseUrl+'/'+blogToBeDeleted.id
  const response = await axios.delete(url, config)
  return response.data
}

const put = async (blogToBePutted) => {
  let url = baseUrl+'/'+blogToBePutted.id
  //console.log(url)
  const config = { headers: { Authorization: token } }
  const response = await axios.put(url, blogToBePutted, config)
  console.log('Put METHDON, data:', response.data)
  return response.data
}

const getOne = async (blogToBeFound) => {
  let url = baseUrl+'/'+blogToBeFound.id
  const response = await axios.get(url)
  console.log(response.data)
  return response.data
}

export default { getAll, setToken, create, put , deleteBlog, getOne }