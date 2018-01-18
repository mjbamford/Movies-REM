import React from 'react';
import { Redirect } from 'react-router-dom'
import isAlphanumeric from 'validator/lib/isAlphanumeric'

class MovieForm extends React.Component {
  state = {
    redirect: false,
    movie: {},
    errors: {}
  }

  validate = (movie) => {
    const errors = {}
    if (!movie.title) errors.title = "Title is required"
    if (movie && !isAlphanumeric(movie.title)) errors.title = "Invalid title"
    if (!movie.yearReleased) errors.yearReleased = "Year Released is required"
    if (!(movie.title || movie.yearReleased)) errors.base = ' Please fill out the form'
    return errors
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const errors = this.validate(this.state.movie)
    this.setState({ errors })

    if (Object.keys(errors).length > 0) return;

    this.setState({ redirect: true })
    this.props.onSubmit(this.state.movie);
  }

  handleInputChange = (event) => {
    const attr = event.target.name
    const value = event.target.value
    const movie = this.state.movie
    movie[attr] = value
    this.setState({ movie })
  }

  render() {
    const { redirect } = this.state
    return (
      <div>
        { redirect && <Redirect to="/movies"/> }
        <form onSubmit={ this.handleFormSubmission } >
          <label>
            Title
            &nbsp;
            <input onChange={ this.handleInputChange } type="text" name="title"/>
            <span className="error">{ this.state.errors.title }</span>
          </label>
          &nbsp;
          <label>
            Year
            &nbsp;
            <input onChange={ this.handleInputChange } type="number" name="yearReleased"/>
            <span className="error">{ this.state.errors.yearReleased }</span>
          </label>
          &nbsp;
          <button type="submit">Create Movie! &hearts;</button>
          <span className="error">{ this.state.errors.base }</span>
        </form>
      </div>
    )
  }
}

export default MovieForm
