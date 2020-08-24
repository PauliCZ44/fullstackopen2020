import React from 'react';

const Notification = ({ message }) => {
    if (message === null) {
      return null
    } else  {
      return (
        <div className="succes">
          {message}
        </div>
      )
    } 
  }

  export default Notification