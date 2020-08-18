import React from 'react';
import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

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
  
  export default Course