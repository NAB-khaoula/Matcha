const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// TODO need to create a database and the tables if they don't exist

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)

app.get('/users/:id', db.getUserById);

app.post('/register', db.postUser);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
