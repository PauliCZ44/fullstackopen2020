import React from 'react';

const Notification = ({ message, error }) => {
    const succesStyle = {
      color: "green"
    }
    const errorStyle = {
      color: "red"
    }

    if (message === null) {
      return null
    } else  {
      return (
        <div className="succes" style={error ? errorStyle : succesStyle}>
          {message}
        </div>
      )
    } 
  }

  export default Notification