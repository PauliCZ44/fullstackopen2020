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
    Part: {props.partName}, number of exerc.: {props.partEx}
  </p>
  )
}

const Content = (props) => {
  return (
  <Part partName={props.part.name} partEx={props.part.exercises}/>
    )
  }


const Total = (props) => {
  return (
    <p>Total number of exercises: {props.ex}</p>
    )
  }

  const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercises={part1} />
      <Content part={part2} exercises={part2} />
      <Content part={part3} exercises={part3} />

     <Total ex={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
/*
Completed PART1 exercises firt part
const Button = (props) => { 
  console.log("prop value is", props)
  const { onClick, text } = props

  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const History = (props) => {
    if (props.allClicks.length < 5) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
  
    return (
      <div>
        button press history: {props.allClicks.join(' x ')}
      </div>
    )
  }


  const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
  
    const handleLeftClick = () => {
      setAll(allClicks.concat('Left!'))
      setLeft(left + 1)
    }
  
    const handleRightClick = () => {
      setAll(allClicks.concat('Right!'))
      setRight(right + 1)
    }
  
    return (
      <div>
        <div>
          {left}
          <Button onClick={handleLeftClick} text='left' />
          <Button onClick={handleRightClick} text='right' />
          {right}
         <History allClicks={allClicks}/>
        </div>
      </div>
    )
  }
ReactDOM.render(<App />, document.getElementById('root'))
*/


/* Original code
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

*/

/*
//TEST CODE 
const Hellou = (props) => {
  return (
    <div>
      <p>Hellou world!!! :) its a me pa-ulí {props.name} and my age is {props.age} years </p>
    </div>
  )
}

const App2 = () => {
  console.log('Hello from component');
 // const now = new Date();  // <p>This is now: {now.toString()}</p>
  const age = 10;
  const name = "Peter"
  return (
  <>
    <h1>Hello </h1>

    <br />
    <h1>Greetings</h1>
    <Hellou name="Strenger" age={26+10} />
    <Hellou  name="Strenger XX" age={age} />
    <Hellou /> 
  </>
  )
}

*/  