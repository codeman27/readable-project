import React from 'react'
import backArrow from './Images/BackArrow.svg'
import { Link } from 'react-router-dom'
import arrow from './Images/Arrow.svg'

const Post = (props) => {
  const postObj = props.post[0]
  return(
    <div>
      <Link to="/posts/all"><img className="back-arrow" alt="A back arrow" src={backArrow}/></Link>
      <div className="container">
        <div className="row post-body">
          <div className="col-sm-1 col-xs-2">
            <img alt="An upvote arrow" className="arrow" src={arrow} onClick={ () => props.onVote(postObj.id, 'upVote')}/>
            <h4 className="vote-number">{postObj.voteScore}</h4>
            <img alt="A downvote arrow" className="arrow down-arrow" src={arrow} onClick={ () => props.onVote(postObj.id, 'downVote')}/>
          </div>
          <div className="col-sm-10 col-xs-9">
            <h4>{postObj.title}</h4>
            <p>{postObj.body}</p>
            <center>
              <p className="post-footer">{postObj.author}</p>
              <p className="post-footer">{new Date(postObj.timestamp).toLocaleString()}</p>
            </center>
          </div>
          <div className="col-sm-1">
            <Link to="/" onClick={() => props.onDeletePost(postObj.id)}><p className="delete-post">X</p></Link>
          </div>
        </div>
        {props.comments.map(comment => {
          return (
            <div key={comment.id} className="row">
              <div className="col-sm-11 col-xs-10 pull-right post-comment">
                <div className="col-sm-1 col-xs-2">
                  <img alt="An upvote arrow" className="arrow comment-arrow" src={arrow}/>
                  <h4 className="vote-number">{comment.voteScore}</h4>
                  <img alt="A downvote arrow" className="arrow down-arrow comment-arrow" src={arrow}/>
                </div>
                <div className="col-xs-10">
                  <p>{comment.body}</p>
                  <center>
                    <p className="post-footer">{comment.author}</p>
                    <p className="post-footer">{new Date(comment.timestamp).toLocaleString()}</p>
                  </center>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Post
