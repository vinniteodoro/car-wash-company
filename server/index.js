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

app.get('/api/userType', (req, res) => {
  const validate = 'select type from users where email=?'
  const email = 'vinitbasilio@hotmail.com'

  db.query(validate, [email], (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

app.post('/api/register', (req, res) => {
  const email = req.body.email
  const type = req.body.type
  const errMessages = {
    'auth/missing-password': 'Insira uma senha',
    'auth/weak-password': 'Senha fraca, use outra',
    'auth/email-already-in-use': 'E-mail já cadastrado',
    'auth/missing-email': 'Preencha um e-mail',
    'auth/invalid-email': 'E-mail inválido',
  }
  

  const insert = 'INSERT INTO users (email, type) values (?, ?)'
  db.query(insert, [email, type], (err, result) => {
    if (err) {
      const errMessage = errMessages[err.code] || err.code
      res.status(500).send(errMessage)
      console.log(errMessage)
    } else {
      res.status(200)
    }
  })
})

app.listen(3001, () => {
  console.log('Listening on port 3001')
})