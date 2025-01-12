import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/'

// Configurez un interceptor pour supprimer les logs des erreurs
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      // Ne rien afficher dans la console pour les erreurs 400
      console.log('cette erreur est interceptée')
      return Promise.reject(error) // Gère l'erreur sans log
    }
    console.log("cette erreur n'est pas interceptée")
    return Promise.reject(error) // Propager les autres erreurs
  }
)

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
