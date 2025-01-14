import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/'

/**
 * Async function to construct Axios POST API call to authentificate user
 *
 * @param {Object} userInfo contains data from sign up form
 * @param {string} userInfo.userName username
 * @param {string} userInfo.password password
 * @param {string} userInfo.remember username | '' (empty if "Remember me" is not checked)
 *
 * @returns {Promise}
 * @returns {Promise.resolve<string>} JWT
 * @returns {Promise.reject<Error>} Axios error
 */
export async function logUser(userInfo) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

/**
 * Async function to construct Axios POST API call to retrieve user infos from API
 *
 * @param {string} userToken JWT
 *
 * @returns {Promise}
 * @returns {Promise.resolve<Object.<
 *   email: string,
 *   firstName: string,
 *   lastName: string,
 *   createdAt: string,
 *   updatedAt: string,
 *   id: string,
 * >>} Returns user info from API
 * @returns {Promise.reject<Error>} Axios Error
 */
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

/**
 * Async function to construct Axios PUT API call to update user infos in database
 *
 * @param {Object} data contains user token and new user data from edit user name form
 * @param {string} data.userToken JWT
 * @param {string} data.firstName new user firstName from edit user name form
 * @param {string} data.lastName new user lastName from edit user name form
 *
 * @returns {Promise}
 * @returns {Promise.resolve<Object.<
 *   email: string,
 *   firstName: string,
 *   lastName: string,
 *   createdAt: string,
 *   updatedAt: string,
 *   id: string,
 * >>} Returns updated user info from API
 * @returns {Promise.reject<Error>} Axios Error
 */
export async function updateName(data) {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${data.userToken}`,
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.put(
    `${API_URL}user/profile`,
    {
      firstName: data.firstName,
      lastName: data.lastName,
    },
    config
  )
  return response.data.body
}
