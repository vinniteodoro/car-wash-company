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

app.post('/api/userType', (req, response) => {
  const email = req.body.email

  db.query('select type from users where email=?', [email], (err, res) => {
    if (err) {
      res.status(500).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      if (res.length > 0) {
        const userType = res[0].type
        response.status(200).send({userType})
      } else {
        response.status(404).send('Usuário não encontrado')
      }
    }
  })
})

app.post('/api/register', (req, res) => {
  const email = req.body.email
  const type = req.body.type
 
  db.query('INSERT INTO users (email, type) values (?, ?)', [email, type], (err) => {
    if (err) {
      res.status(500).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      res.status(200).end()
    }
  })
})

app.listen(3001, () => {
  console.log('Listening on port 3001')
})