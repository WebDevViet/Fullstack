// 📦 External library
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import logger from 'morgan'
import { yellow } from 'nanocolors'
import os from 'os'
import path from 'path'

// * HTTPS
import fs from 'fs'
import https from 'https'

// ⚙️ Config
// import { applyMiddlewaresCustom } from '@/core/middlewares'

const app = express()

const originsCORS: string[] = JSON.parse(process.env.URL_CLIENTS || '["http://localhost:3000"]')

app.use(
  cors({
    origin: originsCORS,
    credentials: true
  })
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/static/photos', express.static(path.resolve('uploads/photos')))
app.use('/static/videos', express.static(path.resolve('uploads/videos')))

// applyMiddlewaresCustom(app) // app.use('/api', apiRoutes)

async function startServer() {
  const port = process.env.PORT || '4000'

  // place connect to database
  // ...

  const server = http.createServer(app)

  const isDevelopment = process.env.NODE_ENV === 'development'

  server.listen(port, () => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(yellow(`Server is running at http://localhost:${port}`))
    }
  })

  server.on('error', (error: any) => onError(error, port))

  if (isDevelopment) {
    // * HTTPS
    const dirPath = './ssl'
    const files = fs.readdirSync('./ssl')

    const keyFile = files.find((file) => file.endsWith('-key.pem'))
    const certFile = files.find((file) => file.endsWith('.pem') && !file.endsWith('-key.pem'))

    if (!keyFile || !certFile) {
      // eslint-disable-next-line no-console
      console.error('Key or certificate file not found in the ssl directory.')
      return
    }

    const key = fs.readFileSync(path.join(dirPath, keyFile))
    const cert = fs.readFileSync(path.join(dirPath, certFile))

    const server = https.createServer({ key, cert }, app)

    const portHttps = process.env.PORT_HTTPS || '4001'

    server.listen(portHttps, () => {
      // eslint-disable-next-line no-console
      console.log(yellow(`Server is running at https://${getLocalIP()}:${portHttps}`))
    })
    server.on('error', (error: any) => onError(error, portHttps))
    return
  }
  // eslint-disable-next-line no-console
  console.log(yellow(`Server is running`))
}

startServer()

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any, port: string) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = `Pipe ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function getLocalIP() {
  const networkInterfaces = os.networkInterfaces()
  for (const name in networkInterfaces) {
    if (!networkInterfaces[name]) continue
    for (const net of networkInterfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }
  return 'localhost'
}
