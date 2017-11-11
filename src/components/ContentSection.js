import React, { Component } from 'react'
import Posts from './Posts'

class ContentSection extends Component {
  state = {
    sortSelected: 'Votes'
  }

  setActiveSort(value) {
    this.setState({sortSelected: value})
    this.props.onSortPosts(value)
  }

  isSortActive(value) {
    return 'btn btn-primary sort-item ' + (value === this.state.sortSelected ? 'active' : 'default')
  }

  render() {
    return (
      <div>
        <div className="col-xs-8">
          <ul className="list-inline nav nav-tabs">
            <li><a className={this.isSortActive('Votes')} onClick={ () => { this.setActiveSort('Votes')}}>Votes</a></li>
            <li><a className={this.isSortActive('Timestamp')} onClick={ () => { this.setActiveSort('Timestamp')}}>Timestamp</a></li>
          </ul>
            <Posts posts={this.props.posts}
            onVote={this.props.onVote}
            onGetPostId={this.props.onGetPostId}
            onGetCommentsByPost={this.props.onGetCommentsByPost}
            onDeletePost={this.props.onDeletePost}
          />
        </div>
      </div>
    )
  }
}

export default ContentSection
