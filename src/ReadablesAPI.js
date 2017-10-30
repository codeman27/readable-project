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

export const getCommentsByPostId = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
  .then(results => results.json())
  .then(data => data)

export const postVote = (id, voteType) =>
  fetch(`${api}/posts/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ option: voteType })
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

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
