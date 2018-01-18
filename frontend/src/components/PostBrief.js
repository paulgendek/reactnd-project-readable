import React from 'react'
import { Link } from 'react-router-dom'
import { humanDate } from '../utils/helpers'

const PostBrief = ({post}) => {
  return (
      <div className='post'>
        <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
        <pre>Submitted by <strong>{post.author}</strong> on <em>{humanDate(post.timestamp)}</em> to <Link to={`/${post.category}`}>{post.category}</Link></pre>
        <pre>Votes: {post.voteScore} | Comments: {post.commentCount}</pre>
      </div>
  )
};

export default PostBrief