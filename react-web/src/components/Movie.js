import React from 'react';
import Comment from './Comment'
import { Link } from 'react-router-dom'

export default function Movie(props) {
  const { _id, title, yearReleased, director, comments } = props;
  return (
    <div className="movie">
      <span>
        Title:
        &nbsp;
        <Link to={`/movies/${_id}`}>
          {title}
        </Link>
      </span>
      <span><small>({yearReleased})</small></span>
      { director && <span>Director: {director.firstName} {director.lastName}</span> }
      <div>
        {
          comments ? (
            comments.map(comment => (
              <Comment key={comment._id}>
                {comment.body}
              </Comment>
            ))
          ) : ('No Comments')
        }
      </div>
    </div>
  )
}