import express from 'express'
import router from './routes.js'
import chalk from 'chalk'
import { connectionMongo } from './config.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import https from 'https'
import http from 'http'

const port = process.env.PORT || 4000
const app = express()

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(router)
;(async () => {
  await connectionMongo()
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