import { token } from './auth'

const MOVIES_API_URL=`${process.env.REACT_APP_API_URL}/movies`

export function all() {
  return fetch(MOVIES_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token()}`
      }
    })
    .then(res => res.json())
    .catch(error => { console.log(error) })
}

export function save(movie) {
  return fetch(MOVIES_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    },
    body: JSON.stringify(movie)
  })
  .then(res => res.json())
  .catch(error => { console.log(error) })
}
