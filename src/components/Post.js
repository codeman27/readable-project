import React, {Component} from 'react'
import _ from 'lodash'
import backArrow from '../Images/BackArrow.svg'
import { Link } from 'react-router-dom'
import arrow from '../Images/Arrow.svg'
import editSymbol from '../Images/EditSymbol.svg'
import addPostImg from '../Images/AddSymbol.svg'

class Post extends Component {
  componentDidMount(){
    const emptyPost = _.isEmpty(this.props.post)
    if(emptyPost) {
      this.props.onSetPost(window.location.pathname.slice(6))
      this.props.onSetComments(window.location.pathname.slice(6))
    }
  }
  render(){
    const emptyPost = _.isEmpty(this.props.post)
    if(emptyPost){
      return(
        <div>
          <h4>ERROR 404</h4>
          <p>Sorry, we can't find the post you're looking for :(</p>
        </div>
      )
    }
    return(
      <div>
        <Link to={`/${this.props.header === 'Readables!' ? '' : this.props.header}`}><img className="back-arrow" alt="A back arrow" src={backArrow}/></Link>
        <div className="container">
          <div className="row post-body">
            <div className="col-sm-1 col-xs-2">
              <img alt="An upvote arrow" className="arrow" src={arrow} onClick={ () => this.props.onVote(this.props.post.id, 'upVote')}/>
              <h4 className="vote-number">{this.props.post.voteScore}</h4>
              <img alt="A downvote arrow" className="arrow down-arrow" src={arrow} onClick={ () => this.props.onVote(this.props.post.id, 'downVote')}/>
            </div>
            <div className="col-sm-9 col-xs-9">
              <h4>{this.props.post.title}</h4>
              <p>{this.props.post.body}</p>
              <center>
                <p className="post-footer">{this.props.post.author}</p>
                <p className="post-footer">{new Date(this.props.post.timestamp).toLocaleString()}</p>
              </center>
            </div>
            <div className="col-sm-2">
              <Link className="delete-post" to="/" onClick={() => this.props.onDeletePost(this.props.post.id)}>X</Link>
              <Link to="/new/addnewpost" onClick={() => this.props.onGetPostId(this.props.post.id)}><img alt="edit symbol" className="edit-symbol" src={editSymbol}/></Link>
            </div>
          </div>
          {this.props.comments.map(comment => {
            return (
              <div key={comment.id} className="row">
                <div className="col-sm-11 col-xs-10 pull-right post-comment">
                  <div className="col-sm-1 col-xs-2">
                    <img alt="An upvote arrow" className="arrow comment-arrow" src={arrow} onClick={() => this.props.onVoteComment(comment.id, 'upVote', this.props.post.id)}/>
                    <h4 className="vote-number">{comment.voteScore}</h4>
                    <img alt="A downvote arrow" className="arrow down-arrow comment-arrow" src={arrow} onClick={() => this.props.onVoteComment(comment.id, 'downVote', this.props.post.id)}/>
                  </div>
                  <div className="col-sm-10 col-xs-9">
                    <p>{comment.body}</p>
                    <center>
                      <p className="post-footer">{comment.author}</p>
                      <p className="post-footer">{new Date(comment.timestamp).toLocaleString()}</p>
                    </center>
                  </div>
                  <div className="col-xs-1">
                    <Link to="/" className="delete-post"  onClick={() => this.props.onDeleteComment(comment.id, this.props.post.id)}>X</Link>
                    <Link to="/new/addnewcomment" onClick={() => this.props.onGetCommentId(comment.id)}><img alt="edit symbol" className="edit-symbol" src={editSymbol}/></Link>
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
}

export default Post
