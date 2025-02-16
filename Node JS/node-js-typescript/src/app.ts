import cookieParser from 'cookie-parser'
import express from 'express'
import logger from 'morgan'
import path from 'path'

import apiRoutes from './api/apiRoutes.ts'
import { errorHandler, notFound } from './core/middlewares/errorHandlers.ts'
import initUploadFolder from './core/file/initUploadFolder.ts'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/images', express.static(path.resolve('uploads/images')))

// Init upload folder
initUploadFolder()

app.use('/api', apiRoutes)

// catch 404 and forward to error handler
app.use(notFound)

// error handler
app.use(errorHandler)

export default app
