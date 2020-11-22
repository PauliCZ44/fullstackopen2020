//ACTIONS: export const  SOMEACTION(params) => {return}
// Action return type of action, and payload
// Actual REDUCER
// const reducer - returns state
import blogService from '../services/blogs'

const blogsAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (blog) => {
  return {
    content: blog,
    url: 'action.data.url',
    author: 'action.data.author',
    id: getId(),
    votes: 0
  }
}

const initialBlogs = blogsAtStart.map(asObject).sort((a, b) => b.votes - a.votes)

const initialState = {
  blogs: [...initialBlogs
  ],
  /*notification: {
    message: '-',
    error: false
  },
  users: [],
  loggedUser: 'nameOfLoggedUser'*/
}

const blogReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {

  case 'INITIALIZE': {
    return { ...state, blogs: [...action.blogs] }
  }

  case 'CREATE': {
    const blogToAdd = {
      title: action.data.title,
      url: action.data.url,
      author: action.data.author,
      id: action.data.id,
      likes: 0,
      user: { username: action.username }
    }
    return { ...state, blogs: state.blogs.concat(blogToAdd) }
  }

  case 'LIKE': {
    const blogToLike = state.blogs.find(b => b.id === action.id)
    // console.log(blogToLike)
    blogToLike.likes += 1
    return { ...state, blogs: [...state.blogs.map(blog => blog.id === action.id ? blogToLike : blog).sort((a, b) => b.likes-a.likes)] }  // projdi state a  pokud najdes anecdote se stejným ID tak ji nahraď anecToChange jinak vlož původní anecdote
    //find anecdotes by id nd increase vote by 1
  }

  case 'DELETE': {
    console.log('DELeTE ACTION', action)
    return { ...state, blogs: [...state.blogs.filter(blog => blog.id !== action.id)] }
  }

  default: return state
  }
}

export const initBlogs = () => {
  return async (dispatch) =>  {
    const blogs = await blogService.getAll()  //thanks to redux-thunk, function can be used in action creator as a return value of action creator
    dispatch({
      type: 'INITIALIZE',
      blogs: blogs
    })
  }
}

export const createBlog = (content, username) => {
  console.log('CREATE')
  return async (dispatch) => {
    const result = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: result,
      username: username
    })
    console.log(result,'result from reducer')
    return result
  }
}

export const likeBlog = (blogToLike) => {
  console.log('LIKE BLOG ACTION')
  return async (dispatch) => {
    dispatch({
      type: 'LIKE',
      id: blogToLike.id
    })
    await blogService.put(blogToLike)
  }
}

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    const result = await blogService.deleteBlog(blogToDelete)
    dispatch({
      type: 'DELETE',
      id: blogToDelete.id
    })
    console.log(blogToDelete.id,'result from reducer deleting')
    return result
  }
}
export default blogReducer
