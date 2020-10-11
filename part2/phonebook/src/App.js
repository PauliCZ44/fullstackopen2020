import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import contactService from "./services/contacts"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Add name here");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [messageIsError, setMessageIsError] = useState(false)

    
  useEffect(() => {
    console.log("effect")
    contactService.getAllContacts()
      .then((initialPersons) => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      });
  }, [])
  
  // Used just for logging the changes in persons
  useEffect(() => {
    console.log('Persons:', persons);
  }, [persons]);

  //console.log('render', persons.length, 'persons')

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

  const makeMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setMessageIsError(false)
    }, 2000)
  }
  const deleteContact = (id) => {
    let toBeDeletedPerson = persons.find(p => p.id === id).name
   // console.log("To be deleted",toBeDeletedPerson)
    if (window.confirm(`Do you really want to delete "${toBeDeletedPerson}" from your phonebook?`)) { 
      console.log("Deleted", toBeDeletedPerson, "id:", id)
      contactService.deleteContact(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        makeMessage(`"${toBeDeletedPerson}" was deleted from your phonebook`)
        setMessageIsError(true)
      })
      .catch(error => {
        makeMessage(`"${toBeDeletedPerson}" was ALREADY removed from SERVER`)
        setMessageIsError(true)
        setPersons(persons.filter(p => p.id !== id))
      })
      makeMessage(`"${toBeDeletedPerson}" was deleted from your phonebook`)
      setMessageIsError(true)
    } else {
      console.log("Not deleted")
    }

  }


  const addName = (e) => {
    e.preventDefault();
    //look at at the array of person and if there is not a name like newName then OK, else alert
    let newPerson = { name: newName, number: newNumber };
    let toBeChangedPerson = persons.find(p => p.name === newName)
    if (persons.filter((x) => x.name === newName).length > 0) {  //if person with same name is found
      if (window.confirm(`"${toBeChangedPerson.name}" is already added to your phnoebook, replace the old number with the new one?`)) {
      contactService.changeContact(toBeChangedPerson.id, newPerson) //this is in ex 3.17
      .then((response) => {
        setPersons(persons.map(x => x.id === toBeChangedPerson.id ? newPerson : x))
        setNewName("");
        setNewNumber("");
      })
      makeMessage(`"${toBeChangedPerson.name}" number was changed to "${newPerson.number}"`)
      }
    } else if (newPerson.name.length < 4) {
      console.log("Wrong data")
      setMessageIsError(true)
      makeMessage("Person name must be at least 3 characters long")    
    }  else if (newPerson.number.length < 9 ) {
      setMessageIsError(true)
      makeMessage("Number must be at least 8 characters long")    
    }
    else {
      console.log("person with same name not found")
      contactService
      .addNewContact(newPerson)
      .then( addedContact => {
        console.log("PersonArr", persons)
        console.log("NewPERSON", newPerson.name, newPerson.name.length < 4)
        console.log("adding:", persons.concat(addedContact) )
        setPersons(persons.concat(addedContact) );  //here should be persons.concat(addedContact)  ? from backend is send full array of persons! 
        setNewName("");
        setNewNumber("");
        makeMessage(`"${newPerson.name}" was added to your phonebook`)
      })
      .catch(error => {
        console.log(error.response.data)
        setMessageIsError(true)
        //makeMessage(`"${newPerson.name}" was NOT added to your phonebook`)
       makeMessage("NOT ADDED. Error: " + error.response.data.error)    
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
      <h3>Add a new:</h3>
      <PersonForm
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
        addName={addName}
      />

      <Persons list={personsList} />
      <Notification message={message} error={messageIsError}/>
    </div>
  );
};

export default App;
