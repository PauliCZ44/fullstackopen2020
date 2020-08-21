import React from "react";

const StateName = (props) => {
  return (
    <>
      <p>
        {props.state.name} <button>show</button>
      </p>
    </>
  );
};

export default StateName;
