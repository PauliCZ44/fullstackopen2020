import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' },
    { name: 'Arto Pavel' }
  ]) 
  const [ newName, setNewName ] = useState('Add name here')
  
  const handleChange = (e) => {
      console.log(e.target.value)
      setNewName(e.target.value)
  }

  const addName = (e) => {
    e.preventDefault()
    //loo at at the array of person and if there is not a name like newName then OK, else alert
    let newPerson = {name: newName}
    if (persons.filter(x => x.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)   //alt 96  or alt+``
    } else {
    setPersons(persons.concat(newPerson));
    console.log("Person", persons)
    setNewName("")
  }
  }
let personsList = persons.map(x => <li key={x.name}>{x.name}</li>)
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} placeholder="add new name" onChange={handleChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numberss</h2>
      <div>{personsList}</div>
      <p>debug newName</p>
      <div>{newName}</div>
    </div>
  )
}

export default App