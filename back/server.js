const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const setupDatabase = require('./setup');
const createTables = require('./createTables');
require('dotenv').config();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)

app.get('/users/:id', db.getUserById);

app.post('/register', db.postUser);

app.listen(port, async () => {
  await setupDatabase();
  await createTables();
    console.log(`App running on port ${port}.`)
})
