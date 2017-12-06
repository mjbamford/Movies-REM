import React, { Component } from 'react';
import './App.css';
import MoviesList from './components/MovieList'

class App extends Component {
  state = { movies: null }

  componentDidMount() {
    fetch('/movies')
      .then(res => res.json())
      .then(movies => {
        this.setState({ movies })
      })
      .catch(error => { console.log(error) })
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="App">
        {
          movies ? (
            <MoviesList movies={ movies } />
          ) : (
            "Loading..."
          )
        }
      </div>
    );
  }
}

export default App;