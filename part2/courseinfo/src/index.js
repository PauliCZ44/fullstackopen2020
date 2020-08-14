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
        <Part key={part.id} partName={part.name} partEx={part.exercises}/>   //renrering parts with .map function. for every part I pass name and number of exercies as a prop to <Part/> component
        )}
    </>
    )
  }


const Total = (props) => {
  let totalEx =  props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <p>Total number of exercises: {totalEx}</p>
    )
  }

const Course = ({course}) => {
 // console.log(course)
  return (
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
    ]
  }

  return <Course course={course} />
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