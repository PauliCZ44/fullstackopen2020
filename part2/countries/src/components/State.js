import React from "react";

const State = (props) => {
  //console.log(props.state);
  let langs = props.state.languages.map((x) => <li key={x.name}>{x.name}</li>);
  return (
    <>
      <h2>{props.state.name}</h2>
      <p>Capital: {props.state.capital} </p>
      <p>Population: {props.state.population}</p>

      <h5>Languages</h5>
      <ul>{langs}</ul>
      <img
        src={props.state.flag}
        height="100px"
        alt={props.state.name + "Flag"}
      />
    </>
  );
};

export default State;
