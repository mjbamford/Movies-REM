import decodeJWT from 'jwt-decode'

const AUTH_API_URL=`${process.env.REACT_APP_API_URL}/auth`

function setToken(token) {
  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}

export const token = () => (
  localStorage.getItem('token')
)

export const decodedToken = () => {
  if (isSignedIn()) {
    return decodeJWT(token())
  }
}

export function signIn({ email, password }) {
  const SIGNIN_URL = `${AUTH_API_URL}/signin`
  return fetch(SIGNIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(json => {
    if (json) { setToken(json['token']) }
    console.log(decodedToken())
    return json
  })
  .catch(error => { console.log(error) })
}

export function signOut() {
  setToken()
}

export function isSignedIn() {
  return !!token()
}
