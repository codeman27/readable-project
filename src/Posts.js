import React from 'react'
import arrow from './Images/Arrow.svg'
import { Link } from 'react-router-dom'
import editSymbol from './Images/EditSymbol.svg'

const Posts = (props) => {
  const getPostAndComments = (id) => {
    props.onGetPostId(id)
    props.onGetCommentsByPost(id)
  }

  return (
    <div>
      {props.posts.map(post => {
        return(
            <div key={post.id} className="row">
              <div className="col-xs-12 comment-box">
                <div className="row">
                  <div className="col-sm-1 col-xs-2">
                    <img alt="An upvote arrow" className="arrow" src={arrow} onClick={ () => props.onVote(post.id, 'upVote')}/>
                    <h4 className="vote-number">{post.voteScore}</h4>
                    <img alt="A downvote arrow" className="arrow down-arrow" src={arrow} onClick={ () => props.onVote(post.id, 'downVote')}/>
                  </div>
                  <div className="col-sm-9 col-xs-7">
                    <Link key={post.id} to={`/post/${post.id}`} onClick={() => getPostAndComments(post.id)}><h4 className="post-title">{post.title}</h4></Link>
                    <p>By: {post.author}</p>
                    <p>Comments: {post.commentCount}</p>
                  </div>
                  <div className="col-sm-2 col-xs-3 author-date">
                    <Link className="delete-post" to="/" onClick={() => props.onDeletePost(post.id)}>X</Link>
                    <img alt="edit symbol" className="edit-symbol" src={editSymbol}/>
                    <p className="date-time">{new Date(post.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
        )
      })}
    </div>
  )
}

export default Posts
