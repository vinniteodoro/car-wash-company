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
  const email = 'vinitbasilio@hotmail.com'

  db.query('select type from users where email=?', [email], (err, result) => {
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
  
  db.query('INSERT INTO users (email, type) values (?, ?)', [email, type], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).send('E-mail já cadastrado')
      } else if (err.code === 'ER_BAD_NULL_ERROR') {
        res.status(400).send('Preencha os campos')
      } else {
        res.status(500).send('Falha ao conectar com o servidor, tente novamente')
      }
    } else {
      res.status(200).send(result)
    }
  })
})

app.listen(3001, () => {
  console.log('Listening on port 3001')
})