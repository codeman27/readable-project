import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Categories from './Categories'
import ContentSection from './ContentSection'
import AddNewPost from './AddNewPost'
import Post from './Post'
import * as ReadablesAPI from './ReadablesAPI'
import AddNewComment from './AddNewComment'
import '../App.css'
import * as actions from '../actions'

const uuidv1 = require('uuid/v1')

class App extends Component {
  state = {
    sortVal: 'voteScore',
    sortDir: 'desc',
  }

  changeHeader = (header) => {
      this.props.changeHeader(header)
      this.listPosts(header)
  }

  listPosts = (header) => {
    const {sortVal, sortDir} = this.state
    header === 'Readables!' ?
      this.props.setPosts(sortVal, sortDir) :
      this.props.setCategoryPosts(header.toLowerCase(), sortVal, sortDir)
  }

  sortPosts = (value) => {
    const { header } = this.props
    const {sortVal, sortDir} = this.state
    if(value === 'Votes'){
      if(sortVal === 'voteScore'){
        this.setState({sortDir: sortDir ==='desc' ? 'asc' : 'desc'}, () => this.listPosts(header))
      } else {
        this.setState({sortVal: 'voteScore', sortDir: 'desc'}, () => this.listPosts(header))
      }
    } else {
        if(sortVal === 'timestamp'){
          this.setState({sortDir: sortDir ==='desc' ? 'asc' : 'desc'}, () => this.listPosts(header))
        } else {
          this.setState({sortVal: 'timestamp', sortDir: 'desc'}, () => this.listPosts(header))
        }
    }
  }

  addNewPost = (title, body, author, category) => {
    const {header} = this.props
    const id = uuidv1()
    const timestamp = Date.now()
    ReadablesAPI.addPost(id, timestamp, title, body, author, category).then(() => this.listPosts(header))
  }

  addNewComment = (body, author, parentId) => {
    const { header } = this.props
    const id = uuidv1()
    const timestamp = Date.now()
    ReadablesAPI.addComment(id, timestamp, body, author, parentId).then(() => this.listPosts(header))
  }

  submitEditPost = (id, title, body) => {
    const {header} = this.props
    ReadablesAPI.editPost(id, title, body).then(() => this.listPosts(header))
  }

  submitEditComment = (id, body) => {
    const timestamp = Date.now()
    ReadablesAPI.editComment(id, timestamp, body)
  }

  deletePost = (id) => {
    const {header} = this.props
    ReadablesAPI.deletePost(id).then(() => this.listPosts(header))
  }

  deleteComment = (id, postId) => {
    const {header} = this.props
    ReadablesAPI.deleteComment(id).then(() => this.listPosts(header)).then(() => this.props.setComments(postId))
  }

  votePost = (id, voteType) => {
    const {header} = this.props
    ReadablesAPI.postVote(id, voteType).then(() => this.listPosts(header)).then(() => this.props.setPost(id))
  }

  voteComment = (id, voteType, postId) => {
    ReadablesAPI.postCommentVote(id, voteType).then(() => this.props.setComments(postId))
  }

  componentDidMount() {
    const {sortVal, sortDir} = this.state
    this.props.setCategories()
    this.props.setPosts(sortVal, sortDir)
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="jumbotron">
              <h1>{this.props.header}</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <Route exact path="(/\w+|/)" render={() => (
              <ContentSection posts={this.props.posts}
                onSortPosts={this.sortPosts}
                onVote={this.votePost}
                onGetPostId={this.props.setPost}
                onGetCommentsByPost={this.props.setComments}
                onDeletePost={this.deletePost}
                onClearPostValue={this.clearPostValue}
              />
            )}></Route>
            <Route exact path="(/\w+|/)" render={() => (
              <Categories
                header={this.props.header}
                onChangeHeader={this.changeHeader}
                categories={this.props.categories}
              />
            )}></Route>
            <Route exact path="/post/:id" render={() => (
              <Post post={this.props.post}
                comments={this.props.comments}
                header={this.props.header}
                onVote={this.votePost}
                onDeletePost={this.deletePost}
                onGetPostId={this.props.setPost}
                onGetCommentId={this.props.setComment}
                onVoteComment={this.voteComment}
                onDeleteComment={this.deleteComment}
              />
            )}></Route>
            <Route exact path="/new/addnewpost" render={() => (
              <AddNewPost onAddNewPost={this.addNewPost}
                onSubmitEditPost={this.submitEditPost}
                categories={this.props.categories}
                post={this.props.post}
                header={this.props.header}
            />
            )}></Route>
            <Route exact path="/new/addnewcomment" render={() => (
              <AddNewComment post={this.props.post}
                comment={this.props.comment}
                header={this.props.header}
                onAddNewComment={this.addNewComment}
                onSubmitEditComment={this.submitEditComment}
                />
            )} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({header, categories, posts, comments, post, comment}) {
  return {
    header,
    categories,
    posts,
    post,
    comments,
    comment
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeHeader: (data) => dispatch(actions.changeHeader(data)),
    setCategories: () => dispatch(actions.setCategories()),
    setPosts: (sortVal, sortDir) => dispatch(actions.setPosts(sortVal, sortDir)),
    setCategoryPosts: (category, sortVal, sortDir) => dispatch(actions.setCategoryPosts(category, sortVal, sortDir)),
    setPost: (id) => dispatch(actions.setPost(id)),
    setComments: (postId) => dispatch(actions.setComments(postId)),
    setComment: (id) => dispatch(actions.setComment(id))

  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(App)
