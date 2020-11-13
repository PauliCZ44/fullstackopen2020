import React from 'react'
import { connect } from 'react-redux'

import { addFilter } from  '../reducers/filterReducer'

const FilterForm = (props) => {


  const handleChange = (event) => {
    props.addFilter(event.target.value)
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

const mapDispatchToProps = {
  addFilter
}

const ConnectedFilterForm = connect(
  null,
  mapDispatchToProps
)(FilterForm)


export default ConnectedFilterForm