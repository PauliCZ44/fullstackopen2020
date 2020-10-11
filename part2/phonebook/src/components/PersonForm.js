import React from 'react';

const PersonsForm = ({newName,handleChangeName, newNumber, handleChangeNumber, addName }) => {
    
    return (
        <form>
        <div>
          Name: <input value={newName} placeholder="add new name" onChange={handleChangeName} minLength="3"/>
        </div>
        <div>
          Number: <input value={newNumber} placeholder="add number" onChange={handleChangeNumber} minLength="8"/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
        </form>
        )
}


export default PersonsForm