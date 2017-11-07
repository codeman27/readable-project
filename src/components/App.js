import _ from 'lodash'
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Categories from './Categories'
import ContentSection from './ContentSection'
import AddNewPost from './AddNewPost'
import Post from './Post'
import * as ReadablesAPI from './ReadablesAPI'
import AddNewComment from './AddNewComment'
import '../App.css'
import { changeHeader } from '../actions'

const uuidv1 = require('uuid/v1')

class App extends Component {
  state = {
    categories: [],
    posts: [],
    post: {},
    sortVal: 'voteScore',
    sortDir: 'desc',
    comments: [],
    comment: {}
  }

  clearPostValue = () => {
    this.setState({post: {}})
  }

  listPosts = (value) => {
    const {sortVal, sortDir} = this.state
    if(value === 'All'){
      ReadablesAPI.getPosts().then(posts => {
        this.setState({posts: _.orderBy(posts, sortVal, sortDir)})
      })
    } else {
      ReadablesAPI.getCategoryPosts(value.toLowerCase()).then(posts => {
        this.setState({posts: _.orderBy(posts, sortVal, sortDir)})
      })
    }
  }

  changeHeader = (value) => {
    this.setState({header: value === 'All' ? 'Readables!' : value})
    this.listPosts(value)
  }

  sortPosts = (value) => {
    const {sortVal, sortDir, header} = this.state
    if(value === 'Votes'){
      if(sortVal === 'voteScore'){
        this.setState({sortDir: sortDir ==='desc' ? 'asc' : 'desc'}, () => this.listPosts(header === 'Readables!' ? 'All' : header))
      } else {
        this.setState({sortVal: 'voteScore', sortDir: 'desc'}, () => this.listPosts(header === 'Readables!' ? 'All' : header))
      }
    } else {
        if(sortVal === 'timestamp'){
          this.setState({sortDir: sortDir ==='desc' ? 'asc' : 'desc'}, () => this.listPosts(header === 'Readables!' ? 'All' : header))
        } else {
          this.setState({sortVal: 'timestamp', sortDir: 'desc'}, () => this.listPosts(header === 'Readables!' ? 'All' : header))
        }
    }
  }

  getPostId = (id) => {
    ReadablesAPI.getPost(id).then(post => this.setState({post}))
  }

  getCommentId = (id) => {
    ReadablesAPI.getComment(id).then(comment => this.setState({comment}))
  }

  getCommentsByPost = (id) => {
    ReadablesAPI.getCommentsByPostId(id).then(comments => {
      return this.setState({comments})
    })
  }

  addNewPost = (title, body, author, category) => {
    const {header} = this.state
    const id = uuidv1()
    const timestamp = Date.now()
    ReadablesAPI.addPost(id, timestamp, title, body, author, category).then(() => this.listPosts(header === 'Readables!' ? 'All' : header))
  }

  addNewComment = (body, author, parentId) => {
    const { header } = this.state
    const id = uuidv1()
    const timestamp = Date.now()
    ReadablesAPI.addComment(id, timestamp, body, author, parentId).then(() => this.listPosts(header === 'Readables!' ? 'All' : header))
  }

  submitEditPost = (id, title, body) => {
    const {header} = this.state
    ReadablesAPI.editPost(id, title, body).then(() => this.listPosts(header === 'Readables!' ? 'All' : header))
  }

  submitEditComment = (id, body) => {
    const timestamp = Date.now()
    ReadablesAPI.editComment(id, timestamp, body)
  }

  deletePost = (id) => {
    const {header} = this.state
    ReadablesAPI.deletePost(id).then(() => this.listPosts(header === 'Readables!' ? 'All' : header))
  }

  deleteComment = (id, postId) => {
    const {header} = this.state
    ReadablesAPI.deleteComment(id).then(() => this.listPosts(header === 'Readables!' ? 'All' : header)).then(() => this.getCommentsByPost(postId))
  }

  votePost = (id, voteType) => {
    const {header} = this.state
    ReadablesAPI.postVote(id, voteType).then(() => this.listPosts(header === 'Readables!' ? 'All' : header)).then(() => this.getPostId(id))
  }

  voteComment = (id, voteType, postId) => {
    ReadablesAPI.postCommentVote(id, voteType).then(() => this.getCommentsByPost(postId))
  }

  componentDidMount() {
    const {sortVal, sortDir} = this.state
    ReadablesAPI.getCategories().then(categories => {
      this.setState({categories})
    })
    ReadablesAPI.getPosts().then(posts => {
      this.setState({posts: _.orderBy(posts, sortVal, sortDir)})
    })
  }

  render() {
    const {changeHeader} = this.props
    console.log(this.props)
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="jumbotron">
              <h1></h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <Route exact path="/" render={() => (
              <Redirect to="/posts/all" />
            )} />
            <Route exact path="/posts/:category" render={() => (
              <ContentSection posts={this.state.posts}
                onSortPosts={this.sortPosts}
                onVote={this.votePost}
                onGetPostId={this.getPostId}
                onGetCommentsByPost={this.getCommentsByPost}
                onDeletePost={this.deletePost}
                onClearPostValue={this.clearPostValue}
              />
            )}></Route>
            <Route exact path="/posts/:category" render={() => (
              <Categories
                header={this.props.header}
                onChangeHeader={changeHeader}
                categories={this.state.categories}
              />
            )}></Route>
          </div>
        </div>
        <Route exact path="/post/:id" render={() => (
          <Post post={this.state.post}
            comments={this.state.comments}
            header={this.state.header}
            onVote={this.votePost}
            onDeletePost={this.deletePost}
            onGetPostId={this.getPostId}
            onGetCommentId={this.getCommentId}
            onVoteComment={this.voteComment}
            onDeleteComment={this.deleteComment}
          />
        )}></Route>
        <Route exact path="/addnewpost" render={() => (
          <AddNewPost onAddNewPost={this.addNewPost}
            onSubmitEditPost={this.submitEditPost}
            categories={this.state.categories}
            post={this.state.post}
            header={this.state.header}
        />
        )}></Route>
        <Route exact path="/addnewcomment" render={() => (
          <AddNewComment post={this.state.post}
            header={this.state.header}
            comment={this.state.comment}
            onAddNewComment={this.addNewComment}
            onSubmitEditComment={this.submitEditComment}
            />
        )} />
      </div>
    );
  }
}

function mapStateToProps({header, categories}) {
  return {
    header,
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeHeader: (data) => dispatch(changeHeader(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
