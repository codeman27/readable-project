import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import backArrow from './Images/BackArrow.svg'

class AddNewComment extends Component {
  state = {
    body: '',
    author: ''
  }

  changeBody = (body) => {
    this.setState({body})
  }

  changeAuthor = (author) => {
    this.setState({author})
  }

  addOrEditComment = (body, author, parentId) => {
    this.props.onAddNewComment(body, author, parentId)
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
          onClick={() => this.addOrEditComment(this.state.body, this.state.author, this.props.post.id)}>Submit</button>
        </Link>
      </div>
    )
  }
}

export default AddNewComment
