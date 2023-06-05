const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/register', (req, res) => {
  const email = req.body.email
  const type = req.body.type

  const insert = 'INSERT INTO users (email, type) values (?, ?)'
  db.query(insert, [email, type], (err, result) => {
    console.log(result)
  })
})

app.listen(3001, () => {
  console.log('Listening on port 3001')
})