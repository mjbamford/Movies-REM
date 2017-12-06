import React from 'react';
import Comment from './Comment'

export default function Movie(props)
 {
  const { title, yearReleased, director, comments } = props;
  console.log(props)
  return (
    <div className="movie">
      <span>Title: {title}</span>
      <span>Year: {yearReleased}</span>
      <span>Director: {director.firstName} {director.lastName}</span>
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