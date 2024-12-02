// const mysql = require('mysql2/promise')

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   database: process.env.MYSQL_DATABASE,
//   password: process.env.MYSQL_PASSWORD,
//   port: process.env.MYSQL_PORT
// })

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   database: process.env.MYSQL_DATABASE,
//   password: process.env.MYSQL_PASSWORD,
//   port: process.env.MYSQL_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0
// })

// module.exports = pool

const mongoose = require('mongoose')

const connectionMongo = async () => {
  mongoose.connection.on('connected', () => console.log('connected'))
  mongoose.connection.on('open', () => console.log('open'))
  mongoose.connection.on('disconnected', () => {
    console.log('disconnected')
    process.exit(1)
  })
  mongoose.connection.on('reconnected', () => console.log('reconnected'))
  mongoose.connection.on('disconnecting', () => console.log('disconnecting'))
  mongoose.connection.on('close', () => console.log('close'))
  await mongoose.connect(process.env.MONGO_HOST, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DATABASE
  })
}

module.exports = connectionMongo
