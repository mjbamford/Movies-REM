const AUTH_API_URL=`${process.env.REACT_APP_API_URL}/auth`

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
  .catch(error => { console.log(error) })
}