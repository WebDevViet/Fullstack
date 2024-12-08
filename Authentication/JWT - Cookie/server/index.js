import express from 'express'
import router from './routes.js'
import chalk from 'chalk'
import { connectionMongo } from './config.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import https from 'https'
// import fs from 'fs'
import http from 'http'
import session from 'express-session'
import flash from 'connect-flash'

const port = process.env.PORT || 4000
const app = express()

app.use(
  cors({
    origin: 'http://localhost:5539',
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
  })
)

app.use(flash())

app.use(router)
;(async () => {
  await connectionMongo()
  // https
  http
    .createServer(
      // {
      //   key: fs.readFileSync('./localhost-key.pem'),
      //   cert: fs.readFileSync('./localhost.pem')
      // },
      app
    )
    .listen(port || 4000, () => {
      console.log(chalk.yellowBright(`Đang chạy server trên port ${port}`))
    })
})()
