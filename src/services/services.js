import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/'

export async function logUser(userInfo) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }
  const response = await axios.post(
    `${API_URL}user/login`,
    {
      email: userInfo.email,
      password: userInfo.password,
    },
    config
  )
  return response.data.body.token
}

export async function getProfile(userToken) {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  }
  const response = await axios.post(`${API_URL}user/profile`, {}, config)
  return response.data.body
}
