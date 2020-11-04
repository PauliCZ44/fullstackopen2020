import React, { useState } from 'react'


const BlogForm = ({ makeMessage, blogServiceCreate, blogServiceGetOne, toggleAddNewBlog, setBlogs, blogs, username }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isNotFilled, setIsNotFilled] = useState([false, false, false])

  let styleFilledT = isNotFilled[0]
    ? 'form-control notFilledForm'
    : 'form-control'
  let styleFilledA = isNotFilled[1]
    ? 'form-control notFilledForm'
    : 'form-control'
  let styleFilledU = isNotFilled[2]
    ? 'form-control notFilledForm'
    : 'form-control'

  const handleAddBlog = async (e) => {
    e.preventDefault()
    if (title === '') {
      makeMessage('Please fill in the Title', true)
      setIsNotFilled([true, false, false])
      return
    } else if (author === '') {
      makeMessage('Please fill in the Author', true)
      setIsNotFilled([false, true, false])
      return
    } else if (url === '') {
      makeMessage('Please fill in the URL', true)
      setIsNotFilled([false, false, true])
      return
    }

    let blogObject = {
      title,
      author,
      url,
    }
    //console.log(blogObject)
    try {

      let res = await blogServiceCreate(blogObject)
      if (res) {
        makeMessage(`Blog "${title}" was added`)
        setTitle('')
        setAuthor('')
        setUrl('')
        setIsNotFilled(false, false, false)
        toggleAddNewBlog()
        //console.log('response after create:', res)
        let newBlog = await blogServiceGetOne(res)
        console.log('NewBlog', newBlog)
        delete newBlog.user
        newBlog.user = { username: username }
        setBlogs(blogs.concat(newBlog))
      }
    } catch (error) {
      makeMessage('ERROR - Blog was not added', true)
      console.log('error::', error)
    }
  }

  return (
    <div className="card px-3 mt-2 mb-5 addBlog-card hv-center shadow-lg addBlog-panel">
      <h3 className="text-center py-3">Add blog:</h3>
      <form onSubmit={handleAddBlog}>
        <div className="form-group row">
          <label
            htmlFor="inputTitle"
            className="col-sm-3 col-md-2 col-form-label font-weight-bold pl-sm-4"
          >
            Title*:
          </label>
          <div className="col-sm-9 col-md-10 pr-sm-4">
            <input
              type="text"
              className={styleFilledT}
              id="inputTitle"
              placeholder="Enter title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputAuthor"
            className="col-sm-3 col-md-2 col-form-label font-weight-bold  pl-sm-4"
          >
            Author*:
          </label>
          <div className="col-sm-9 col-md-10 pr-sm-4">
            <input
              type="text"
              className={styleFilledA}
              id="inputAuthor"
              placeholder="Enter author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputURL"
            className="col-sm-3 col-md-2 col-form-label font-weight-bold  pl-sm-4"
          >
            URL*:
          </label>
          <div className="col-sm-9 col-md-10 pr-sm-4">
            <input
              type="text"
              className={styleFilledU}
              id="inputURL"
              placeholder="Enter URL"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <small id="help" className="form-text text-muted">
              * must be provided
            </small>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              id = 'saveBlogBtn'
              type="submit"
              className="btn btn-info px-5 save-btn mr-4 mb-2"
              onClick={handleAddBlog}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger px-5 cancel-btn mb-2 "
              onClick={toggleAddNewBlog}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
