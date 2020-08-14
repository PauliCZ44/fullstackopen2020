import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = (props) => {
  return <button onClick={props.handleClick}> {props.text} </button>;
};

const App = (props) => {

  let rand = Math.floor(Math.random() * props.anecdotes.length);

  const [selected, setSelected] = useState(rand);
  const [mostVotedAnec, setmostVotedAnec] = useState(props.points)

 // mostVotedAnec = points.findIndex(e => e === Math.max(...points))

const addVote = (x) => {
  let newState = [...mostVotedAnec]
  newState[x] += 1 
  setmostVotedAnec(newState)
} 

let myMaxVotes = Math.max(...mostVotedAnec)
let myIndex = mostVotedAnec.findIndex(e => e === myMaxVotes)

console.log(myMaxVotes, myIndex)
  return (
    <>
      <h3>{props.anecdotes[selected]}</h3>
      <Button text={"vote"} handleClick= {() => addVote(selected)} />
      <Button
        text={"Next anecdote"}
        handleClick={() =>
          setSelected(Math.floor(Math.random() * props.anecdotes.length))
        }
      />
      <h2>Anecdote with most votes:</h2>
      <h3>{props.anecdotes[myIndex]}</h3>
      <p>Number of votes: {myMaxVotes}</p>
    </>
  );
};

const anecdotes = [
  "Help me",
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];
const points = Array(anecdotes.length).fill(0)  //creates empty array

ReactDOM.render(<App anecdotes={anecdotes} points={points}/>, document.getElementById("root"));
