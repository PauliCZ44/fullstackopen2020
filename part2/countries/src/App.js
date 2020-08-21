import React, { useState, useEffect } from "react";
import axios from "axios";

import State from "./components/State";
import StateName from "./components/StateName";

const App = () => {
  const [states, setStates] = useState([]);
  const [filter, setFilter] = useState("");


  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setStates(response.data);
    });
  }, []);

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  let searchInString = (str, subStr) => {
    //console.log(str, subStr);
    if (str.indexOf(subStr) >= 0) {
      return true;
    } else {
      return false;
    }
  };
  let arrayOfShownStates = states
    .filter((x) => searchInString(x.name.toLowerCase(), filter.toLowerCase()))
    .map((x) => x);


  let myJSX;
  if (arrayOfShownStates.length > 10) {
    myJSX = <p>Too many matches, please specify your filter.</p>;
  } else if (arrayOfShownStates.length < 10 && arrayOfShownStates.length > 1) {
    myJSX = (
      <>
        <h4>Found this:</h4>
        <ul>
          {arrayOfShownStates.map((state, i) => (
            <StateName key={i} state={state} />
          ))}
        </ul>
      </>
    );
  } else if (arrayOfShownStates.length === 1) {
    myJSX = <State state={arrayOfShownStates[0]} />;
  } else if (arrayOfShownStates.length === 0) {
    myJSX = <p>No state found.</p>;
  }

  console.log("found:", arrayOfShownStates.length);

  return (
    <div>
      <h2>Country info</h2>
      <p>
        Search: <input onChange={handleChangeFilter} value={filter} />
      </p>
      {myJSX}
    </div>
  );
};

export default App;
