import React from 'react';

export default function MovieForm({ onSubmit }) {
  function handleFormSubmission(event) {
    event.preventDefault();
    const { elements } = event.target;
    const title = elements["title"].value;
    const yearReleased = elements["yearReleased"].value;
    onSubmit({ title, yearReleased });
  }

  return (
    <form onSubmit={handleFormSubmission} >
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
  )
}