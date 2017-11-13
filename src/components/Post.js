import React from 'react'
import backArrow from '../Images/BackArrow.svg'
import { Link } from 'react-router-dom'
import arrow from '../Images/Arrow.svg'
import editSymbol from '../Images/EditSymbol.svg'
import addPostImg from '../Images/AddSymbol.svg'

const Post = (props) => {
    return(
      <div>
        <Link to={`/${props.header === 'Readables!' ? '' : props.header}`}><img className="back-arrow" alt="A back arrow" src={backArrow}/></Link>
        <div className="container">
          <div className="row post-body">
            <div className="col-sm-1 col-xs-2">
              <img alt="An upvote arrow" className="arrow" src={arrow} onClick={ () => props.onVote(props.post.id, 'upVote')}/>
              <h4 className="vote-number">{props.post.voteScore}</h4>
              <img alt="A downvote arrow" className="arrow down-arrow" src={arrow} onClick={ () => props.onVote(props.post.id, 'downVote')}/>
            </div>
            <div className="col-sm-9 col-xs-9">
              <h4>{props.post.title}</h4>
              <p>{props.post.body}</p>
              <center>
                <p className="post-footer">{props.post.author}</p>
                <p className="post-footer">{new Date(props.post.timestamp).toLocaleString()}</p>
              </center>
            </div>
            <div className="col-sm-2">
              <Link className="delete-post" to="/" onClick={() => props.onDeletePost(props.post.id)}>X</Link>
              <Link to="/new/addnewpost" onClick={() => props.onGetPostId(props.post.id)}><img alt="edit symbol" className="edit-symbol" src={editSymbol}/></Link>
            </div>
          </div>
          {props.comments.map(comment => {
            return (
              <div key={comment.id} className="row">
                <div className="col-sm-11 col-xs-10 pull-right post-comment">
                  <div className="col-sm-1 col-xs-2">
                    <img alt="An upvote arrow" className="arrow comment-arrow" src={arrow} onClick={() => props.onVoteComment(comment.id, 'upVote', props.post.id)}/>
                    <h4 className="vote-number">{comment.voteScore}</h4>
                    <img alt="A downvote arrow" className="arrow down-arrow comment-arrow" src={arrow} onClick={() => props.onVoteComment(comment.id, 'downVote', props.post.id)}/>
                  </div>
                  <div className="col-sm-10 col-xs-9">
                    <p>{comment.body}</p>
                    <center>
                      <p className="post-footer">{comment.author}</p>
                      <p className="post-footer">{new Date(comment.timestamp).toLocaleString()}</p>
                    </center>
                  </div>
                  <div className="col-xs-1">
                    <Link to="/" className="delete-post"  onClick={() => props.onDeleteComment(comment.id, props.post.id)}>X</Link>
                    <Link to="/new/addnewcomment" onClick={() => props.onGetCommentId(comment.id)}><img alt="edit symbol" className="edit-symbol" src={editSymbol}/></Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Link to="/new/addnewcomment"><img alt="A plus sign to add a post" className="addcomment-img" src={addPostImg}/></Link>
      </div>
    )
}

export default Post
