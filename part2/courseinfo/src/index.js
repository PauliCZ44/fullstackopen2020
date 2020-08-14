import React from 'react'
import ReactDOM from 'react-dom'
import "./index.css"

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
    )
  }

const Part = (props) => {
  return (
    <p>
      {props.partName},  ex.: {props.partEx}
  </p>
  )
}

/*
  <Part partName={props.parts[0].name} partEx={props.parts[0].exercises}/>
  <Part partName={props.parts[1].name} partEx={props.parts[1].exercises}/>
  <Part partName={props.parts[2].name} partEx={props.parts[2].exercises}/>*/

const Content = (props) => {

  return (
    <>
      {props.parts.map(part => 
        <Part key={part.id} partName={part.name} partEx={part.exercises}/>   //rendering parts with .map function. for every part I pass name and number of exercies as a prop to <Part/> component
        )}
    </>
    )
  }


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

const Course = ({courses}) => {
  console.log(courses)
  return (
    <>
    {courses.map(x =>  /* Adding courses with .map funcion and giving div lement an ID */
      <div key={x.id}>    
      <Header course={x.name}  />
      <Content parts={x.parts} />
      <Total parts={x.parts} />
      </div>
      )}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}
 /* const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}*/

ReactDOM.render(<App />, document.getElementById('root'))