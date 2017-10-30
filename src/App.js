import _ from 'lodash'
import React, { Component } from 'react'
import Categories from './Categories'
import ContentSection from './ContentSection'
import AddNewPost from './AddNewPost'
import * as ReadablesAPI from './ReadablesAPI'
import { Route, Redirect } from 'react-router-dom'
import Post from './Post'
import './App.css'

const uuidv1 = require('uuid/v1')

class App extends Component {
  state = {
    header: 'Readables!',
    categories: [],
    posts: [],
    sortVal: 'voteScore',
    sortDir: 'desc',
    post: {},
    comments: []
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
    this.setState({post: this.state.posts.filter(p => p.id === id)})
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
    ReadablesAPI.addPost(id, timestamp, title, body, author, category).then(this.listPosts(header === 'Readables!' ? 'All' : header))
  }

  deletePost = (id) => {
    const {header} = this.state
    ReadablesAPI.deletePost(id).then(this.listPosts(header === 'Readables!' ? 'All' : header))
  }

  vote = (id, voteType) => {
    const {header} = this.state
    ReadablesAPI.postVote(id, voteType).then(() => this.listPosts(header === 'Readables!' ? 'All' : header))
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
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="jumbotron">
              <h1>{this.state.header}</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <Redirect exact from="/" exact to="/posts/all" />
            <Route exact path="/posts/:category" render={() => (
              <ContentSection posts={this.state.posts}
                onSortPosts={this.sortPosts}
                onVote={this.vote}
                onGetPostId={this.getPostId}
                onGetCommentsByPost={this.getCommentsByPost}
                onDeletePost={this.deletePost}
                onGetCommentCount={this.getCommentCount}
              />
            )}></Route>
            <Route exact path="/posts/:category" render={() => (
              <Categories
                header={this.state.header}
                onChangeHeader={this.changeHeader}
                categories={this.state.categories}
              />
            )}></Route>
          </div>
        </div>
        <Route exact path="/post/:id" render={() => (
          <Post post={this.state.post}
            comments={this.state.comments}
            onVote={this.vote}
            onDeletePost={this.deletePost}
          />
        )}></Route>
        <Route exact path="/addnewpost" render={() => (
          <AddNewPost onAddNewPost={this.addNewPost}
          categories={this.state.categories}/>
        )}></Route>
      </div>
    );
  }
}

export default App
