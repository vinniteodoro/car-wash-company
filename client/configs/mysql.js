const {createPool} = require('mysql2')

const db = createPool({
  host:'carwash.cxtvpr3ebcir.sa-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: '1597534862Ve',
  database: 'carwash'
})