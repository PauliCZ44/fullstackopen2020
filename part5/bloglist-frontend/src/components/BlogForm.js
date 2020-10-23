import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
  const[title, setTitle] = useState('')
  const[author, setAuthor] = useState('')
  const[url, setUrl] = useState('')
  const[isNotFilled, setIsNotFilled] = useState([false, false, false])

 
  let styleFilledT = isNotFilled[0] ? 'form-control notFilledForm' : 'form-control'
  let styleFilledA = isNotFilled[1] ? 'form-control notFilledForm' : 'form-control'
  let styleFilledU = isNotFilled[2] ? 'form-control notFilledForm' : 'form-control'

  const handleAddBlog = async (e) => {
    e.preventDefault()
    if (title === '') {
      props.makeMessage(`Please fill in the Title`, true)
      setIsNotFilled([true, false, false])
      return
    } else if (author === '') {
      props.makeMessage(`Please fill in the Author`, true)
      setIsNotFilled([false, true, false])
      return
    } else if (url === '') {
      props.makeMessage(`Please fill in the URL`, true)
      setIsNotFilled([false, false, true])
      return
    }
    
    const blogObject = {
      title,
      author,
      url
    }
    console.log(blogObject)
    let res = await blogService.create(blogObject)
    props.makeMessage(`Blog "${title}" was added`)
    setTitle('')
    setAuthor('')
    setUrl('')
    setIsNotFilled(false, false, false)
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
        Title*:
    </label>
    <div className="col-sm-9 col-md-10 pr-sm-4">
      <input 
        type="text" 
        className= {styleFilledT}
        id="inputTitle" 
        placeholder="Enter title" 
        value={title}
        onChange = {({ target }) => setTitle(target.value)}
        required
      />
    </div>
  </div>
  <div className="form-group row">
    <label 
      htmlFor="inputAuthor" 
      className="col-sm-3 col-md-2 col-form-label font-weight-bold  pl-sm-4" >
      Author*:
    </label>
    <div className="col-sm-9 col-md-10 pr-sm-4">
      <input 
        type="text" 
        className= {styleFilledA}
        id="inputAuthor" 
        placeholder="Enter author"
        value={author}
        onChange = {({ target }) => setAuthor(target.value)}
        required
      />
    </div>
  </div>
  <div className="form-group row">
    <label 
      htmlFor="inputAuthor"
     className="col-sm-3 col-md-2 col-form-label font-weight-bold  pl-sm-4">
      URL*:
    </label>
    <div className="col-sm-9 col-md-10 pr-sm-4">
      <input 
        type="text" 
        className= {styleFilledU}
        id="inputAuthor"
        placeholder="Enter URL"
        value={url}
        onChange = {({ target }) => setUrl(target.value)}
        required
      />
      <small id="help" className="form-text text-muted">* must be provided</small>

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