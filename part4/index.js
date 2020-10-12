require('dotenv').config()            //export ENV library
const express = require('express')  //adding express

const app = express()                // create express aplication
const morgan = require('morgan')    //morgan logging api
const cors = require('cors')
const Person = require('./models/person')    //export module

app.use(cors())

app.use(express.json())                 //JSON parser - must be declared before all .get / .post etc.
app.use(express.static('build'))
//define my token for name and number logging
morgan.token('nameAndNumber', function (req) { return (
  JSON.stringify({
    name: req.body['name'],
    number: req.body['number']
  })
)})

app.use(morgan('tiny',  {  // output :method :url :status :res[content-length] - :response-time ms
  skip: function (req, res) { return res.statusCode === 201 }
}))


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :nameAndNumber',  {
  skip: function (req, res) { return res.statusCode !== 201 }
}))

let persons = []

//basic get command for simple route
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  //response.json(persons)
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/info', (req, res, next) => {
  const date = new Date()
  Person.count({})
    .then(result => {
      const status =  `<p>Phonebook has info about ${result} people<p>  <p>${date}<p>`
      res.send(status)
    })
    .catch(error => next(error))
  //change to  Person.count({})
})
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then( pers => {
      if (!pers) {
        response.status(404).end(`The id of "${id}" does not exists`)
      } else {
        response.json(pers)
      }
    })
    .catch(error => next(error))
  const id = request.params.id
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  console.log('id is', id)
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  })
    .catch(error => next(error))
  persons = persons.filter(p => p.id !== id)    // FILTER PERSONS BASED ON ID
  res.status(204).end()
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  // const newId = Math.floor(Math.random()*10000)
  // let nameAlreadyExist = persons.findIndex(p => p.name === request.body.name) //returns -1 if person is not found  //better code with .some

  if (persons.some(e => e.name === request.body.name)) {  //if in persons array is SOME (at least 1) name that is == to req.body.name then this is true
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }
  if (request.body.name === '' || request.body.number === '') {
    return response.status(400).json({
      error: 'Number and name should be included'
    })
  }

  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number
  })
  persons = persons.concat(newPerson)
  console.log('new array is',  newPerson)

  newPerson
    .save()
    .then(savedPerson =>  savedPerson.toJSON())  //response is made with only 1 person. Frontend will maek concat to persons array
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
