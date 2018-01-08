import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MoviesList from '../components/MovieList'
import Movie from '../components/Movie'

export default ({ movies }) => (
  !!movies ? (
    <Switch>
      <Route path='/movies/:id' render={
        ({ match }) => {
          console.log(match)
          const id = match.params.id
          const movie = movies.find((movie) => movie._id === id)
          if (!movie) {
            return (<p>Movie Not Found! ({id})</p>)
          }
          return (<Movie {...movie} />)
        }} />
      <Route path='/movies' render={() => (
        <MoviesList movies={movies} />
      )} />
    </Switch>
  ) : (
      "Loading..."
  )
)