const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const {CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails} = require('amazon-cognito-identity-js')

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

const poolData = {
  UserPoolId: process.env.COG_USERPOOLID,
  ClientId: process.env.COG_CLIENTID
}

const userPool = new CognitoUserPool(poolData)
var cognitoUser

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/insertVehicle', async (req, res) => {
  const {email, brand, color, model, plate, type, year, body} = req.body

  db.query(
    'insert into vehicles (email, brand, color, model, plate, type, year, body) values (?, ?, ?, ?, ?, ?, ?, ?)', 
    [email, brand, color, model, plate, type, year, body], 
    (error) => {
      if (error) {
        console.error(error)
        res.status(400).send('Falha ao conectar com o servidor, tente novamente')
      } else {
        res.status(200).end()
      }
    }
  )
})

app.post('/api/updateVehicle', async (req, res) => {
  const {id, brand, color, model, type, year, body, plate} = req.body

  db.query('update vehicles set brand=?, color=?, model=?, type=?, year=?, body=?, plate=? where id=?', [brand, color, model, type, year, body, plate, id], (error) => {
    if (error) {
      console.error(error)
      res.status(400).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      res.status(200).end()
    }
  })
})

app.post('/api/checkVehicles', async (req, res) => {
  const {email, plate} = req.body
  var isUsed = false

  const getVehicles = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM vehicles WHERE email=?', [email], (error, result) => {
        if (error) {
          reject('Falha ao conectar com o servidor, tente novamente')
          res.status(400).send('Falha ao conectar com o servidor, tente novamente')
        } else {
          result.forEach((row) => {
            if ((row.plate).toLowerCase() === plate.toLowerCase()) {
              isUsed = true
            } 
          }) 
          resolve()
        }
      })
    })
  }
  await getVehicles()
  res.status(200).send({isUsed})
})

app.post('/api/deleteVehicle', async (req, res) => {
  const id = req.body.id

  db.query('delete FROM vehicles WHERE id=?', [id], (error) => {
    if (error) {
      console.error(error)
      res.status(400).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      res.status(200).end()
    }
  })
})

app.post('/api/getVehicles', async (req, res) => {
  const email = req.body.email
  const vehiclesArray = []

  const getVehicles = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM vehicles WHERE email=?', [email], (error, result) => {
        if (error) {
          reject('Falha ao conectar com o servidor, tente novamente')
          res.status(400).send('Falha ao conectar com o servidor, tente novamente')
        } else {
          result.forEach((row) => {
            const vehicleData = {
              id: row.id,
              email: row.email,
              brand: row.brand,
              color: row.color,
              model: row.model,
              plate: row.plate,
              type: row.type,
              year: row.year,
              body: row.body
            }
            vehiclesArray.push(vehicleData)
          }) 
          resolve()
        }
      })
    })
  }
  await getVehicles()
  res.status(200).send({vehiclesArray})
})

app.post('/api/checkAddresses', async (req, res) => {
  const {email, street, number, complement} = req.body
  var isUsed = false

  const getAddressess = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM addresses WHERE email=?', [email], (error, result) => {
        if (error) {
          reject('Falha ao conectar com o servidor, tente novamente')
          res.status(400).send('Falha ao conectar com o servidor, tente novamente')
        } else {
          result.forEach((row) => {
            if (row.street === street && row.number == number && (row.complement).toLowerCase() === complement.toLowerCase()) {
              isUsed = true
            } 
          }) 
          resolve()
        }
      })
    })
  }
  await getAddressess()
  res.status(200).send({isUsed})
})

app.post('/api/updateAddress', async (req, res) => {
  const {id, number, complement} = req.body

  db.query('update addresses set number=?, complement=? where id=?', [number, complement, id], (error) => {
    if (error) {
      console.error(error)
      res.status(400).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      res.status(200).end()
    }
  })
})

app.post('/api/insertAddress', async (req, res) => {
  const {email, zipcode, state, city, neighborhood, street, number, complement} = req.body

  db.query(
    'insert into addresses (email, zipcode, state, city, neighborhood, street, number, complement) values (?, ?, ?, ?, ?, ?, ?, ?)', 
    [email, zipcode, state, city, neighborhood, street, number, complement], 
    (error) => {
      if (error) {
        console.error(error)
        res.status(400).send('Falha ao conectar com o servidor, tente novamente')
      } else {
        res.status(200).end()
      }
    }
  )
})

app.post('/api/deleteAddress', async (req, res) => {
  const id = req.body.id

  db.query('delete FROM addresses WHERE id=?', [id], (error) => {
    if (error) {
      console.error(error)
      res.status(400).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      res.status(200).end()
    }
  })
})

app.post('/api/getAddresses', async (req, res) => {
  const email = req.body.email
  const addressesArray  = []

  const getAddressess = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM addresses WHERE email=?', [email], (error, result) => {
        if (error) {
          reject('Falha ao conectar com o servidor, tente novamente')
          res.status(400).send('Falha ao conectar com o servidor, tente novamente')
        } else {
          result.forEach((row) => {
            const addressData = {
              id: row.id,
              email: row.email,
              neighborhood: row.neighborhood,
              zipcode: row.zipcode,
              city: row.zipcode,
              complement: row.complement,
              state: row.state,
              street: row.street,
              number: row.number
            }
            addressesArray.push(addressData)
          }) 
          resolve()
        }
      })
    })
  }
  await getAddressess()
  res.status(200).send({addressesArray})
})

app.post('/api/changeUserInfo', async (req, res) => {
  const {name, cpfCnpj, mobile, email} = req.body

  db.query('update users set name=?, cpfCnpj=?, mobile=? where email=?', [name, cpfCnpj, mobile, email], (error) => {
    if (error) {
      res.status(400).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      res.status(200).end()
    }
  })
})

app.post('/api/isVerified', async (req, res) => {
  const email = req.body.email

  cognitoUser.getSession(async (err) => {
    if (err) {
      console.error(err)
      res.status(400).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          console.error(err)
          res.status(400).send('Falha ao conectar com o servidor, tente novamente')
        } else {
          for (let attribute of attributes) {
            if (attribute.getName() === 'email_verified') {
              var isEmailVerified = attribute.getValue()
              break
            }  
          }
          res.status(200).send({isEmailVerified})
        }
      })
    }
  })
})

app.post('/api/sendTicket', async (req, res) => {
  const {email, category, message} = req.body
  const maxCaracters = 9999999
  var randomNumber = String(Math.floor(Math.random() * (maxCaracters + 1))).padStart(6, '0')

  const checkAvailability = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id FROM tickets WHERE id=?', [randomNumber], (error, result) => {
        if (error) {
          reject('Falha ao conectar com o servidor, tente novamente')
        } else {
          if (result.length > 0) {
            randomNumber = String(Math.floor(Math.random() * (maxCaracters + 1))).padStart(6, '0')
            resolve(checkAvailability())
          } else {
            resolve()
          }
        }
      })
    })
  }

  if (category==='' || message==='') {
    res.status(400).send('Escolha uma categoria e digite uma mensagem')
  } else {
    await checkAvailability()
    db.query('INSERT INTO tickets (id, email, category, message, status) values (?, ?, ?, ?, ?)', [randomNumber, email, category, message, 'Aberto'], (error) => {
      if (error) {
        res.status(500).send('Falha ao conectar com o servidor, tente novamente')
      } else {
        res.status(200).send({randomNumber})
      }
    })
  }
})

app.post('/api/resetPassword', (req, res) => {
  const email = req.body.email
  const userData = {Username: email, Pool: userPool}
  const user = new CognitoUser(userData)

  user.forgotPassword({
    onSuccess: function() {
      res.status(200).end()
    },
    onFailure: function(error) {
      if ((error.message.toLowerCase()).includes("'username' failed to satisfy constraint")) {
        res.status(400).send('E-mail inválido')
      } else {
        res.status(400).send('Não conseguimos enviar o e-mail para reset de senha, tente novamente')
      }
    }
  })
})

app.post('/api/confirmResetPassword', (req, res) => {
  const {email, code, newPassword, confirmNewPassword} = req.body
  const userData = {Username: email, Pool: userPool}
  const user = new CognitoUser(userData)

  if (newPassword === confirmNewPassword) {
    user.confirmPassword(code, newPassword, {
      onSuccess() {
        res.status(200).end()
      },
      onFailure(error) {
        console.log(error)
        if ((error.message.toLowerCase()).includes("'confirmationcode' failed to satisfy constraint")) {
          res.status(400).send('Código inválido')
        } else if ((error.message.toLowerCase()).includes("'password' failed to satisfy constraint")) {
          res.status(400).send('Nova senha inválida')
        } else {
          res.status(400).send('Não conseguimos trocar a senha, tente novamente')
        }
      }
    })
  } else {
    res.status(400).send('As senhas não são iguais')
  }
})

app.post('/api/getUserInfo', (req, res) => {
  const email = req.body.email

  db.query('select * from users where email=?', [email], (error, result) => {
    if (error) {
      res.status(500).send('Falha ao conectar com o servidor, tente novamente')
    } else {
      if (result.length > 0) {
        const userName = result[0].name
        const userMobile = result[0].mobile
        const userCpfCnpj = result[0].cpfCnpj
        res.status(200).send({userName, userMobile, userCpfCnpj})
      } else {
        res.status(400).send('Usuário não encontrado')
      }
    }
  })
})

app.post('/api/changePassword', (req, res) => {
  const {oldPassword, newPassword, confirmNewPassword} = req.body

  if (newPassword === confirmNewPassword) {
    cognitoUser.changePassword(oldPassword, newPassword, function(error) {
      if (error) {
        console.error(error.message)
        if ((error.message.toLowerCase()).includes('proposedpassword')) {
          res.status(400).send('Nova senha inválida\nEla deve ter no mínimo 6 caracteres, um número, uma letra e maiúscula e outra letra minúscula')
        } else if ((error.message.toLowerCase()).includes('incorrect username or password')) {
          res.status(400).send('Senha atual incorreta')
        } else if ((error.message.toLowerCase()).includes('password not long enough')) {
          res.status(400).send('Nova senha inválida\nEla deve ter no mínimo 6 caracteres, um número, uma letra e maiúscula e outra letra minúscula')
        } else if ((error.message.toLowerCase()).includes('previouspassword')) {
          res.status(400).send('Senha atual inválida')
        } else {
          res.status(400).send('Não conseguimos alterar sua senha, tente novamente')
        }
      } else {
        res.status(200).end()
      }
    })
  } else {
    res.status(400).send('As senhas não são iguais')
  }
})

app.post('/api/isLogged', (req, res) => {
  if (cognitoUser && cognitoUser.getSignInUserSession()) {
    const accessToken = cognitoUser.getSignInUserSession().getAccessToken()

    if (accessToken && accessToken.getJwtToken()) {
      res.status(200).send(true)
    } else {
      res.status(200).send(false)
    }
  } else {
    res.status(200).send(false)
  }
})

app.post('/api/logout', (req, res) => {
  cognitoUser.signOut((error) => {
    if (error) {
      res.status(500).send('Falha ao sair da conta, tente novamente')
    } else {
      res.status(200).end()
    }
  })
})

app.post('/api/login', (req, res) => {
  const {email, password} = req.body
  const userData = {Username: email, Pool: userPool}
  cognitoUser = new CognitoUser(userData)
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
      } else if ((error.message.toLowerCase()).includes('user is not confirmed')) {
        res.status(400).send('E-mail não verificado')
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
  const user = new CognitoUser(userData)

  user.confirmRegistration(code, true, (error) => {
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
  const user = new CognitoUser(userData)

  user.resendConfirmationCode((error) => {
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