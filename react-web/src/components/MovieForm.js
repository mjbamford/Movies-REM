import React from 'react';
import { Redirect } from 'react-router-dom'

class MovieForm extends React.Component {
  // export default function MovieForm({ onSubmit, redirect }) {

  state = { redirect: false }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { elements } = event.target;
    const title = elements["title"].value;
    const yearReleased = elements["yearReleased"].value;
    this.setState({ redirect: true })
    this.props.onSubmit({ title, yearReleased });
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
            <input type="text" name="title"/>
          </label>
          &nbsp;
          <label>
            Year
            &nbsp;
            <input type="number" name="yearReleased"/>
          </label>
          &nbsp;
          <button type="submit">Create Movie! &hearts;</button>
        </form>
      </div>
    )
  }
}

export default MovieForm
