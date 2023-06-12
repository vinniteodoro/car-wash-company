const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} = require('amazon-cognito-identity-js')

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

const poolData = {
  UserPoolId: 'sa-east-1_O8P3VLLQ6',
  ClientId: '42p3dha5fp5rc8a2t300fvf2ov'
}

const userPool = new CognitoUserPool(poolData)

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/name', (req, res) => {
  const email = req.body.email

  db.query('select name from users where email=?', [email], (error, result) => {
    if (error) {
      res.status(500).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      if (result.length > 0) {
        const userName = result[0].name
        res.status(200).send({userName})
      } else {
        res.status(400).send('Usuário não encontrado')
      }
    }
  })
})

app.post('/api/Login', (req, res) => {
  const {email, password} = req.body
  const userData = {Username: email, Pool: userPool}
  const cognitoUser = new CognitoUser(userData)
  const authData = {Username: email, Password: password}
  const authDetails = new AuthenticationDetails(authData)

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: function() {
      db.query('select type from users where email=?', [email], (err, result) => {
        if (err) {
          res.status(500).send('Falha ao conectar com o servidor, tente novamente')
        } else {
          if (result.length > 0) {
            const userType = result[0].type
            res.status(200).send({userType})
          } else {
            res.status(400).send('Falha ao conectar com o servidor, tente novamente')
          }
        }
      })
    },
    onFailure: function(error) {
      if ((error.message.toLowerCase()).includes('incorrect username or password')) {
        res.status(400).send('E-mail ou senha incorretos')
      } else if ((error.message.toLowerCase()).includes('missing required parameter username')) {
        res.status(400).send('Preencha o email')
      } else {
        res.status(500).send('Falha ao realizar login, tente novamente')
      }
    }
  })
})

app.post('/api/confirmRegistration', (req, res) => {
  const {email, code} = req.body
  const userData = {Username: email, Pool: userPool}
  const cognitoUser = new CognitoUser(userData)

  cognitoUser.confirmRegistration(code, true, (error) => {
    if (error) {
      if ((error.message.toLowerCase()).includes('invalid verification code provided')) {
        res.status(400).send('Código inválido')
      } else {
        res.status(500).send('Falha ao verificar seu código, tente novamente')
      }
    } else {
      res.status(200).end()
    }
  })
})

app.post('/api/resendConfirmCode', (req, res) => {
  const email = req.body.email
  const userData = {Username: email, Pool: userPool}
  const cognitoUser = new CognitoUser(userData)

  cognitoUser.resendConfirmationCode((error) => {
    if (error) {
      res.status(400).send('Falha ao reenviar o código, tente novamente')
    } else {
      res.status(200).end()
    }
  })
})

app.post('/api/register', (req, res) => {
  const {email, password, confirmPassword, type} = req.body

  if (password===confirmPassword) {
    if (type=='') {
      res.status(400).send('Escolha uma das opções')
    } else {
      userPool.signUp(email, password, [], null, (error) => {
        if (error) {
          if ((error.message.toLowerCase()).includes('password')) {
            res.status(400).send('Senha inválida\nEla deve ter no mínimo 6 caracteres, um número, uma letra e maiúscula e outra letra minúscula')
          } else if ((error.message.toLowerCase()).includes('username should be an email')) {
            res.status(400).send('E-mail inválido')
          } else if ((error.message.toLowerCase()).includes('given email already exists')) {
            res.status(400).send('E-mail já cadastrado')
          } else if ((error.message.toLowerCase()).includes("'username' failed to satisfy constraint")) {
            res.status(400).send('E-mail inválido')
          } else {
            res.status(500).send('Falha ao conectar com o servidor, tente novamente')
          }
        } else {
          db.query('INSERT INTO users (email, type) values (?, ?)', [email, type], (error) => {
            if (error) {
              res.status(500).send('Falha ao conectar com o servidor, tente novamente')
            } else {
              res.status(200).end()
            }
          })
        }
      })
    }
  } else {
    res.status(400).send('As senhas não são iguais')
  }
})

app.listen(3001, () => {
  console.log('Listening on port 3001')
})