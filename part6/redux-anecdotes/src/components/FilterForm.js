import React from 'react'
import { useDispatch } from 'react-redux'
import { addFilter } from  '../reducers/filterReducer'

const FilterForm = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(addFilter(event.target.value))
  }
  const style = {
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10
  }

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  )
}


export default FilterForm