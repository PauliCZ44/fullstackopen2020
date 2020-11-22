import axios from 'axios'
const baseUrl = '/api/users'

const register = async (userData) => {
  const res = await axios.post(baseUrl, userData)
  console.log(res)
  return res.data
}

export default { register }