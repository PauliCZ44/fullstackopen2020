import axios from "axios"

const baseURL = "/api/persons"

const getAllContacts = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addNewContact = (newObject) => {
    const request = axios.post(baseURL, newObject)
    //console.log("contacts.js - adding:", newObject)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(baseURL+"/"+id )
    console.log(id)
    console.log(request)
    return request.then(response => response)
}

const changeContact  = (id, newObject) => {
    const request = axios.put(baseURL+"/"+id, newObject )
    return request.then(response => response.data)
}

export default {getAllContacts, addNewContact, deleteContact, changeContact}