import React from 'react'


const Total = (props) => {
    //let totalEx =  props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    // instead of adding numbers by hard, sum them dynamically with reduce (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
    let totalEx2 = props.parts.reduce(function (accumulator, currentValue) {
     // console.log('what is happening', accumulator, currentValue)
      return accumulator + currentValue.exercises
  }, 0)
    return (
      <p>Total number of exercises: {totalEx2}</p>
      )
    }
  

export default Total