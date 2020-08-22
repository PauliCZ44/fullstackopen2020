import axios from "axios"

const baseURL = "http://localhost:3001/persons"

const getAllContacts = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addNewContact = (newObject) => {
    const request = axios.post(baseURL, newObject)
    console.log("adding:", newObject)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(baseURL+"/"+id )
    return request
}

export default {getAllContacts, addNewContact, deleteContact}