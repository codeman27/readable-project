import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import backArrow from './Images/BackArrow.svg'
import _ from 'lodash'

class AddNewComment extends Component {
  state = {
    id: '',
    body: '',
    author: '',
    edit: false
  }

  changeBody = (body) => {
    this.setState({body})
  }

  changeAuthor = (author) => {
    this.setState({author})
  }

  addOrEditComment = (id, body, author, parentId) => {
    if(this.state.edit) {
      this.props.onSubmitEditComment(id, body)
    } else {
      this.props.onAddNewComment(body, author, parentId)
    }
  }

  componentWillReceiveProps(nextProps){
    const comment = nextProps.comment
    if(!_.isEmpty(comment)){
      this.setState({
        id: comment.id,
        author: comment.author,
        body: comment.body,
        edit: true
      })
    } else {
      this.setState({
        id: comment.id,
        author: comment.author,
        body: comment.body,
        edit: false
      })
    }
  }

  render(){
    return (
      <div>
        <Link to={`/posts/${this.props.header === 'Readables!' ? 'All' : this.props.header}`}><img className="back-arrow" alt="A back arrow" src={backArrow}/></Link>
        <div className="container">
          <div className="row post-body">
            <center><h4>{this.props.post.title}</h4></center>
            <p>{this.props.post.body}</p>
          </div>
        </div>
        <div className="form-group">
          Body: <textarea
            className="form-control"
            value={this.state.body}
            onChange={event => this.changeBody(event.target.value)}
            rows="10"></textarea>
        </div>
        <div className="form-group">
          Author: <input className="form-control"
            value={this.state.author}
            onChange={event => this.changeAuthor(event.target.value)}></input>
        </div>
        <Link to={`/posts/${this.props.header === 'Readables!' ? 'All' : this.props.header}`}><button className="btn btn-primary add-newpost"
          onClick={() => this.addOrEditComment(this.state.id, this.state.body, this.state.author, this.props.post.id)}>Submit</button>
        </Link>
      </div>
    )
  }
}

export default AddNewComment
