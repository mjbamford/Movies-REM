export function all() {
  return fetch('/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uYnJvd25AZXhhbXBsZS5jb20iLCJpYXQiOjE1MTMxMjg5NDIsImV4cCI6MTUxMzczMzc0Miwic3ViIjoiNWEzMDdhZmY3YjQzNWExMTI2MTNmYmY4In0.fqYU6zVogosJWGBtsaUtaYrm5axTBZevz9fg_zyozAk'
      }
    })
    .then(res => res.json())
    .catch(error => { console.log(error) })
}

export function save(movie) {
  return fetch('/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uYnJvd25AZXhhbXBsZS5jb20iLCJpYXQiOjE1MTMxMjg5NDIsImV4cCI6MTUxMzczMzc0Miwic3ViIjoiNWEzMDdhZmY3YjQzNWExMTI2MTNmYmY4In0.fqYU6zVogosJWGBtsaUtaYrm5axTBZevz9fg_zyozAk'
    },
    body: JSON.stringify(movie)
  })
  .then(res => res.json())
  .catch(error => { console.log(error) })
}