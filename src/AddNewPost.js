import React, { Component } from 'react'
import backArrow from './Images/BackArrow.svg'
import { Link } from 'react-router-dom'

class AddNewPost extends Component{
  state = {
    title: '',
    category: 'react',
    author: '',
    body: ''
  }

  updateTitleValue = (title) => {
    this.setState({title})
  }

  updateCategoryValue = (category) => {
    this.setState({category})
  }

  updateAuthorValue = (author) => {
    this.setState({author})
  }

  updateBodyValue = (body) => {
    this.setState({body})
  }

  render(){
    return (
      <div>
        <Link to={`/posts/${this.state.category}`}><img className="back-arrow" alt="A back arrow" src={backArrow}/></Link>
        <form>
          <div className="form-group">
            Title: <input className="form-control"
              type="text"
              name="title"
              value={this.state.title}
              onChange={event => this.updateTitleValue(event.target.value)}/><br/>
          </div>
          <div className="form-group">
            Category: <select className="form-control" name="category" onChange={event => this.updateCategoryValue(event.target.value)}>
              {this.props.categories.map((category) => {
                return(
                  <option key={category.name} value={category.name}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</option>
                )
              })}
            </select><br/>
          </div>
          <div className="form-group">
            Author: <input className="form-control"
              type="text"
              name="author"
              value={this.state.author}
              onChange={event => this.updateAuthorValue(event.target.value)}/><br/>
          </div>
          <div className="form-group">
            Body:<textarea className="form-control"
              rows="10" name="body"
              value={this.state.body}
              onChange={event => this.updateBodyValue(event.target.value)}></textarea>
          </div>
        </form>
        <Link to="/posts/all"><button className="btn btn-primary add-newpost"
          onClick={() => this.props.onAddNewPost(this.state.title, this.state.body, this.state.author, this.state.category)}>Submit</button>
        </Link>
      </div>
    )
  }
}

export default AddNewPost
