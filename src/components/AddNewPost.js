import React, { Component } from 'react'
import backArrow from '../Images/BackArrow.svg'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class AddNewPost extends Component{
  state = {
    id: '',
    title: '',
    category: 'react',
    author: '',
    body: '',
    edit: false
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

  addOrEditPost = (title, body, author, category, id) => {
    if(this.state.edit){
      this.props.onSubmitEditPost(id, title, body)
    }else{
      this.props.onAddNewPost(title, body, author, category)
    }
  }

  componentWillReceiveProps(nextProps){
    const post = nextProps.post
    if(!_.isEmpty(post)){
      this.setState({
        id: post.id,
        title: post.title,
        category: post.category,
        author: post.author,
        body: post.body,
        edit: true
      })
    } else {
      this.setState({
        id: '',
        title: '',
        category: 'react',
        author: '',
        body: '',
        edit: false
      })
    }
  }

  render(){
    return (
      <div>
        <Link to={`/${this.props.header === 'Readables!' ? '' : this.props.header}`}><img className="back-arrow" alt="A back arrow" src={backArrow}/></Link>
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
        <Link to={`/${this.props.header === 'Readables!' ? '' : this.props.header}`}><button className="btn btn-primary add-newpost"
          onClick={() => this.addOrEditPost(this.state.title, this.state.body, this.state.author, this.state.category, this.state.id)}>Submit</button>
        </Link>
      </div>
    )
  }
}

export default AddNewPost
