import React from 'react'


const Part = (props) => {
    return (
      <p>
        {props.partName},  ex.: {props.partEx}
    </p>
    )
  }


const Content = (props) => {

return (
    <>
    {props.parts.map(part => 
        <Part key={part.id} partName={part.name} partEx={part.exercises}/>   //rendering parts with .map function. for every part I pass name and number of exercies as a prop to <Part/> component
        )}
    </>
    )
}



export default Content