import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import './App.css';
import MoviesList from './components/MovieList'
import MovieForm from './components/MovieForm'
import AboutPage from './pages/AboutPage'
import * as moviesAPI from './api/movies'
class App extends Component {
  state = { movies: null }

  componentDidMount() {
    moviesAPI.all()
      .then(movies => {
        this.setState({ movies })
      })
  }

  handleMovieSubmission = (movie) => {
    this.setState(({ movies }) => (
      { movies: [movie].concat(movies) }
    ));

    moviesAPI.save(movie);
  }

  render() {
    const { movies } = this.state;
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to='/about'>About</Link>
            &nbsp;
            <Link to='/'>Movies</Link>
          </nav>
          <hr/>
          <Switch>
            <Route path='/about' component={AboutPage} />
            <Route path='/' render={
              () => (
                <div>
                  <MovieForm onSubmit={this.handleMovieSubmission} />
                  <hr />
                  {
                    movies ? (
                        <MoviesList movies={movies} />
                      ) : (
                        "Loading..."
                      )
                  }
                </div>
              )
            }/>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;