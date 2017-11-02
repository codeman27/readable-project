const api = 'http://localhost:3001'

const headers = {
  'Authorization': 'whatever-I-want'
}
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
  .then(results => results.json())
  .then(data => data.categories)

export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
  .then(results => results.json())
  .then(data => data)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
  .then(results => results.json())
  .then(data => data)

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
  .then(results => results.json())
  .then(data => data)

export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
  .then(results => results.json())
  .then(data => data)

export const getCommentsByPostId = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
  .then(results => results.json())
  .then(data => data)

export const editPost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body
    })
  }).then(res => res.json())

export const editComment = (id, timestamp, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      timestamp,
      body
    })
  }).then(res => res.json())

export const addPost = (id, timestamp, title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      timestamp,
      title,
      body,
      author,
      category
    })
  }).then(res => res.json())

export const addComment = (id, timestamp, body, author, parentId) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      timestamp,
      body,
      author,
      parentId
    })
  }).then(res => res.json())

export const postVote = (id, voteType) =>
  fetch(`${api}/posts/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ option: voteType })
}).then(res => res.json())

export const postCommentVote = (id, voteType) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: voteType})
  }).then(res => res.json)

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
