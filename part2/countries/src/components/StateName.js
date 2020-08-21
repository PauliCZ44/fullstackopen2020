import React from "react";

const StateName = (props) => {
  return (
    <>
      <p>
        {props.state.name} <button onClick={props.handleClickShow}>show</button>
      </p>
    </>
  );
};

export default StateName;
