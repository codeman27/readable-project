import React, { Component } from 'react'
import backArrow from './Images/BackArrow.svg'
import { Link } from 'react-router-dom'
import arrow from './Images/Arrow.svg'
import editSymbol from './Images/EditSymbol.svg'
import addPostImg from './Images/AddSymbol.svg'

class Post extends Component {
  state = {
    postObj: {}
  }

  componentWillReceiveProps(nextProps){
    this.setState({postObj: nextProps.post})
  }

  render(){
    return(
      <div>
        <Link to="/posts/all"><img className="back-arrow" alt="A back arrow" src={backArrow}/></Link>
        <div className="container">
          <div className="row post-body">
            <div className="col-sm-1 col-xs-2">
              <img alt="An upvote arrow" className="arrow" src={arrow} onClick={ () => this.props.onVote(this.state.postObj.id, 'upVote')}/>
              <h4 className="vote-number">{this.state.postObj.voteScore}</h4>
              <img alt="A downvote arrow" className="arrow down-arrow" src={arrow} onClick={ () => this.props.onVote(this.state.postObj.id, 'downVote')}/>
            </div>
            <div className="col-sm-9 col-xs-9">
              <h4>{this.state.postObj.title}</h4>
              <p>{this.state.postObj.body}</p>
              <center>
                <p className="post-footer">{this.state.postObj.author}</p>
                <p className="post-footer">{new Date(this.state.postObj.timestamp).toLocaleString()}</p>
              </center>
            </div>
            <div className="col-sm-2">
              <Link className="delete-post" to="/" onClick={() => this.props.onDeletePost(this.state.postObj.id)}>X</Link>
              <Link to="/addnewpost" onClick={() => this.props.onGetPostId(this.state.postObj.id)}><img alt="edit symbol" className="edit-symbol" src={editSymbol}/></Link>
            </div>
          </div>
          {this.props.comments.map(comment => {
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
        <Link to="/addnewcomment"><img alt="A plus sign to add a post" className="addcomment-img" src={addPostImg}/></Link>
      </div>
    )
  }
}

export default Post
