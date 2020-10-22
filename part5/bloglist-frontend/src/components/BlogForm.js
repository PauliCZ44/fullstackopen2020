import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
  const[title, setTitle] = useState('')
  const[author, setAuthor] = useState('')
  const[url, setUrl] = useState('')

  const handleAddBlog = async (e) => {
    e.preventDefault()
   
    const blogObject = {
      title,
      author,
      url
    }
    console.log(blogObject)
    let res = await blogService.create(blogObject)
    console.log(res)
    console.log("Deleting title auth and url")
    setTitle('')
    setAuthor('')
    setUrl('')
    props.setBlogs(props.blogs.concat(res))
  }  

 return (
  <div className="card px-3 mt-2 mb-5 addBlog-card hv-center shadow">
  <h3 className="text-center py-3">Add blog:</h3>
  <form>
  <div className="form-group row">
    <label  
      htmlFor="inputTitle" 
      className="col-sm-3 col-md-2 col-form-label font-weight-bold pl-sm-4">
        Title:
    </label>
    <div className="col-sm-9 col-md-10 pr-sm-4">
      <input 
        type="text" 
        className="form-control" 
        id="inputTitle" 
        placeholder="Enter title" 
        value={title}
        onChange = {({ target }) => setTitle(target.value)}
      />
    </div>
  </div>
  <div className="form-group row">
    <label 
      htmlFor="inputAuthor" 
      className="col-sm-3 col-md-2 col-form-label font-weight-bold  pl-sm-4" >
      Author:
    </label>
    <div className="col-sm-9 col-md-10 pr-sm-4">
      <input 
        type="text" 
        className="form-control" 
        id="inputAuthor" 
        placeholder="Enter author"
        value={author}
        onChange = {({ target }) => setAuthor(target.value)}
      />
    </div>
  </div>
  <div className="form-group row">
    <label 
      htmlFor="inputAuthor"
     className="col-sm-3 col-md-2 col-form-label font-weight-bold  pl-sm-4">
      URL:
    </label>
    <div className="col-sm-9 col-md-10 pr-sm-4">
      <input 
        type="text" 
        className="form-control" 
        id="inputAuthor"
        placeholder="Enter URL"
        value={url}
        onChange = {({ target }) => setUrl(target.value)}
      />
    </div>
  </div>
  <div className="form-group row">
    <div className="col-sm-10">
      <button 
      type="submit" 
      className="btn btn-info px-5 save-btn"
      onClick={handleAddBlog}>
        Save 
      </button>
    </div>
  </div>
</form>
</div>
)
      
}

export default BlogForm