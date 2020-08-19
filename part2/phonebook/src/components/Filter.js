import React from 'react';

const Filter = (props) => {
    console.log(props, "props in filer")
    return (
        <div>
        Filter by name: <input value={props.filterName} placeholder="Filter..." onChange={props.handleChangeFilter}/>
        </div>
        )
}


export default Filter