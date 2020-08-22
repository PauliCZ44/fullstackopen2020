import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import axios from "axios";
import contactService from "./services/contacts"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Add name here");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

    
  useEffect(() => {
    console.log("effect")
    contactService.getAllContacts()
      .then((initialPersons) => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      });
  }, [])
  
  console.log('render', persons.length, 'persons')

  const handleChangeFilter = (e) => {
    //console.log(e.target.value)
    setFilterName(e.target.value);
  };
  const handleChangeName = (e) => {
    //console.log(e.target.value)
    setNewName(e.target.value);
  };
  const handleChangeNumber = (e) => {
    //console.log(e.target.value)
    setNewNumber(e.target.value);
  };
  const deleteContact = (id) => {
    console.log("Delete", id)
    contactService.deleteContact(id)
    setPersons(persons.filter(p => p.id !== id))
  }


  const addName = (e) => {
    e.preventDefault();
    //look at at the array of person and if there is not a name like newName then OK, else alert
    let newPerson = { name: newName, number: newNumber };
    if (persons.filter((x) => x.name === newName).length > 0) {  //if person wit same name is found
      alert(`${newName} is already added to phonebook`); //alt 96  or alt+``
    } else {
      contactService.addNewContact(newPerson).then( addedContact => {
        setPersons(persons.concat(addedContact));
        setNewName("");
        setNewNumber("");
      })
    }
  };

  let searchInString = (str, subStr) => {
    //console.log(str, subStr)
    if (str.indexOf(subStr) >= 0) {
      return true;
    } else {
      return false;
    }
  };
  //console.log(searchInString(persons[0].name.toLowerCase(), filterName.toLowerCase()))
  let personsList = [];
  if (filterName !== "") {
    //když je filtr zaplý
    console.log("FilterOn");
    // console.log(persons.filter( x => searchInString(x.name.toLowerCase(), filterName.toLowerCase())))
    personsList = persons
      .filter((x) =>
        searchInString(x.name.toLowerCase(), filterName.toLowerCase())
      )
      .map((x) => (
        <li key={x.name}>
          {x.name} {x.number} <button onClick={() => deleteContact(x.id)}> Delete </button>
        </li>
      ));
  } else {
    //console.log("Filter OFF")
    personsList = persons.map((x) => (
      <li key={x.name}>
        {x.name} {x.number} <button onClick={() => deleteContact(x.id)}> Delete </button>
      </li>
    ));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChangeFilter={handleChangeFilter} filterName={filterName} />

      <PersonForm
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
        addName={addName}
      />

      <Persons list={personsList} />
    </div>
  );
};

export default App;
