import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

//unicafe

const Button = (props) => {
  return <button onClick={props.handleClick}> {props.text} </button>;
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td> {props.value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  let allFeedbacks = good + bad + neutral;
  let avgFeedback = (good - bad) / allFeedbacks;
  let positiveFeedbacks = (good / allFeedbacks) * 100 + " %";
  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <>
        <table>
          <tbody>
            <Statistic text={"Good: "} value={good} />
            <Statistic text={"Neutral: "} value={neutral} />
            <Statistic text={"Bad: "} value={bad} />
            <Statistic text={"All: "} value={allFeedbacks} />
            <Statistic text={"Average: "} value={avgFeedback} />
            <Statistic text={"Positive: "} value={positiveFeedbacks} />
          </tbody>
        </table>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h3>GIVE FEEDBACK</h3>
      <Button text={"Good"} handleClick={() => setGood(good + 1)} />
      <Button text={"Neutral"} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={"Bad"} handleClick={() => setBad(bad + 1)} />
      <h4>STATISTICS</h4>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
